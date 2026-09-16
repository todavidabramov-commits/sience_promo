import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, RevealHero } from '@/components/Reveal'
import { DEFAULT_PROJECTS, PROJECT_CASES } from '@/lib/content'
import { getPayloadClient } from '@/lib/payload'

type Props = { params: Promise<{ slug: string }> }

type ProjectView = {
  title: string
  summary?: string
  clientType?: string
  sector?: string
  task?: string
  approach?: string
  result?: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await findProject(slug)
  if (!project) return { title: 'Проект' }
  return { title: project.title, description: project.summary || project.task }
}

async function findProject(slug: string): Promise<ProjectView | null> {
  const payload = await getPayloadClient()
  const fromCms = await payload
    .find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => null)

  if (fromCms?.docs?.[0]) {
    const p = fromCms.docs[0]
    return { title: p.title, summary: p.summary, clientType: p.clientType || '' }
  }

  const detailed = PROJECT_CASES.find((p) => p.slug === slug)
  if (detailed) {
    return {
      title: detailed.title,
      summary: detailed.result,
      clientType: detailed.sector,
      sector: detailed.sector,
      task: detailed.task,
      approach: detailed.approach,
      result: detailed.result,
    }
  }

  return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await findProject(slug)
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
            <nav className="about-crumbs" aria-label="Навигация">
              <Link href="/">Главная</Link>
              <span>/</span>
              <Link href="/proekty">Проекты</Link>
              <span>/</span>
              <em>{project.sector || project.clientType || 'Кейс'}</em>
            </nav>
            <span className="home-tag">{project.sector || project.clientType || 'Кейс'}</span>
            <h1>{project.title}</h1>
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
                    <em>Поставленная задача</em>
                    <p>{project.task}</p>
                  </div>
                  <div>
                    <em>Наш экспертный подход</em>
                    <p>{project.approach}</p>
                  </div>
                  <div>
                    <em className="is-result">Итоговый результат</em>
                    <p className="is-result">{project.result}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ) : (
            <Reveal className="pubs-article">
              <p>
                Подробное описание кейса можно вести в CMS: исходные данные, методы, результаты и
                связанные услуги.
              </p>
            </Reveal>
          )}
          <Reveal>
            <div className="projects-detail__actions">
              <Link className="home-btn home-btn--outline" href="/proekty">
                Все проекты
              </Link>
              <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
                Похожая задача
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
