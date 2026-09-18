import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { DigestForm, PubsDigest, PublicationsCatalog } from '@/components/PublicationsCatalog'
import { Reveal, RevealHero } from '@/components/Reveal'
import { publicationFilters } from '@/cms/filters'
import { getPublications } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).pubs
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function PublicationsPage() {
  const locale = await getLocale()
  const t = getMessages(locale).pubs
  const common = getMessages(locale).common
  const publications = await getPublications(locale)
  const featured = publications.find((item) => item.featured) || publications[0]
  const articles = publications.filter((item) => item.showInCatalog)

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
              <span>{t.media}</span>
              <span>/</span>
              <em>{t.crumb}</em>
            </nav>
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap pubs-content">
          {featured ? (
            <Reveal>
              <h2 className="pubs-featured__title">{t.featured}</h2>
              <article className="pubs-featured">
                <div className="pubs-featured__info">
                  <span className="home-tag">{t.featuredTag}</span>
                  <h3>{featured.title}</h3>
                  <p>{featured.excerpt}</p>
                  <div className="pubs-featured__meta">
                    <span className="pubs-featured__cat">{featured.category}</span>
                    <span>
                      {t.readTime} {featured.readTime}
                    </span>
                    <span>
                      {t.published} {featured.date}
                    </span>
                  </div>
                  <Link className="home-btn home-btn--primary" href={`/publikacii/${featured.slug}`}>
                    {t.readFull}
                    <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
                  </Link>
                </div>
                <div className="pubs-featured__media">
                  <Image
                    src={featured.image}
                    alt={t.featuredAlt}
                    fill
                    quality={100}
                    sizes="(max-width: 980px) 100vw, 480px"
                  />
                </div>
              </article>
            </Reveal>
          ) : null}

          <Reveal>
            <PublicationsCatalog articles={articles} filters={publicationFilters(t)} />
          </Reveal>

          <Reveal>
            <PubsDigest>
              <div className="pubs-digest__copy">
                <h2>{t.digestTitle}</h2>
                <p>{t.digestLead}</p>
              </div>
              <DigestForm />
            </PubsDigest>
          </Reveal>
        </div>
      </section>
    </>
  )
}
