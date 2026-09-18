import type { Locale } from './config'
import {
  CONTACT_CHANNELS,
  CONTACT_OFFICE,
  CONTACT_REQUISITES,
  CONTACT_RFP_DOCS,
  DEFAULT_CTA,
  DEFAULT_EXPERTS,
  DEFAULT_HOME_DOCS,
  DEFAULT_INDUSTRIES,
  DEFAULT_METRICS,
  DEFAULT_NAV,
  DEFAULT_PROJECTS,
  DEFAULT_PUBLICATIONS,
  DEFAULT_SERVICES,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  DOCUMENT_FILTERS,
  DOCUMENT_ITEMS,
  EXPERT_BOARD,
  EXPERT_TEAM_STEPS,
  FEATURED_PUBLICATION,
  PROJECT_CASES,
  PROJECT_FILTERS,
  PUBLICATION_ARTICLES,
  PUBLICATION_FILTERS,
} from '@/lib/content'
import { EN_CATALOG } from './en-catalog'

function mergeBy<T extends object>(
  items: readonly T[],
  overlays: Record<string, object> | undefined,
  key: keyof T,
  locale: Locale,
): T[] {
  if (locale !== 'en' || !overlays) return items.map((item) => ({ ...item }))
  return items.map((item) => ({ ...item, ...(overlays[String(item[key])] || {}) }))
}

export function getCatalog(locale: Locale) {
  if (locale !== 'en') {
    return {
      nav: DEFAULT_NAV.map((item) => ({ ...item })),
      stats: DEFAULT_STATS.map((item) => ({ ...item })),
      services: DEFAULT_SERVICES.map((item) => ({
        ...item,
        about: [...item.about],
        scope: [...item.scope],
        stages: item.stages.map((stage) => ({ ...stage })),
      })),
      metrics: DEFAULT_METRICS.map((item) => ({ ...item })),
      industries: DEFAULT_INDUSTRIES.map((item) => ({ ...item })),
      projects: DEFAULT_PROJECTS.map((item) => ({ ...item })),
      projectFilters: PROJECT_FILTERS.map((item) => ({ ...item })),
      projectCases: PROJECT_CASES.map((item) => ({ ...item })),
      steps: DEFAULT_STEPS.map((item) => ({ ...item })),
      experts: DEFAULT_EXPERTS.map((item) => ({ ...item })),
      expertBoard: EXPERT_BOARD.map((item) => ({ ...item, tags: [...item.tags] })),
      expertSteps: EXPERT_TEAM_STEPS.map((item) => ({ ...item })),
      publications: DEFAULT_PUBLICATIONS.map((item) => ({ ...item })),
      featured: { ...FEATURED_PUBLICATION },
      publicationFilters: PUBLICATION_FILTERS.map((item) => ({ ...item })),
      publicationArticles: PUBLICATION_ARTICLES.map((item) => ({ ...item })),
      documentFilters: DOCUMENT_FILTERS.map((item) => ({ ...item })),
      documents: DOCUMENT_ITEMS.map((item) => ({ ...item })),
      homeDocs: DEFAULT_HOME_DOCS.map((item) => ({ ...item })),
      contactChannels: CONTACT_CHANNELS.map((item) => ({ ...item })),
      contactOffice: { ...CONTACT_OFFICE },
      contactDocs: [...CONTACT_RFP_DOCS],
      requisites: CONTACT_REQUISITES.map((column) => column.map((item) => ({ ...item }))),
      cta: { ...DEFAULT_CTA, checks: [...DEFAULT_CTA.checks] },
    }
  }

  return {
    nav: DEFAULT_NAV.map((item) => ({
      ...item,
      label: EN_CATALOG.nav[item.href] || item.label,
    })),
    stats: mergeBy(DEFAULT_STATS, EN_CATALOG.stats, 'value', locale),
    services: mergeBy(DEFAULT_SERVICES, EN_CATALOG.services, 'slug', locale),
    metrics: mergeBy(DEFAULT_METRICS, EN_CATALOG.metrics, 'value', locale),
    industries: mergeBy(DEFAULT_INDUSTRIES, EN_CATALOG.industries, 'icon', locale),
    projects: mergeBy(DEFAULT_PROJECTS, EN_CATALOG.projects, 'slug', locale),
    projectFilters: mergeBy(PROJECT_FILTERS, EN_CATALOG.projectFilters, 'id', locale),
    projectCases: mergeBy(PROJECT_CASES, EN_CATALOG.projectCases, 'slug', locale),
    steps: mergeBy(DEFAULT_STEPS, EN_CATALOG.steps, 'num', locale),
    experts: mergeBy(DEFAULT_EXPERTS, EN_CATALOG.experts, 'slug', locale),
    expertBoard: mergeBy(EXPERT_BOARD, EN_CATALOG.expertBoard, 'slug', locale),
    expertSteps: mergeBy(EXPERT_TEAM_STEPS, EN_CATALOG.expertSteps, 'num', locale),
    publications: mergeBy(DEFAULT_PUBLICATIONS, EN_CATALOG.publications, 'slug', locale),
    featured: { ...FEATURED_PUBLICATION, ...EN_CATALOG.featured },
    publicationFilters: mergeBy(PUBLICATION_FILTERS, EN_CATALOG.publicationFilters, 'id', locale),
    publicationArticles: mergeBy(PUBLICATION_ARTICLES, EN_CATALOG.publicationArticles, 'slug', locale),
    documentFilters: mergeBy(DOCUMENT_FILTERS, EN_CATALOG.documentFilters, 'id', locale),
    documents: mergeBy(DOCUMENT_ITEMS, EN_CATALOG.documents, 'code', locale),
    homeDocs: DEFAULT_HOME_DOCS.map((item, index) => ({ ...item, ...EN_CATALOG.homeDocs[index] })),
    contactChannels: mergeBy(CONTACT_CHANNELS, EN_CATALOG.contactChannels, 'email', locale),
    contactOffice: { ...CONTACT_OFFICE, ...EN_CATALOG.contactOffice },
    contactDocs: EN_CATALOG.contactDocs,
    requisites: CONTACT_REQUISITES.map((column, columnIndex) =>
      column.map((item, itemIndex) => ({
        ...item,
        ...EN_CATALOG.requisites[columnIndex]?.[itemIndex],
      })),
    ),
    cta: { ...DEFAULT_CTA, ...EN_CATALOG.cta },
  }
}

export type Catalog = ReturnType<typeof getCatalog>
