'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { HighlightText } from '@/components/HighlightText'
import { RiseRings } from '@/components/RiseRings'
import { fill } from '@/i18n/label'
import { useLocale } from '@/i18n/locale-context'
import { digestSchema, yupFormResolver, type DigestFormValues } from '@/lib/validation'

type CatalogArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  section: string
}

type Filter = { id: string; label: string }

export function PubsDigest({ children }: { children: ReactNode }) {
  return (
    <RiseRings as="article" className="pubs-digest">
      {children}
    </RiseRings>
  )
}

export function PublicationsCatalog({
  articles,
  filters,
}: {
  articles: CatalogArticle[]
  filters: Filter[]
}) {
  const { messages } = useLocale()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const t = messages.pubs

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((item) => {
      if (filter !== 'all' && item.section !== filter) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    })
  }, [articles, filter, query])

  return (
    <div className="pubs-catalog">
      <div className="docs-toolbar">
        <div className="pubs-filters" role="group" aria-label={t.sections}>
          <span className="pubs-filters__label">{t.sectionsLabel}</span>
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
              ? fill(t.found, { n: visible.length, total: articles.length })
              : fill(t.count, { n: articles.length })}
          </p>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="pubs-empty">
          {t.empty}{' '}
          <button
            className="docs-reset"
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
          >
            {t.reset}
          </button>
        </p>
      ) : (
        <div className="pubs-grid">
          {visible.map((article) => (
            <Link className="pubs-card" href={`/publikacii/${article.slug}`} key={article.slug}>
              <div className="pubs-card__meta">
                <span className="pubs-card__cat">
                  <HighlightText text={article.category} query={query} />
                </span>
                <time>{article.date}</time>
              </div>
              <h3>
                <HighlightText text={article.title} query={query} />
              </h3>
              <p>
                <HighlightText text={article.excerpt} query={query} />
              </p>
              <span className="pubs-card__cta">
                {t.go}
                <span className="pubs-card__arrow" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function DigestForm() {
  const { messages } = useLocale()
  const t = messages.form
  const [sent, setSent] = useState(false)
  const schema = useMemo(() => digestSchema(messages.validation), [messages.validation])
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DigestFormValues>({
    resolver: yupFormResolver<DigestFormValues>(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '' },
  })

  async function onSubmit(values: DigestFormValues) {
    setSent(false)
    const data = new FormData()
    data.set('type', 'digest')
    data.set('name', t.digestName)
    data.set('email', values.email)
    data.set('message', t.digestMessage)

    try {
      const res = await fetch('/api/form', { method: 'POST', body: data })
      if (!res.ok) throw new Error('Request failed')
    } catch {
      setError('root', { message: t.fail })
      return
    }

    reset({ email: '' })
    setSent(true)
  }

  return (
    <form className="pubs-digest__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="pubs-digest__field">
        <label className="sr-only" htmlFor="digest-email">
          {t.digestLabel}
        </label>
        <input
          id="digest-email"
          type="email"
          placeholder={t.digestPlaceholder}
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          className={errors.email ? 'is-invalid' : undefined}
          aria-describedby={errors.email ? 'digest-email-error' : undefined}
          {...register('email')}
        />
        {errors.email ? (
          <span className="form-field__error" id="digest-email-error" role="alert">
            {errors.email.message}
          </span>
        ) : null}
      </div>
      <button className="home-btn home-btn--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.sending : sent ? t.done : t.subscribe}
      </button>
      {errors.root?.message ? (
        <p className="form-field__error pubs-digest__status" role="alert">
          {errors.root.message}
        </p>
      ) : null}
    </form>
  )
}
