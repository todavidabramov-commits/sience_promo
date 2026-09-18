'use client'

import Image from 'next/image'
import Link from 'next/link'

import { mapService } from '@/cms/map'
import type { ServiceView } from '@/cms/types'
import { LeadForm } from '@/components/LeadForm'
import { useLiveCollection } from '@/components/LivePreviewListener'
import { Reveal, RevealHero } from '@/components/Reveal'
import type { Messages } from '@/i18n/messages'
import { SERVICE_ICON_SRC } from '@/lib/content'

export function ServiceDetailLive({
  service,
  serviceOptions,
  t,
  common,
}: {
  service: ServiceView
  serviceOptions: { id: string; title: string }[]
  t: Messages['services']
  common: Messages['common']
}) {
  const live = useLiveCollection('services', service, (doc, initial) =>
    mapService(doc, { live: true, fallback: initial }),
  )
  const icon = SERVICE_ICON_SRC[live.icon] || SERVICE_ICON_SRC['shield-alert']

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/uslugi.jpg"
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
          <RevealHero className="service-hero">
            <nav className="about-crumbs" aria-label={common.crumbs}>
              <Link href="/">{common.home}</Link>
              <span>/</span>
              <Link href="/uslugi">{t.crumb}</Link>
              <span>/</span>
              <em>{live.title}</em>
            </nav>
            <div className="about-hero__copy">
              <span className="home-tag">{t.heroTag}</span>
              <h1>{live.title}</h1>
              <p>{live.lead}</p>
            </div>
            <div className="service-hero__mark" aria-hidden>
              <span className="service-hero__ring" />
              <span className="service-hero__ring" />
              <span className="service-hero__ring" />
              <span className="service-hero__ring" />
              <span className="service-hero__icon">
                <Image src={icon} alt="" width={40} height={40} />
              </span>
            </div>
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap service-detail">
          <Reveal className="service-detail__block">
            <span className="home-tag">{t.aboutTag}</span>
            <h2>{t.aboutTitle}</h2>
            <div className="service-detail__about">
              {live.about.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
              ))}
              <p className="service-detail__audience">{live.audience}</p>
            </div>
          </Reveal>

          <Reveal className="service-detail__block">
            <span className="home-tag">{t.scopeTag}</span>
            <h2>{t.scopeTitle}</h2>
            <ul className="service-detail__scope">
              {live.scope.map((item, index) => (
                <li key={`${index}-${item.slice(0, 24)}`}>
                  <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="service-detail__block service-detail__block--wide">
            <span className="home-tag">{t.stagesTag}</span>
            <h2>{t.stagesTitle}</h2>
            <div className="service-detail__stages">
              {live.stages.map((stage, index) => (
                <article className="service-detail__stage" key={`${index}-${stage.title}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </article>
              ))}
              <article className="service-detail__stage is-result">
                <span>04</span>
                <h3>{t.resultTitle}</h3>
                <p>{live.result}</p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">{t.requestTag}</span>
              <h2>{t.requestTitle}</h2>
              <p>{t.requestLead}</p>
            </div>
            <Link className="home-btn home-btn--outline" href="/uslugi">
              {t.all}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm type="proposal" services={serviceOptions} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
