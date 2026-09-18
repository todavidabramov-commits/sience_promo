'use client'

import Link from 'next/link'

import { mapPublication } from '@/cms/map'
import type { PublicationView } from '@/cms/types'
import { isCmsMedia } from '@/cms/utils'
import { CmsImage } from '@/components/CmsImage'
import { useLiveCollection } from '@/components/LivePreviewListener'
import { Reveal, RevealHero } from '@/components/Reveal'
import type { Messages } from '@/i18n/messages'
import type { ArticleBlock } from '@/lib/publication-bodies'

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="pubs-article__body">
      {blocks.map((block, index) => {
        if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>
        if (block.type === 'ul') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item}`}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={index}>{block.text}</p>
      })}
    </div>
  )
}

export function PublicationDetailLive({
  publication,
  t,
  common,
}: {
  publication: PublicationView
  t: Messages['pubs']
  common: Messages['common']
}) {
  const live = useLiveCollection('publications', publication, (doc, initial) =>
    mapPublication(doc, { live: true, fallback: initial }),
  )
  const hero = isCmsMedia(live.image) ? live.image : '/images/hero-bg.jpg'

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <CmsImage
            src={hero}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="about-hero__bg-img"
          />
          <div className="about-hero__shade" />
        </div>
        <div className="home-wrap about-hero__content">
          <RevealHero className="about-hero__copy">
            <nav className="about-crumbs" aria-label={common.crumbs}>
              <Link href="/">{common.home}</Link>
              <span>/</span>
              <Link href="/publikacii">{t.crumb}</Link>
              <span>/</span>
              <em>{live.category || common.articleFallback}</em>
            </nav>
            <span className="home-tag">{live.category || t.fallback}</span>
            <div className="about-hero__title">
              <h1>{live.title}</h1>
              {live.date || live.readTime ? (
                <div className="pubs-article__hero-meta">
                  {live.date ? <time>{live.date}</time> : null}
                  {live.readTime ? <span>{live.readTime}</span> : null}
                </div>
              ) : null}
            </div>
            <p>{live.excerpt}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap pubs-article">
          <Reveal>
            {live.body.length ? <ArticleBlocks blocks={live.body} /> : <p>{t.preparing}</p>}
            <Link className="home-btn home-btn--outline pubs-article__back" href="/publikacii">
              {t.all}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
