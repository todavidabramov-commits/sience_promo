import type { Payload } from 'payload'

import { EN_CATALOG } from '@/i18n/en-catalog'
import {
  CONTACT_CHANNELS,
  CONTACT_OFFICE,
  CONTACT_REQUISITES,
  CONTACT_RFP_DOCS,
  DEFAULT_EXPERTS,
  DEFAULT_HOME_DOCS,
  DEFAULT_NAV,
  DEFAULT_PROJECTS,
  DEFAULT_PUBLICATIONS,
  DEFAULT_SERVICES,
  DOCUMENT_ITEMS,
  EXPERT_BOARD,
  FEATURED_PUBLICATION,
  PROJECT_CASES,
  PUBLICATION_ARTICLES,
} from '@/lib/content'
import { getPublicationBody, type ArticleBlock } from '@/lib/publication-bodies'

function bodyFromBlocks(blocks: ArticleBlock[] | null | undefined) {
  return (blocks || []).map((block) => {
    if (block.type === 'ul') {
      return { blockType: 'ul', items: block.items.map((item) => ({ item })) }
    }
    return { blockType: block.type, text: block.text }
  })
}

function attachArrayIds(current: unknown, next: Record<string, unknown>[]) {
  const existing = Array.isArray(current) ? (current as Record<string, unknown>[]) : []
  return next.map((item, index) => {
    const row = existing[index] || {}
    const patched: Record<string, unknown> = {
      ...item,
      ...(typeof row.id === 'string' ? { id: row.id } : {}),
    }
    for (const [key, value] of Object.entries(item)) {
      if (!Array.isArray(value)) continue
      patched[key] = attachArrayIds(row[key], value as Record<string, unknown>[])
    }
    return patched
  })
}

function withExistingIds(current: Record<string, unknown>, data: Record<string, unknown>) {
  const next = { ...data }
  delete next.id
  delete next.createdAt
  delete next.updatedAt
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      next[key] = attachArrayIds(current[key], value as Record<string, unknown>[])
    }
  }
  return next
}

async function updateGlobalLocales(
  payload: Payload,
  slug: 'header' | 'site-settings' | 'footer',
  ru: Record<string, unknown>,
  en: Record<string, unknown>,
) {
  await payload.updateGlobal({ slug, locale: 'ru', data: ru as never })
  const afterRu = (await payload.findGlobal({ slug, locale: 'ru', depth: 0 })) as unknown as Record<
    string,
    unknown
  >
  await payload.updateGlobal({
    slug,
    locale: 'en',
    data: withExistingIds(afterRu, en) as never,
  })
  const afterEn = (await payload.findGlobal({ slug, locale: 'ru', depth: 0 })) as unknown as Record<
    string,
    unknown
  >
  await payload.updateGlobal({
    slug,
    locale: 'ru',
    data: withExistingIds(afterEn, ru) as never,
  })
}

async function createLocalized(
  payload: Payload,
  collection: 'services' | 'projects' | 'experts' | 'publications' | 'documents',
  ru: Record<string, unknown>,
  en: Record<string, unknown>,
) {
  const created = await payload.create({
    collection,
    locale: 'ru',
    data: ru as never,
  })
  const doc = (await payload.findByID({
    collection,
    id: created.id,
    locale: 'ru',
    depth: 0,
  })) as unknown as Record<string, unknown>
  await payload.update({
    collection,
    id: created.id,
    locale: 'en',
    data: withExistingIds(doc, en) as never,
  })
}

export async function seedIfEmpty(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: 'services' })
  if (totalDocs > 0) return
  payload.logger.info('Seeding localized site content...')
  await seed(payload)
  payload.logger.info('Localized site content is ready.')
}

export async function seed(payload: Payload) {
  await seedSettings(payload)
  await seedServices(payload)
  await seedProjects(payload)
  await seedExperts(payload)
  await seedPublications(payload)
  await seedDocuments(payload)
}

export async function repairGlobals(payload: Payload) {
  payload.logger.info('Restoring RU/EN labels for header and contacts...')
  await seedSettings(payload)
}

async function seedSettings(payload: Payload) {
  await updateGlobalLocales(
    payload,
    'site-settings',
    {
      companyName: 'САНЭПИДЭКСПЕРТ',
      tagline: 'Экспертный центр',
      phone: '+7 (495) 120-44-88',
      email: 'info@sanepidexpert.ru',
      address: CONTACT_OFFICE.address,
      officeTitle: CONTACT_OFFICE.title,
      hours: CONTACT_OFFICE.hours,
      officeNote: CONTACT_OFFICE.note,
      lat: CONTACT_OFFICE.coords[0],
      lon: CONTACT_OFFICE.coords[1],
      channels: CONTACT_CHANNELS.map((item) => ({ ...item })),
      contactDocs: CONTACT_RFP_DOCS.map((item) => ({ item })),
      requisites: CONTACT_REQUISITES.flat().map((item) => ({
        label: item.label,
        value: item.value || '',
      })),
    },
    {
      tagline: 'Expert centre',
      address: EN_CATALOG.contactOffice.address,
      officeTitle: EN_CATALOG.contactOffice.title,
      hours: EN_CATALOG.contactOffice.hours,
      officeNote: EN_CATALOG.contactOffice.note,
      channels: CONTACT_CHANNELS.map((item) => ({
        title: EN_CATALOG.contactChannels[item.email]?.title || item.title,
        phone: item.phone,
        email: item.email,
        text: EN_CATALOG.contactChannels[item.email]?.text || item.text,
      })),
      contactDocs: EN_CATALOG.contactDocs.map((item) => ({ item })),
      requisites: CONTACT_REQUISITES.flat().map((item, index) => {
        const overlay = EN_CATALOG.requisites.flat()[index]
        return {
          label: overlay?.label || item.label,
          value: overlay?.value || item.value || '',
        }
      }),
    },
  )

  await updateGlobalLocales(
    payload,
    'header',
    {
      nav: DEFAULT_NAV.map((item) => ({ ...item })),
      ctaLabel: 'Запросить КП',
      ctaHref: '/kontakty?type=proposal',
    },
    {
      nav: DEFAULT_NAV.map((item) => ({
        href: item.href,
        label: EN_CATALOG.nav[item.href] || item.label,
      })),
      ctaLabel: 'Request a proposal',
    },
  )
}

async function seedServices(payload: Payload) {
  for (const [index, item] of DEFAULT_SERVICES.entries()) {
    const en = EN_CATALOG.services[item.slug]
    await createLocalized(
      payload,
      'services',
      {
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        lead: item.lead,
        icon: item.icon,
        overview: item.about.map((text) => ({ text })),
        scope: item.scope.map((entry) => ({ item: entry })),
        stages: item.stages.map((stage) => ({ ...stage })),
        audience: item.audience,
        result: item.result,
        order: index + 1,
      },
      {
        title: en?.title,
        summary: en?.summary,
        lead: en?.lead,
        overview: (en?.about || []).map((text) => ({ text })),
        scope: (en?.scope || []).map((entry) => ({ item: entry })),
        stages: en?.stages || [],
        audience: en?.audience,
        result: en?.result,
      },
    )
  }
}

async function seedProjects(payload: Payload) {
  for (const [index, item] of PROJECT_CASES.entries()) {
    const card = DEFAULT_PROJECTS.find((project) => project.slug === item.slug)
    const enCase = EN_CATALOG.projectCases[item.slug]
    const enCard = EN_CATALOG.projects[item.slug]
    await createLocalized(
      payload,
      'projects',
      {
        title: card?.title || item.title,
        headline: item.title,
        slug: item.slug,
        summary: card?.summary || item.result,
        clientType: item.section === 'aviation' ? 'airport' : item.section === 'urban' ? 'development' : 'oilgas',
        clientLabel: card?.clientType || item.sector,
        sector: item.sector,
        section: item.section,
        task: item.task,
        approach: item.approach,
        result: item.result,
        image: card?.image,
        showOnHome: true,
        order: index + 1,
      },
      {
        title: enCard?.title,
        headline: enCase?.title,
        summary: enCard?.summary,
        clientLabel: enCard?.clientType,
        sector: enCase?.sector,
        task: enCase?.task,
        approach: enCase?.approach,
        result: enCase?.result,
      },
    )
  }
}

async function seedExperts(payload: Payload) {
  for (const [index, item] of EXPERT_BOARD.entries()) {
    const card = DEFAULT_EXPERTS.find((expert) => expert.slug === item.slug)
    const enBoard = EN_CATALOG.expertBoard[item.slug]
    const enCard = EN_CATALOG.experts[item.slug]
    await createLocalized(
      payload,
      'experts',
      {
        name: item.name,
        slug: item.slug,
        role: card?.role || item.title,
        title: item.title,
        credentials: item.credentials,
        bio: item.bio,
        tags: item.tags.map((entry) => ({ item: entry })),
        competencies: item.tags.map((entry) => ({ item: entry })),
        image: item.image,
        showOnHome: true,
        order: index + 1,
      },
      {
        role: enCard?.role,
        title: enBoard?.title,
        credentials: enBoard?.credentials,
        bio: enBoard?.bio,
        tags: (enBoard?.tags || []).map((entry) => ({ item: entry })),
      },
    )
  }
}

async function seedPublications(payload: Payload) {
  const featuredEn = EN_CATALOG.featured
  await createLocalized(
    payload,
    'publications',
    {
      title: FEATURED_PUBLICATION.title,
      slug: FEATURED_PUBLICATION.slug,
      excerpt: FEATURED_PUBLICATION.excerpt,
      category: 'science',
      categoryLabel: FEATURED_PUBLICATION.category,
      dateLabel: FEATURED_PUBLICATION.date,
      readTime: FEATURED_PUBLICATION.readTime,
      section: 'risks',
      image: FEATURED_PUBLICATION.image,
      featured: true,
      showInCatalog: false,
      showOnHome: false,
      body: bodyFromBlocks(getPublicationBody(FEATURED_PUBLICATION.slug, 'ru')),
      order: 1,
    },
    {
      title: featuredEn.title,
      excerpt: featuredEn.excerpt,
      categoryLabel: featuredEn.category,
      dateLabel: featuredEn.date,
      readTime: featuredEn.readTime,
      body: bodyFromBlocks(getPublicationBody(FEATURED_PUBLICATION.slug, 'en')),
    },
  )

  for (const [index, item] of DEFAULT_PUBLICATIONS.entries()) {
    const en = EN_CATALOG.publications[item.slug]
    await createLocalized(
      payload,
      'publications',
      {
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        category: 'science',
        categoryLabel: item.category,
        section: 'science',
        featured: false,
        showInCatalog: false,
        showOnHome: true,
        body: bodyFromBlocks(getPublicationBody(item.slug, 'ru')),
        order: index + 2,
      },
      {
        title: en?.title,
        excerpt: en?.excerpt,
        categoryLabel: en?.category,
        body: bodyFromBlocks(getPublicationBody(item.slug, 'en')),
      },
    )
  }

  for (const [index, item] of PUBLICATION_ARTICLES.entries()) {
    const en = EN_CATALOG.publicationArticles[item.slug]
    await createLocalized(
      payload,
      'publications',
      {
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        category: 'science',
        categoryLabel: item.category,
        dateLabel: item.date,
        section: item.section,
        featured: false,
        showInCatalog: true,
        showOnHome: false,
        body: bodyFromBlocks(getPublicationBody(item.slug, 'ru')),
        order: index + 10,
      },
      {
        title: en?.title,
        excerpt: en?.excerpt,
        categoryLabel: en?.category,
        dateLabel: en?.date,
        body: bodyFromBlocks(getPublicationBody(item.slug, 'en')),
      },
    )
  }
}

async function seedDocuments(payload: Payload) {
  for (const [index, item] of DOCUMENT_ITEMS.entries()) {
    const en = EN_CATALOG.documents[item.code]
    const isHome = item.code === 'ПП РФ № 222'
    await createLocalized(
      payload,
      'documents',
      {
        code: item.code,
        title: item.title,
        excerpt: item.excerpt,
        section: item.section,
        category:
          item.section === 'methods'
            ? 'methods'
            : item.section === 'accreditation'
              ? 'certificates'
              : 'regulations',
        fileLabel: item.file,
        homeMeta: isHome ? DEFAULT_HOME_DOCS[1].meta : '',
        showInCatalog: true,
        showOnHome: isHome,
        order: isHome ? 2 : index + 10,
      },
      {
        title: en?.title,
        excerpt: en?.excerpt,
        fileLabel: item.file,
        homeMeta: isHome ? EN_CATALOG.homeDocs[1]?.meta : '',
      },
    )
  }

  const extra = [
    {
      code: 'HOME-SZD-DATA',
      ru: DEFAULT_HOME_DOCS[0],
      en: EN_CATALOG.homeDocs[0],
      order: 1,
    },
    {
      code: 'HOME-EXPERTISE-RULES',
      ru: DEFAULT_HOME_DOCS[2],
      en: EN_CATALOG.homeDocs[2],
      order: 3,
    },
  ]

  for (const item of extra) {
    await createLocalized(
      payload,
      'documents',
      {
        code: item.code,
        title: item.ru.title,
        excerpt: '',
        section: 'federal',
        category: 'regulations',
        fileLabel: item.ru.file,
        homeMeta: item.ru.meta,
        showInCatalog: false,
        showOnHome: true,
        order: item.order,
      },
      {
        title: item.en?.title,
        homeMeta: item.en?.meta,
        fileLabel: item.ru.file,
      },
    )
  }
}
