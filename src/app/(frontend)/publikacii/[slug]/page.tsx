import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, RevealHero } from '@/components/Reveal'
import { getPublication } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'
import type { ArticleBlock } from '@/lib/publication-bodies'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).pubs
  const pub = await getPublication(slug, locale)
  if (!pub) return { title: t.fallback }
  return { title: pub.title, description: pub.excerpt }
}

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="pubs-article__body">
      {blocks.map((block, index) => {
        if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>
        if (block.type === 'ul') {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        return <p key={index}>{block.text}</p>
      })}
    </div>
  )
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).pubs
  const common = getMessages(locale).common
  const pub = await getPublication(slug, locale)
  if (!pub) notFound()

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/hero-bg.jpg"
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
              <em>{pub.category || common.articleFallback}</em>
            </nav>
            <span className="home-tag">{pub.category || t.fallback}</span>
            <div className="about-hero__title">
              <h1>{pub.title}</h1>
              {pub.date || pub.readTime ? (
                <div className="pubs-article__hero-meta">
                  {pub.date ? <time>{pub.date}</time> : null}
                  {pub.readTime ? <span>{pub.readTime}</span> : null}
                </div>
              ) : null}
            </div>
            <p>{pub.excerpt}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap pubs-article">
          <Reveal>
            {pub.body.length ? (
              <ArticleBlocks blocks={pub.body} />
            ) : (
              <p>{t.preparing}</p>
            )}
            <Link className="home-btn home-btn--outline pubs-article__back" href="/publikacii">
              {t.all}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
