import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { DigestForm, PubsDigest, PublicationsCatalog } from '@/components/PublicationsCatalog'
import { Reveal, RevealHero } from '@/components/Reveal'
import { FEATURED_PUBLICATION } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Публикации',
  description:
    'Экспертные материалы, публикации и научные исследования центра СанЭпидЭксперт.',
}

export default function PublicationsPage() {
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
              <span>Медиа-центр</span>
              <span>/</span>
              <em>Публикации</em>
            </nav>
            <span className="home-tag">Научный центр</span>
            <h1>Экспертные материалы, публикации и научные исследования</h1>
            <p>
              Мы делимся результатами прикладных токсикологических исследований, математического
              моделирования и инженерно-экологических изысканий, прошедших государственную
              экспертизу.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap pubs-content">
          <Reveal>
            <h2 className="pubs-featured__title">Выделенный материал</h2>
            <article className="pubs-featured">
              <div className="pubs-featured__info">
                <span className="home-tag">Особо актуально</span>
                <h3>{FEATURED_PUBLICATION.title}</h3>
                <p>{FEATURED_PUBLICATION.excerpt}</p>
                <div className="pubs-featured__meta">
                  <span className="pubs-featured__cat">{FEATURED_PUBLICATION.category}</span>
                  <span>Читать время: {FEATURED_PUBLICATION.readTime}</span>
                  <span>Опубликовано: {FEATURED_PUBLICATION.date}</span>
                </div>
                <Link className="home-btn home-btn--primary" href={`/publikacii/${FEATURED_PUBLICATION.slug}`}>
                  Читать полностью
                  <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
                </Link>
              </div>
              <div className="pubs-featured__media">
                <Image
                  src={FEATURED_PUBLICATION.image}
                  alt="Карта молекулярной сложности"
                  fill
                  quality={100}
                  sizes="(max-width: 980px) 100vw, 480px"
                />
              </div>
            </article>
          </Reveal>

          <Reveal>
            <PublicationsCatalog />
          </Reveal>

          <Reveal>
            <PubsDigest>
              <div className="pubs-digest__copy">
                <h2>Подпишитесь на профессиональный дайджест</h2>
                <p>
                  Регулярно отправляем актуальную информацию об изменении законодательства в сфере СЗЗ,
                  токсикологии и гигиенических нормативов. Без спама.
                </p>
              </div>
              <DigestForm />
            </PubsDigest>
          </Reveal>
        </div>
      </section>
    </>
  )
}
