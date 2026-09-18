import type { Locale } from '@/i18n/config'
import type { ArticleBlock } from '@/lib/publication-bodies'

export type ServiceView = {
  slug: string
  title: string
  summary: string
  result: string
  icon: string
  lead: string
  about: string[]
  scope: string[]
  stages: { title: string; text: string }[]
  audience: string
}

export type ProjectView = {
  slug: string
  title: string
  headline: string
  summary: string
  clientType: string
  sector: string
  section: string
  task: string
  approach: string
  result: string
  image: string
  showOnHome: boolean
}

export type ExpertView = {
  slug: string
  name: string
  role: string
  title: string
  credentials: string
  bio: string
  tags: string[]
  image: string
  showOnHome: boolean
}

export type PublicationView = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  section: string
  image: string
  featured: boolean
  showInCatalog: boolean
  showOnHome: boolean
  body: ArticleBlock[]
}

export type DocumentView = {
  code: string
  title: string
  excerpt: string
  section: string
  file: string
  homeMeta: string
  showInCatalog: boolean
  showOnHome: boolean
  downloadUrl: string
}

export type ContactChannelView = {
  title: string
  phone: string
  email: string
  text: string
}

export type ContactsView = {
  companyName: string
  tagline: string
  phone: string
  email: string
  address: string
  officeTitle: string
  hours: string
  officeNote: string
  lat: number
  lon: number
  channels: ContactChannelView[]
  contactDocs: string[]
  requisites: { label: string; value?: string }[]
  ctaLabel: string
  ctaHref: string
  nav: { label: string; href: string }[]
  legal: string | null
}

export type CmsLocale = {
  locale: Locale
  fallbackLocale: Locale | false
}

export function cmsLocale(locale: Locale): CmsLocale {
  return {
    locale,
    fallbackLocale: locale === 'en' ? 'ru' : false,
  }
}
