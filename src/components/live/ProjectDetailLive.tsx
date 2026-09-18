'use client'

import Link from 'next/link'

import { mapProject } from '@/cms/map'
import type { ProjectView } from '@/cms/types'
import { isCmsMedia } from '@/cms/utils'
import { CmsImage } from '@/components/CmsImage'
import { useLiveCollection } from '@/components/LivePreviewListener'
import { Reveal, RevealHero } from '@/components/Reveal'
import type { Messages } from '@/i18n/messages'

export function ProjectDetailLive({
  project,
  t,
  common,
}: {
  project: ProjectView
  t: Messages['projects']
  common: Messages['common']
}) {
  const live = useLiveCollection('projects', project, (doc, initial) =>
    mapProject(doc, { live: true, fallback: initial }),
  )
  const hero = isCmsMedia(live.image) ? live.image : '/images/heroes/proekty.jpg'

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
              <Link href="/proekty">{t.crumb}</Link>
              <span>/</span>
              <em>{live.sector || live.clientType || common.caseFallback}</em>
            </nav>
            <span className="home-tag">{live.sector || live.clientType || common.caseFallback}</span>
            <h1>{live.headline || live.title}</h1>
            {live.summary ? <p>{live.summary}</p> : null}
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          {live.task ? (
            <Reveal>
              <article className="projects-case">
                <div className="projects-case__grid">
                  <div>
                    <em>{t.task}</em>
                    <p>{live.task}</p>
                  </div>
                  <div>
                    <em>{t.approach}</em>
                    <p>{live.approach}</p>
                  </div>
                  <div>
                    <em className="is-result">{t.result}</em>
                    <p className="is-result">{live.result}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ) : (
            <Reveal className="pubs-article">
              <p>{t.cmsPlaceholder}</p>
            </Reveal>
          )}
          <Reveal>
            <div className="projects-detail__actions">
              <Link className="home-btn home-btn--outline" href="/proekty">
                {t.all}
              </Link>
              <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
                {t.similar}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
