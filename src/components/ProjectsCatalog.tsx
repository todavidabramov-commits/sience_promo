'use client'

import { useMemo, useState } from 'react'

import { mapProject } from '@/cms/map'
import { useLiveCollectionList } from '@/components/LivePreviewListener'
import { useLocale } from '@/i18n/locale-context'
import type { ProjectView } from '@/cms/types'

type Filter = { id: string; label: string }

export function ProjectsCatalog({
  cases,
  filters,
}: {
  cases: ProjectView[]
  filters: Filter[]
}) {
  const { messages } = useLocale()
  const [filter, setFilter] = useState('all')
  const liveCases = useLiveCollectionList(
    'projects',
    cases,
    (doc, initial) => mapProject(doc, { live: true, fallback: initial }),
    (item) => item.slug,
  )

  const visible = useMemo(
    () => (filter === 'all' ? liveCases : liveCases.filter((item) => item.section === filter)),
    [liveCases, filter],
  )

  return (
    <div className="projects-catalog">
      <div className="pubs-filters" role="group" aria-label={messages.projects.industry}>
        <span className="pubs-filters__label">{messages.projects.industryLabel}</span>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`pubs-filters__btn${filter === item.id ? ' is-active' : ''}`}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="pubs-empty">{messages.projects.empty}</p>
      ) : (
        <div className="projects-list">
          {visible.map((item) => (
            <article className="projects-case" key={item.slug}>
              <div className="projects-case__top">
                <h3>{item.headline || item.title}</h3>
                <span className="projects-case__sector">{item.sector}</span>
              </div>
              <div className="projects-case__grid">
                <div>
                  <em>{messages.projects.task}</em>
                  <p>{item.task}</p>
                </div>
                <div>
                  <em>{messages.projects.approach}</em>
                  <p>{item.approach}</p>
                </div>
                <div>
                  <em className="is-result">{messages.projects.result}</em>
                  <p className="is-result">{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
