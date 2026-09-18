import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, RevealHero } from '@/components/Reveal'
import { getProject } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).projects
  const project = await getProject(slug, locale)
  if (!project) return { title: t.fallback }
  return { title: project.headline || project.title, description: project.summary || project.task }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).projects
  const common = getMessages(locale).common
  const project = await getProject(slug, locale)
  if (!project) notFound()

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/proekty.jpg"
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
              <em>{project.sector || project.clientType || common.caseFallback}</em>
            </nav>
            <span className="home-tag">{project.sector || project.clientType || common.caseFallback}</span>
            <h1>{project.headline || project.title}</h1>
            {project.summary ? <p>{project.summary}</p> : null}
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          {project.task ? (
            <Reveal>
              <article className="projects-case">
                <div className="projects-case__grid">
                  <div>
                    <em>{t.task}</em>
                    <p>{project.task}</p>
                  </div>
                  <div>
                    <em>{t.approach}</em>
                    <p>{project.approach}</p>
                  </div>
                  <div>
                    <em className="is-result">{t.result}</em>
                    <p className="is-result">{project.result}</p>
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
