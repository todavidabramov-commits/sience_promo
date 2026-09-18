import type { ArticleBlock } from '@/lib/publication-bodies'

import type { ContactsView, DocumentView, ExpertView, ProjectView, PublicationView, ServiceView } from './types'
import { asList, mediaUrl, text } from './utils'

export type CmsDoc = Record<string, unknown>

type MapOptions<T> = {
  live?: boolean
  fallback?: T
}

function field(value: unknown, fallback: string, live: boolean) {
  return text(value, fallback, live)
}

function keepList<T>(items: T[], live: boolean, present: (item: T) => boolean) {
  return live ? items : items.filter(present)
}

export function mapService(doc: CmsDoc, options: MapOptions<ServiceView> = {}): ServiceView {
  const live = Boolean(options.live)
  const fallback = options.fallback
  const summary = field(doc.summary, fallback?.summary || '', live)
  return {
    slug: field(doc.slug, fallback?.slug || '', live),
    title: field(doc.title, fallback?.title || '', live),
    summary,
    result: field(doc.result, fallback?.result || '', live),
    icon: field(doc.icon, fallback?.icon || 'shield-alert', live) || 'shield-alert',
    lead: field(doc.lead, fallback?.lead || summary, live),
    about: keepList(
      asList<{ text?: string }>(doc.overview).map((item) => field(item.text, '', live)),
      live,
      Boolean,
    ),
    scope: keepList(
      asList<{ item?: string }>(doc.scope).map((item) => field(item.item, '', live)),
      live,
      Boolean,
    ),
    stages: asList<{ title?: string; text?: string }>(doc.stages).map((item, index) => ({
      title: field(item.title, fallback?.stages[index]?.title || '', live),
      text: field(item.text, fallback?.stages[index]?.text || '', live),
    })),
    audience: field(doc.audience, fallback?.audience || '', live),
  }
}

export function mapProject(doc: CmsDoc, options: MapOptions<ProjectView> = {}): ProjectView {
  const live = Boolean(options.live)
  const fallback = options.fallback
  const title = field(doc.title, fallback?.title || '', live)
  return {
    slug: field(doc.slug, fallback?.slug || '', live),
    title,
    headline: field(doc.headline, fallback?.headline || title, live),
    summary: field(doc.summary, fallback?.summary || '', live),
    clientType: field(doc.clientLabel, field(doc.clientType, fallback?.clientType || '', live), live),
    sector: field(doc.sector, field(doc.clientType, fallback?.sector || '', live), live),
    section: field(doc.section, fallback?.section || 'urban', live) || 'urban',
    task: field(doc.task, fallback?.task || '', live),
    approach: field(doc.approach, fallback?.approach || '', live),
    result: field(doc.result, fallback?.result || '', live),
    image: mediaUrl(doc.cover) || field(doc.image, fallback?.image || '/images/cases/case-1-hq.png', live),
    showOnHome: typeof doc.showOnHome === 'boolean' ? doc.showOnHome : Boolean(fallback?.showOnHome),
  }
}

export function mapExpert(doc: CmsDoc, options: MapOptions<ExpertView> = {}): ExpertView {
  const live = Boolean(options.live)
  const fallback = options.fallback
  const role = field(doc.role, fallback?.role || '', live)
  return {
    slug: field(doc.slug, fallback?.slug || '', live),
    name: field(doc.name, fallback?.name || '', live),
    role,
    title: field(doc.title, fallback?.title || role, live),
    credentials: field(doc.credentials, fallback?.credentials || '', live),
    bio: field(doc.bio, fallback?.bio || '', live),
    tags: keepList(
      asList<{ item?: string }>(doc.tags)
        .concat(asList<{ item?: string }>(doc.competencies))
        .map((item) => field(item.item, '', live)),
      live,
      Boolean,
    ),
    image: mediaUrl(doc.photo) || field(doc.image, fallback?.image || '/images/experts/expert-1.png', live),
    showOnHome: typeof doc.showOnHome === 'boolean' ? doc.showOnHome : fallback?.showOnHome !== false,
  }
}

function mapBody(value: unknown, live: boolean, fallback: ArticleBlock[] = []): ArticleBlock[] {
  if (live && !Array.isArray(value)) return fallback
  return asList<{ blockType?: string; text?: string; items?: { item?: string }[] }>(value)
    .map((block, index) => {
      const previous = fallback[index]
      if (block.blockType === 'h2') {
        return { type: 'h2' as const, text: field(block.text, previous?.type === 'h2' ? previous.text : '', live) }
      }
      if (block.blockType === 'ul') {
        return {
          type: 'ul' as const,
          items: keepList(
            asList<{ item?: string }>(block.items).map((item) => field(item.item, '', live)),
            live,
            Boolean,
          ),
        }
      }
      return {
        type: 'p' as const,
        text: field(block.text, previous?.type === 'p' ? previous.text : '', live),
      }
    })
    .filter((block) => (live ? true : block.type === 'ul' ? block.items.length : block.text))
}

export function mapPublication(doc: CmsDoc, options: MapOptions<PublicationView> = {}): PublicationView {
  const live = Boolean(options.live)
  const fallback = options.fallback
  return {
    slug: field(doc.slug, fallback?.slug || '', live),
    title: field(doc.title, fallback?.title || '', live),
    excerpt: field(doc.excerpt, fallback?.excerpt || '', live),
    category: field(doc.categoryLabel, field(doc.category, fallback?.category || '', live), live),
    date: field(doc.dateLabel, fallback?.date || '', live),
    readTime: field(doc.readTime, fallback?.readTime || '', live),
    section: field(doc.section, fallback?.section || 'science', live) || 'science',
    image: mediaUrl(doc.cover) || field(doc.image, fallback?.image || '/images/publications/featured.png', live),
    featured: typeof doc.featured === 'boolean' ? doc.featured : Boolean(fallback?.featured),
    showInCatalog: typeof doc.showInCatalog === 'boolean' ? doc.showInCatalog : fallback?.showInCatalog !== false,
    showOnHome: typeof doc.showOnHome === 'boolean' ? doc.showOnHome : Boolean(fallback?.showOnHome),
    body: mapBody(doc.body, live, fallback?.body),
  }
}

export function mapDocument(doc: CmsDoc, options: MapOptions<DocumentView> = {}): DocumentView {
  const live = Boolean(options.live)
  const fallback = options.fallback
  return {
    code: field(doc.code, fallback?.code || '', live),
    title: field(doc.title, fallback?.title || '', live),
    excerpt: field(doc.excerpt, fallback?.excerpt || '', live),
    section: field(doc.section, fallback?.section || 'federal', live) || 'federal',
    file: field(doc.fileLabel, fallback?.file || 'PDF', live) || 'PDF',
    homeMeta: field(doc.homeMeta, fallback?.homeMeta || '', live),
    showInCatalog: typeof doc.showInCatalog === 'boolean' ? doc.showInCatalog : fallback?.showInCatalog !== false,
    showOnHome: typeof doc.showOnHome === 'boolean' ? doc.showOnHome : Boolean(fallback?.showOnHome),
    downloadUrl: mediaUrl(doc.file) || fallback?.downloadUrl || '',
  }
}

export function applyLiveGlobal(contacts: ContactsView, slug: string, doc: CmsDoc): ContactsView {
  if (slug === 'header') {
    const navSource = asList<CmsDoc>(doc.nav)
    const nav = navSource.length
      ? navSource
          .map((item, index) => ({
            href: field(item.href, contacts.nav[index]?.href || '', true),
            label: field(item.label, contacts.nav[index]?.label || '', true),
          }))
          .filter((item) => item.href)
      : contacts.nav
    return {
      ...contacts,
      ctaLabel: field(doc.ctaLabel, contacts.ctaLabel, true),
      ctaHref: field(doc.ctaHref, contacts.ctaHref, true),
      nav,
    }
  }

  if (slug === 'footer') {
    return {
      ...contacts,
      legal: field(doc.legal, contacts.legal || '', true) || null,
    }
  }

  if (slug !== 'site-settings') return contacts

  const channels = asList<CmsDoc>(doc.channels).map((item, index) => ({
    title: field(item.title, contacts.channels[index]?.title || '', true),
    phone: field(item.phone, contacts.channels[index]?.phone || '', true),
    email: field(item.email, contacts.channels[index]?.email || '', true),
    text: field(item.text, contacts.channels[index]?.text || '', true),
  }))
  const contactDocs = asList<{ item?: string }>(doc.contactDocs)
    .map((item) => field(item.item, '', true))
    .filter((item) => item.length)
  const requisites = asList<CmsDoc>(doc.requisites).map((item, index) => ({
    label: field(item.label, contacts.requisites[index]?.label || '', true),
    value: field(item.value, contacts.requisites[index]?.value || '', true) || undefined,
  }))

  return {
    ...contacts,
    companyName: field(doc.companyName, contacts.companyName, true),
    tagline: field(doc.tagline, contacts.tagline, true),
    phone: field(doc.phone, contacts.phone, true),
    email: field(doc.email, contacts.email, true),
    address: field(doc.address, contacts.address, true),
    officeTitle: field(doc.officeTitle, contacts.officeTitle, true),
    hours: field(doc.hours, contacts.hours, true),
    officeNote: field(doc.officeNote, contacts.officeNote, true),
    lat: typeof doc.lat === 'number' ? doc.lat : contacts.lat,
    lon: typeof doc.lon === 'number' ? doc.lon : contacts.lon,
    channels: channels.length ? channels : contacts.channels,
    contactDocs: contactDocs.length ? contactDocs : contacts.contactDocs,
    requisites: requisites.length ? requisites : contacts.requisites,
  }
}
