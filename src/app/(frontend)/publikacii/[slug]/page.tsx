import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, RevealHero } from '@/components/Reveal'
import { DEFAULT_PUBLICATIONS, FEATURED_PUBLICATION, PUBLICATION_ARTICLES } from '@/lib/content'
import { getPayloadClient } from '@/lib/payload'
import {
  getPublicationBody,
  lexicalToBlocks,
  type ArticleBlock,
} from '@/lib/publication-bodies'

type Props = { params: Promise<{ slug: string }> }

type PublicationView = {
  title: string
  excerpt: string
  category: string
  date?: string
  readTime?: string
  body: ArticleBlock[]
}

const LOCAL_PUBLICATIONS = [
  FEATURED_PUBLICATION,
  ...PUBLICATION_ARTICLES,
  ...DEFAULT_PUBLICATIONS,
] as const

export function generateStaticParams() {
  return LOCAL_PUBLICATIONS.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pub = await findPublication(slug)
  if (!pub) return { title: 'Публикация' }
  return { title: pub.title, description: pub.excerpt }
}

function localPublication(slug: string) {
  return LOCAL_PUBLICATIONS.find((item) => item.slug === slug) || null
}

async function findPublication(slug: string): Promise<PublicationView | null> {
  const local = localPublication(slug)
  const payload = await getPayloadClient()
  const fromCms = await payload
    .find({ collection: 'publications', where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => null)

  const cms = fromCms?.docs?.[0]
  const cmsBody = cms ? lexicalToBlocks(cms.content) : []
  const body = cmsBody.length ? cmsBody : getPublicationBody(slug) || []

  if (cms) {
    return {
      title: cms.title,
      excerpt: cms.excerpt,
      category: local && 'category' in local ? local.category : cms.category || '',
      date: local && 'date' in local ? local.date : undefined,
      readTime: local && 'readTime' in local ? local.readTime : undefined,
      body,
    }
  }

  if (!local) return null

  return {
    title: local.title,
    excerpt: local.excerpt,
    category: local.category,
    date: 'date' in local ? local.date : undefined,
    readTime: 'readTime' in local ? local.readTime : undefined,
    body,
  }
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
  const pub = await findPublication(slug)
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
            <nav className="about-crumbs" aria-label="Навигация">
              <Link href="/">Главная</Link>
              <span>/</span>
              <Link href="/publikacii">Публикации</Link>
              <span>/</span>
              <em>{pub.category || 'Статья'}</em>
            </nav>
            <span className="home-tag">{pub.category || 'Публикация'}</span>
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
              <p>Текст материала готовится к публикации.</p>
            )}
            <Link className="home-btn home-btn--outline pubs-article__back" href="/publikacii">
              Все публикации
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
