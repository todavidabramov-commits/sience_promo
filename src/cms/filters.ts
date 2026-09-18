import type { Messages } from '@/i18n/messages'

export function publicationFilters(t: Messages['pubs']) {
  return [
    { id: 'all', label: t.filterAll },
    { id: 'science', label: t.filterScience },
    { id: 'risks', label: t.filterRisks },
    { id: 'urban', label: t.filterUrban },
    { id: 'air', label: t.filterAir },
  ]
}

export function documentFilters(t: Messages['docs']) {
  return [
    { id: 'all', label: t.filterAll },
    { id: 'federal', label: t.filterFederal },
    { id: 'sanpin', label: t.filterSanpin },
    { id: 'methods', label: t.filterMethods },
    { id: 'accreditation', label: t.filterAccreditation },
  ]
}

export function projectFilters(t: Messages['projects']) {
  return [
    { id: 'all', label: t.filterAll },
    { id: 'aviation', label: t.filterAviation },
    { id: 'oilgas', label: t.filterOilgas },
    { id: 'urban', label: t.filterUrban },
  ]
}
