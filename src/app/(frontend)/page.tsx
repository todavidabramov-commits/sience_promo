import Image from 'next/image'
import Link from 'next/link'

import { CountUp } from '@/components/CountUp'
import { HeroMark } from '@/components/HeroMark'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import {
  DEFAULT_CTA,
  DEFAULT_EXPERTS,
  DEFAULT_HOME_DOCS,
  DEFAULT_INDUSTRIES,
  DEFAULT_METRICS,
  DEFAULT_PROJECTS,
  DEFAULT_PUBLICATIONS,
  DEFAULT_SERVICES,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  SERVICE_ICON_SRC,
} from '@/lib/content'

export default function HomePage() {
  const serviceOptions = DEFAULT_SERVICES.map((s) => ({ id: s.slug, title: s.title }))

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__bg" aria-hidden>
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="home-hero__bg-img"
          />
          <div className="home-hero__shade" />
        </div>

        <div className="home-wrap home-hero__content">
          <div className="home-hero__main">
            <RevealHero className="home-hero__copy">
              <span className="home-tag">Экспертиза высшего уровня</span>
              <h1>Научная точность в расчете экологических рисков и обосновании СЗЗ</h1>
              <p>
                Проектирование и экспертиза в области санитарно-эпидемиологической безопасности,
                промышленного шума и токсикологии. Надежные решения для авиации, девелопмента и крупной
                промышленности.
              </p>
            </RevealHero>

            <RevealHero className="home-hero__actions" delay={0.12}>
              <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
                Запросить коммерческое предложение
                <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
              </Link>
              <Link className="home-btn home-btn--ghost" href="/dokumenty">
                Презентация центра (PDF)
              </Link>
            </RevealHero>
          </div>

          <HeroMark />

          <RevealHero className="home-hero__stats" delay={0.22}>
            {DEFAULT_STATS.map((stat) => (
              <div key={stat.label}>
                <CountUp value={stat.value} />
                <span>{stat.label}</span>
              </div>
            ))}
          </RevealHero>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Направления деятельности</span>
            <h2>Комплексные исследования и гигиеническая оценка рисков</h2>
            <p className="home-section__aside">
              Разрабатываем технические решения, строго соответствующие федеральному законодательству
              и методикам Минприроды и Роспотребнадзора.
            </p>
          </Reveal>

          <RevealStagger className="home-services" stagger={0.07}>
            {DEFAULT_SERVICES.map((service) => {
              const icon = SERVICE_ICON_SRC[service.icon] || SERVICE_ICON_SRC['shield-alert']
              return (
                <RevealItem key={service.slug}>
                  <Link className="home-service" href={`/uslugi/${service.slug}`}>
                    <span className="home-service__icon">
                      <Image src={icon} alt="" width={20} height={20} />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head home-section__head--center">
            <span className="home-tag">Научно-экспертный потенциал</span>
            <h2>Почему нам доверяют экспертизу государственного масштаба</h2>
          </Reveal>
          <RevealStagger className="home-metrics" stagger={0.09}>
            {DEFAULT_METRICS.map((item) => (
              <RevealItem key={item.title}>
                <article className="home-metric">
                  <strong>{item.value}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Отраслевые решения</span>
            <h2>Отрасли наших ключевых заказчиков</h2>
          </Reveal>
          <RevealStagger className="home-industries" stagger={0.06}>
            {DEFAULT_INDUSTRIES.map((item) => (
              <RevealItem key={item.title}>
                <article className="home-industry">
                  <span className="home-industry__icon">
                    <Image
                      src={SERVICE_ICON_SRC[item.icon] || SERVICE_ICON_SRC.activity}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </span>
                  <div>
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
          <Reveal className="home-section__head home-section__head--row">
            <div>
              <span className="home-tag">Успешные кейсы</span>
              <h2>Реализованные проекты и экспертные заключения</h2>
            </div>
            <Link className="home-btn home-btn--outline home-btn--sm" href="/proekty">
              Все проекты
            </Link>
          </Reveal>
          <RevealStagger className="home-cases" stagger={0.1}>
            {DEFAULT_PROJECTS.map((project) => (
              <RevealItem key={project.slug}>
                <Link className="home-case" href={`/proekty/${project.slug}`}>
                  <div className="home-case__media">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      quality={100}
                      sizes="(max-width: 980px) 100vw, 33vw"
                    />
                  </div>
                  <div className="home-case__body">
                    <span className="home-case__badge">{project.clientType}</span>
                    <h3>{project.title}</h3>
                    <hr className="home-case__rule" />
                    <p>
                      <span className="home-case__label">Объем работ: </span>
                      <strong>{project.summary}</strong>
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap">
          <Reveal className="home-section__head home-section__head--center">
            <span className="home-tag">Порядок реализации</span>
            <h2>Этапы проектирования и экспертизы до получения СЭЗ</h2>
          </Reveal>
          <RevealStagger className="home-steps" stagger={0.08}>
            {DEFAULT_STEPS.map((step) => (
              <RevealItem key={step.num}>
                <article className="home-step">
                  <strong>{step.num}</strong>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Научный совет</span>
            <h2>Наши ведущие эксперты и академики</h2>
          </Reveal>
          <RevealStagger className="home-experts" stagger={0.1}>
            {DEFAULT_EXPERTS.map((expert) => (
              <RevealItem key={expert.slug}>
                <article className="home-expert">
                  <div className="home-expert__media">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      quality={100}
                      sizes="(max-width: 980px) 100vw, 33vw"
                    />
                  </div>
                  <div className="home-expert__body">
                    <span>{expert.role}</span>
                    <h3>{expert.name}</h3>
                    <p>{expert.bio}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap home-knowledge">
          <Reveal className="home-knowledge__col">
            <div className="home-knowledge__head">
              <span className="home-tag">База знаний</span>
              <h2>Научные публикации и методические материалы</h2>
            </div>
            <div className="home-pubs">
              {DEFAULT_PUBLICATIONS.map((pub) => (
                <Link className="home-pub" href={`/publikacii/${pub.slug}`} key={pub.slug}>
                  <span className="home-pub__cat">{pub.category}</span>
                  <strong>{pub.title}</strong>
                  <p>{pub.excerpt}</p>
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="home-knowledge__col" delay={0.1}>
            <div className="home-knowledge__head">
              <span className="home-tag">Шаблоны и стандарты</span>
              <h2>Формы и регламенты Роспотребнадзора</h2>
            </div>
            <div className="home-docs">
              {DEFAULT_HOME_DOCS.map((doc) => (
                <Link className="home-doc" href="/dokumenty" key={doc.title}>
                  <span className="home-docs__icon">
                    <Image src="/images/icons/file-text.svg" alt="" width={20} height={20} />
                  </span>
                  <span className="home-doc__info">
                    <strong>{doc.title}</strong>
                    <span className="home-doc__meta">
                      <em>{doc.meta}</em>
                      <em className="home-doc__file">{doc.file}</em>
                    </span>
                  </span>
                  <Image
                    className="home-doc__download"
                    src="/images/icons/download.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">{DEFAULT_CTA.tag}</span>
              <h2>{DEFAULT_CTA.title}</h2>
              <p>{DEFAULT_CTA.text}</p>
            </div>
            <ul>
              {DEFAULT_CTA.checks.map((item) => {
                const [lead, ...rest] = item.split(' — ')
                return (
                  <li key={item}>
                    <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                    <span>
                      <strong>{lead}</strong>
                      {rest.length ? ` — ${rest.join(' — ')}` : null}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <LeadForm type="proposal" services={serviceOptions} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
