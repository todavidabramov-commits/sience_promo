import type { Metadata } from 'next'
import Image from 'next/image'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { EXPERT_BOARD, EXPERT_TEAM_STEPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Эксперты',
  description:
    'Высококвалифицированный Экспертный совет: доктора и кандидаты наук, авторы нормативно-методических документов в сфере гигиены.',
}

export default function ExpertsPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/eksperty.jpg"
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
            <span className="home-tag">Наши эксперты</span>
            <h1>Высококвалифицированный Экспертный совет без компромиссов</h1>
            <p>
              Мы не используем стоковые фотографии и вымышленные регалии. Команда нашего центра
              состоит из признанных докторов и кандидатов наук, авторов нормативно-методических
              документов в сфере гигиены.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/microscope.svg" />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Кадровый потенциал</span>
            <h2>Ведущие специалисты Органа Инспекции</h2>
            <p className="about-section-lead">
              Каждый руководитель направления обладает опытом работы в профильных
              научно-исследовательских институтах гигиены и токсикологии.
            </p>
          </Reveal>
          <RevealStagger className="experts-list" stagger={0.08}>
            {EXPERT_BOARD.map((expert) => (
              <RevealItem key={expert.slug}>
                <article className="experts-row">
                  <div className="experts-row__meta">
                    <span className="experts-row__badge">{expert.title}</span>
                    <h3>{expert.name}</h3>
                    <p>{expert.credentials}</p>
                  </div>
                  <div className="experts-row__spec">
                    <p>{expert.bio}</p>
                    <div className="experts-row__tags">
                      {expert.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Проектный инжиниринг</span>
            <h2>Как формируется рабочая группа под ваш проект</h2>
            <p className="about-section-lead">
              Мы не назначаем универсальных специалистов широкого профиля. Команда собирается под
              уникальные технологические факторы вашего объекта.
            </p>
          </Reveal>
          <RevealStagger className="experts-steps" stagger={0.08}>
            {EXPERT_TEAM_STEPS.map((step) => (
              <RevealItem key={step.num}>
                <article className="experts-step">
                  <strong>{step.num}</strong>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  )
}
