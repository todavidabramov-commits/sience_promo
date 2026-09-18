'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

import { HighlightText } from '@/components/HighlightText'
import { fill } from '@/i18n/label'
import { useLocale } from '@/i18n/locale-context'
import { mapDocument } from '@/cms/map'
import { useLiveCollectionList } from '@/components/LivePreviewListener'
import type { DocumentView } from '@/cms/types'

type Filter = { id: string; label: string }

export function DocumentsCatalog({
  documents,
  filters,
}: {
  documents: DocumentView[]
  filters: Filter[]
}) {
  const { messages } = useLocale()
  const t = messages.docs
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const liveDocuments = useLiveCollectionList(
    'documents',
    documents,
    (doc, initial) => mapDocument(doc, { live: true, fallback: initial }),
    (item) => item.code,
  )

  const docs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return liveDocuments.filter((item) => {
      if (filter !== 'all' && item.section !== filter) return false
      if (!q) return true
      const sectionLabel = filters.find((entry) => entry.id === item.section)?.label || ''
      return (
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        sectionLabel.toLowerCase().includes(q)
      )
    })
  }, [liveDocuments, filter, filters, query])

  function reset() {
    setQuery('')
    setFilter('all')
  }

  function downloadCopy(doc: DocumentView) {
    if (doc.downloadUrl) {
      window.open(doc.downloadUrl, '_blank', 'noopener,noreferrer')
      return
    }
    const blob = new Blob(
      [`${doc.code}\n${doc.title}\n\n${doc.excerpt}\n\n${t.demoNote}`],
      { type: 'text/plain;charset=utf-8' },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${doc.code.replace(/[\\/:*?"<>|]+/g, '_')}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="docs-catalog">
      <div className="docs-toolbar">
        <div className="pubs-filters" role="group" aria-label={t.type}>
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
        <div className="docs-toolbar__find">
          <label className="docs-search">
            <Image src="/images/icons/search.svg" alt="" width={16} height={16} />
            <span className="sr-only">{t.search}</span>
            <input
              type="text"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setQuery('')
              }}
              placeholder={t.searchPlaceholder}
            />
            {query ? (
              <button
                className="docs-search__clear"
                type="button"
                aria-label={t.clear}
                onClick={() => setQuery('')}
              >
                ×
              </button>
            ) : null}
          </label>
          <p className="docs-meta" aria-live="polite">
            {query || filter !== 'all'
              ? fill(t.found, { n: docs.length, total: liveDocuments.length })
              : fill(t.count, { n: liveDocuments.length })}
          </p>
        </div>
      </div>

      {docs.length === 0 ? (
        <p className="pubs-empty">
          {t.empty}{' '}
          <button className="docs-reset" type="button" onClick={reset}>
            {t.reset}
          </button>
        </p>
      ) : (
        <div className="docs-grid">
          {docs.map((doc) => (
            <article className="docs-card" key={doc.code}>
              <div className="docs-card__top">
                <span className="docs-card__status">{t.active}</span>
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
                {t.download}
                <Image src="/images/icons/download.svg" alt="" width={16} height={16} />
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
