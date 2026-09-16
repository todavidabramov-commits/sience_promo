'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import { HighlightText } from '@/components/HighlightText'
import { DOCUMENT_FILTERS, DOCUMENT_ITEMS } from '@/lib/content'

type DocItem = (typeof DOCUMENT_ITEMS)[number]

function matchesQuery(item: DocItem, query: string, sectionLabel: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    item.code.toLowerCase().includes(q) ||
    item.title.toLowerCase().includes(q) ||
    item.excerpt.toLowerCase().includes(q) ||
    sectionLabel.toLowerCase().includes(q)
  )
}

function downloadCopy(doc: DocItem) {
  const blob = new Blob(
    [
      `${doc.code}\n${doc.title}\n\n${doc.excerpt}\n\nДемонстрационная копия документа. Для официальной версии оформите запрос инспекторам центра.`,
    ],
    { type: 'text/plain;charset=utf-8' },
  )
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${doc.code.replace(/[\\/:*?"<>|]+/g, '_')}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

export function DocumentsCatalog() {
  const [filter, setFilter] = useState<(typeof DOCUMENT_FILTERS)[number]['id']>('all')
  const [query, setQuery] = useState('')

  const docs = useMemo(() => {
    return DOCUMENT_ITEMS.filter((item) => {
      if (filter !== 'all' && item.section !== filter) return false
      const sectionLabel = DOCUMENT_FILTERS.find((entry) => entry.id === item.section)?.label || ''
      return matchesQuery(item, query, sectionLabel)
    })
  }, [filter, query])

  function reset() {
    setQuery('')
    setFilter('all')
  }

  return (
    <div className="docs-catalog">
      <div className="docs-toolbar">
        <div className="pubs-filters" role="group" aria-label="Тип документа">
          {DOCUMENT_FILTERS.map((item) => (
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
        <div className="docs-toolbar__find">
          <label className="docs-search">
            <Image src="/images/icons/search.svg" alt="" width={16} height={16} />
            <span className="sr-only">Поиск по номеру или названию</span>
            <input
              type="text"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setQuery('')
              }}
              placeholder="Поиск по номеру или названию"
            />
            {query ? (
              <button
                className="docs-search__clear"
                type="button"
                aria-label="Очистить поиск"
                onClick={() => setQuery('')}
              >
                ×
              </button>
            ) : null}
          </label>
          <p className="docs-meta" aria-live="polite">
            {query || filter !== 'all'
              ? `Найдено ${docs.length} из ${DOCUMENT_ITEMS.length}`
              : `${DOCUMENT_ITEMS.length} документов в реестре`}
          </p>
        </div>
      </div>

      {docs.length === 0 ? (
        <p className="pubs-empty">
          По запросу ничего не найдено.{' '}
          <button className="docs-reset" type="button" onClick={reset}>
            Сбросить
          </button>
        </p>
      ) : (
        <div className="docs-grid">
          {docs.map((doc) => (
            <article className="docs-card" key={doc.code}>
              <div className="docs-card__top">
                <span className="docs-card__status">Действующий</span>
                <em>{doc.file}</em>
              </div>
              <strong className="docs-card__code">
                <HighlightText text={doc.code} query={query} />
              </strong>
              <h3>
                <HighlightText text={doc.title} query={query} />
              </h3>
              <p>
                <HighlightText text={doc.excerpt} query={query} />
              </p>
              <button className="home-btn home-btn--outline" type="button" onClick={() => downloadCopy(doc)}>
                Скачать копию
                <Image src="/images/icons/download.svg" alt="" width={16} height={16} />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
