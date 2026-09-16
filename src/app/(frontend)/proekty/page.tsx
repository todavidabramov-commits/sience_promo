import type { Metadata } from 'next'
import Image from 'next/image'

import { ProjectsCatalog } from '@/components/ProjectsCatalog'
import { Reveal, RevealHero } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Проекты',
  description:
    'Сложнейшие инженерно-экологические кейсы, успешно прошедшие Главгосэкспертизу.',
}

export default function ProjectsPage() {
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
            <span className="home-tag">Наши проекты</span>
            <h1>Сложнейшие инженерно-экологические кейсы, успешно прошедшие Главгосэкспертизу</h1>
            <p>
              Мы не скрываем результаты своей работы. Здесь собраны реальные примеры проектирования
              СЗЗ и оценки рисков для градообразующих предприятий и инфраструктурных узлов.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal>
            <ProjectsCatalog />
          </Reveal>
        </div>
      </section>
    </>
  )
}
