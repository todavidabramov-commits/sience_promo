import type { Locale } from '@/i18n/config'
import { getCatalog } from '@/i18n/catalog'
import { getMessages } from '@/i18n/messages'
import { getPayloadClient } from '@/lib/payload'

import { mapDocument, mapExpert, mapProject, mapPublication, mapService } from './map'
import { cmsLocale, type ContactsView, type DocumentView, type ExpertView, type ProjectView, type PublicationView, type ServiceView } from './types'
import { asList, text } from './utils'

type Doc = Record<string, unknown>

async function findAll(collection: string, locale: Locale) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: collection as 'services',
    ...cmsLocale(locale),
    limit: 200,
    sort: 'order',
    depth: 1,
  })
  return result.docs as unknown as Doc[]
}

export async function getServices(locale: Locale): Promise<ServiceView[]> {
  try {
    const docs = await findAll('services', locale)
    if (docs.length) return docs.filter((doc) => text(doc.slug)).map((doc) => mapService(doc))
  } catch {
    /* empty database or schema not pushed yet */
  }
  return getCatalog(locale).services.map((item) => ({ ...item, about: [...item.about], scope: [...item.scope], stages: item.stages.map((stage) => ({ ...stage })) }))
}

export async function getService(slug: string, locale: Locale): Promise<ServiceView | null> {
  const items = await getServices(locale)
  return items.find((item) => item.slug === slug) || null
}

export async function getProjects(locale: Locale): Promise<ProjectView[]> {
  try {
    const docs = await findAll('projects', locale)
    if (docs.length) return docs.filter((doc) => text(doc.slug)).map((doc) => mapProject(doc))
  } catch {
    /* fallback */
  }
  const catalog = getCatalog(locale)
  return catalog.projectCases.map((item) => {
    const card = catalog.projects.find((project) => project.slug === item.slug)
    return {
      slug: item.slug,
      title: card?.title || item.title,
      headline: item.title,
      summary: card?.summary || item.result,
      clientType: card?.clientType || item.sector,
      sector: item.sector,
      section: item.section,
      task: item.task,
      approach: item.approach,
      result: item.result,
      image: card?.image || '/images/cases/case-1-hq.png',
      showOnHome: true,
    }
  })
}

export async function getProject(slug: string, locale: Locale): Promise<ProjectView | null> {
  const items = await getProjects(locale)
  return items.find((item) => item.slug === slug) || null
}

export async function getExperts(locale: Locale): Promise<ExpertView[]> {
  try {
    const docs = await findAll('experts', locale)
    if (docs.length) return docs.filter((doc) => text(doc.slug)).map((doc) => mapExpert(doc))
  } catch {
    /* fallback */
  }
  const catalog = getCatalog(locale)
  return catalog.expertBoard.map((item) => {
    const card = catalog.experts.find((expert) => expert.slug === item.slug)
    return {
      slug: item.slug,
      name: item.name,
      role: card?.role || item.title,
      title: item.title,
      credentials: item.credentials,
      bio: item.bio,
      tags: [...item.tags],
      image: item.image,
      showOnHome: true,
    }
  })
}

export async function getPublications(locale: Locale): Promise<PublicationView[]> {
  try {
    const docs = await findAll('publications', locale)
    if (docs.length) return docs.filter((doc) => text(doc.slug)).map((doc) => mapPublication(doc))
  } catch {
    /* fallback */
  }
  const catalog = getCatalog(locale)
  const { getPublicationBody } = await import('@/lib/publication-bodies')
  const featured: PublicationView = {
    slug: catalog.featured.slug,
    title: catalog.featured.title,
    excerpt: catalog.featured.excerpt,
    category: catalog.featured.category,
    date: catalog.featured.date,
    readTime: catalog.featured.readTime,
    section: 'risks',
    image: catalog.featured.image,
    featured: true,
    showInCatalog: false,
    showOnHome: false,
    body: getPublicationBody(catalog.featured.slug, locale) || [],
  }
  const home = catalog.publications.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: '',
    readTime: '',
    section: 'science',
    image: '/images/publications/featured.png',
    featured: false,
    showInCatalog: false,
    showOnHome: true,
    body: getPublicationBody(item.slug, locale) || [],
  }))
  const articles = catalog.publicationArticles.map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: item.date,
    readTime: '',
    section: item.section,
    image: '/images/publications/featured.png',
    featured: false,
    showInCatalog: true,
    showOnHome: false,
    body: getPublicationBody(item.slug, locale) || [],
  }))
  return [featured, ...home, ...articles]
}

export async function getPublication(slug: string, locale: Locale): Promise<PublicationView | null> {
  const items = await getPublications(locale)
  return items.find((item) => item.slug === slug) || null
}

export async function getDocuments(locale: Locale): Promise<DocumentView[]> {
  try {
    const docs = await findAll('documents', locale)
    if (docs.length) return docs.filter((doc) => text(doc.code) || text(doc.title)).map((doc) => mapDocument(doc))
  } catch {
    /* fallback */
  }
  const catalog = getCatalog(locale)
  const register = catalog.documents.map((item) => ({
    code: item.code,
    title: item.title,
    excerpt: item.excerpt,
    section: item.section,
    file: item.file,
    homeMeta: '',
    showInCatalog: true,
    showOnHome: false,
    downloadUrl: '',
  }))
  const home = catalog.homeDocs.map((item, index) => ({
    code: `home-${index + 1}`,
    title: item.title,
    excerpt: '',
    section: 'federal',
    file: item.file,
    homeMeta: item.meta,
    showInCatalog: false,
    showOnHome: true,
    downloadUrl: '',
  }))
  return [...register, ...home]
}

export async function getContacts(locale: Locale): Promise<ContactsView> {
  const catalog = getCatalog(locale)
  const messages = getMessages(locale)
  const fallback: ContactsView = {
    companyName: 'САНЭПИДЭКСПЕРТ',
    tagline: messages.common.tagline,
    phone: '+7 (495) 120-44-88',
    email: 'info@sanepidexpert.ru',
    address: catalog.contactOffice.address,
    officeTitle: catalog.contactOffice.title,
    hours: catalog.contactOffice.hours,
    officeNote: catalog.contactOffice.note,
    lat: catalog.contactOffice.coords[0],
    lon: catalog.contactOffice.coords[1],
    channels: catalog.contactChannels.map((item) => ({ ...item })),
    contactDocs: [...catalog.contactDocs],
    requisites: catalog.requisites.flat(),
    ctaLabel: messages.common.cta,
    ctaHref: '/kontakty?type=proposal',
    nav: catalog.nav.map((item) => ({ ...item })),
    legal: null,
  }

  try {
    const payload = await getPayloadClient()
    const [settings, header, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', ...cmsLocale(locale) }),
      payload.findGlobal({ slug: 'header', ...cmsLocale(locale) }),
      payload.findGlobal({ slug: 'footer', ...cmsLocale(locale) }),
    ])

    const settingsDoc = settings as unknown as Doc
    const headerDoc = header as unknown as Doc
    const footerDoc = footer as unknown as Doc
    const channels = asList<Doc>(settingsDoc.channels).map((item, index) => ({
      title: text(item.title, fallback.channels[index]?.title),
      phone: text(item.phone, fallback.channels[index]?.phone),
      email: text(item.email, fallback.channels[index]?.email),
      text: text(item.text, fallback.channels[index]?.text),
    }))
    const navSource = asList<Doc>(headerDoc.nav)
    const nav =
      navSource.length > 0
        ? navSource.map((item, index) => {
            const href = text(item.href, fallback.nav[index]?.href)
            const catalogItem = fallback.nav.find((entry) => entry.href === href) || fallback.nav[index]
            return {
              href,
              label: text(item.label, catalogItem?.label),
            }
          })
        : fallback.nav

    return {
      companyName: text(settingsDoc.companyName, fallback.companyName),
      tagline: text(settingsDoc.tagline, fallback.tagline),
      phone: text(settingsDoc.phone, fallback.phone),
      email: text(settingsDoc.email, fallback.email),
      address: text(settingsDoc.address, fallback.address),
      officeTitle: text(settingsDoc.officeTitle, fallback.officeTitle),
      hours: text(settingsDoc.hours, fallback.hours),
      officeNote: text(settingsDoc.officeNote, fallback.officeNote),
      lat: typeof settingsDoc.lat === 'number' ? settingsDoc.lat : fallback.lat,
      lon: typeof settingsDoc.lon === 'number' ? settingsDoc.lon : fallback.lon,
      channels: channels.length ? channels : fallback.channels,
      contactDocs: (() => {
        const items = asList<{ item?: string }>(settingsDoc.contactDocs)
          .map((item) => text(item.item))
          .filter(Boolean)
        return items.length ? items : fallback.contactDocs
      })(),
      requisites: (() => {
        const items = asList<Doc>(settingsDoc.requisites).map((item, index) => ({
          label: text(item.label, fallback.requisites[index]?.label),
          value: text(item.value, fallback.requisites[index]?.value) || undefined,
        }))
        return items.length ? items : fallback.requisites
      })(),
      ctaLabel: text(headerDoc.ctaLabel, fallback.ctaLabel),
      ctaHref: text(headerDoc.ctaHref, fallback.ctaHref),
      nav: nav.filter((item) => item.href),
      legal: text(footerDoc.legal) || null,
    }
  } catch {
    return fallback
  }
}

export async function getServiceOptions(locale: Locale) {
  const services = await getServices(locale)
  return services.map((item) => ({ id: item.slug, title: item.title }))
}
