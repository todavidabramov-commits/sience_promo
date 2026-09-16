'use client'

import { useMemo, useState } from 'react'

import { PROJECT_CASES, PROJECT_FILTERS } from '@/lib/content'

export function ProjectsCatalog() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]['id']>('all')

  const cases = useMemo(
    () =>
      filter === 'all' ? PROJECT_CASES : PROJECT_CASES.filter((item) => item.section === filter),
    [filter],
  )

  return (
    <div className="projects-catalog">
      <div className="pubs-filters" role="group" aria-label="Отрасль">
        <span className="pubs-filters__label">Отрасль:</span>
        {PROJECT_FILTERS.map((item) => (
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

      {cases.length === 0 ? (
        <p className="pubs-empty">В этой отрасли пока нет кейсов.</p>
      ) : (
        <div className="projects-list">
          {cases.map((item) => (
            <article className="projects-case" key={item.slug}>
              <div className="projects-case__top">
                <h3>{item.title}</h3>
                <span className="projects-case__sector">{item.sector}</span>
              </div>
              <div className="projects-case__grid">
                <div>
                  <em>Поставленная задача</em>
                  <p>{item.task}</p>
                </div>
                <div>
                  <em>Наш экспертный подход</em>
                  <p>{item.approach}</p>
                </div>
                <div>
                  <em className="is-result">Итоговый результат</em>
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
