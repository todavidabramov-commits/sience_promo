import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { RiseRings } from '@/components/RiseRings'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).about
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function AboutPage() {
  const t = getMessages(await getLocale()).about

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
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">{t.valuesTag}</span>
            <h2>{t.valuesTitle}</h2>
            <p className="about-section-lead">{t.valuesLead}</p>
          </Reveal>

          <RevealStagger className="about-principles" stagger={0.08}>
            {t.principles.map((item) => (
              <RevealItem key={item.title}>
                <article className="about-principle">
                  <span className="about-principle__icon">
                    <Image src={item.icon} alt="" width={24} height={24} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section catalog-section">
        <CatalogSectionMark icon="/images/icons/logo-premium.png" exact />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">{t.historyTag}</span>
            <h2>{t.historyTitle}</h2>
            <p className="about-section-lead">{t.historyLead}</p>
          </Reveal>

          <RevealStagger className="about-timeline" stagger={0.07}>
            {t.history.map((item) => (
              <RevealItem key={item.year}>
                <article className="about-timeline__item">
                  <span className="about-timeline__year">{item.year}</span>
                  <div className="about-timeline__text">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">{t.licencesTag}</span>
            <h2>{t.licencesTitle}</h2>
            <p className="about-section-lead">{t.licencesLead}</p>
          </Reveal>

          <RevealStagger className="about-licences" stagger={0.08}>
            {t.licences.map((item) => (
              <RevealItem key={item.code}>
                <article className="about-licence">
                  <strong>{item.code}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <RiseRings as="section" className="about-cta">
        <div className="home-wrap about-cta__inner">
          <Reveal className="about-cta__copy">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
              {t.cta}
              <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </RiseRings>
    </>
  )
}
