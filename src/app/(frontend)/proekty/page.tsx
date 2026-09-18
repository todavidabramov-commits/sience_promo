import type { Metadata } from 'next'
import Image from 'next/image'

import { ProjectsCatalog } from '@/components/ProjectsCatalog'
import { Reveal, RevealHero } from '@/components/Reveal'
import { projectFilters } from '@/cms/filters'
import { getProjects } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).projects
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  const t = getMessages(locale).projects
  const cases = await getProjects(locale)

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
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal>
            <ProjectsCatalog cases={cases} filters={projectFilters(t)} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
