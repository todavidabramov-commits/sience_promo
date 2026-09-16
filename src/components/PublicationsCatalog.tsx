'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { HighlightText } from '@/components/HighlightText'
import { RiseRings } from '@/components/RiseRings'
import { PUBLICATION_ARTICLES, PUBLICATION_FILTERS } from '@/lib/content'
import { digestSchema, yupFormResolver, type DigestFormValues } from '@/lib/validation'

export function PubsDigest({ children }: { children: ReactNode }) {
  return (
    <RiseRings as="article" className="pubs-digest">
      {children}
    </RiseRings>
  )
}

export function PublicationsCatalog() {
  const [filter, setFilter] = useState<(typeof PUBLICATION_FILTERS)[number]['id']>('all')
  const [query, setQuery] = useState('')

  const articles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PUBLICATION_ARTICLES.filter((item) => {
      if (filter !== 'all' && item.section !== filter) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    })
  }, [filter, query])

  return (
    <div className="pubs-catalog">
      <div className="docs-toolbar">
        <div className="pubs-filters" role="group" aria-label="Разделы публикаций">
          <span className="pubs-filters__label">Разделы:</span>
          {PUBLICATION_FILTERS.map((item) => (
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
            <span className="sr-only">Поиск по публикациям</span>
            <input
              type="text"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setQuery('')
              }}
              placeholder="Поиск по названию или теме"
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
              ? `Найдено ${articles.length} из ${PUBLICATION_ARTICLES.length}`
              : `${PUBLICATION_ARTICLES.length} материалов`}
          </p>
        </div>
      </div>

      {articles.length === 0 ? (
        <p className="pubs-empty">
          Ничего не найдено.{' '}
          <button
            className="docs-reset"
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
          >
            Сбросить
          </button>
        </p>
      ) : (
        <div className="pubs-grid">
          {articles.map((article) => (
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
                Перейти к статье
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
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DigestFormValues>({
    resolver: yupFormResolver<DigestFormValues>(digestSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '' },
  })

  async function onSubmit(values: DigestFormValues) {
    setSent(false)
    const data = new FormData()
    data.set('type', 'digest')
    data.set('name', 'Подписка на дайджест')
    data.set('email', values.email)
    data.set('message', 'Прошу включить адрес в профессиональный дайджест СанЭпидЭксперт.')

    try {
      const res = await fetch('/api/form', { method: 'POST', body: data })
      if (!res.ok) throw new Error('Request failed')
    } catch {
      setError('root', { message: 'Не удалось отправить' })
      return
    }

    reset({ email: '' })
    setSent(true)
  }

  return (
    <form className="pubs-digest__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="pubs-digest__field">
        <label className="sr-only" htmlFor="digest-email">
          E-mail для дайджеста
        </label>
        <input
          id="digest-email"
          type="email"
          placeholder="E-mail для дайджеста"
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
        {isSubmitting ? 'Отправка…' : sent ? 'Готово' : 'Подписаться'}
      </button>
      {errors.root?.message ? (
        <p className="form-field__error pubs-digest__status" role="alert">
          {errors.root.message}
        </p>
      ) : null}
    </form>
  )
}
