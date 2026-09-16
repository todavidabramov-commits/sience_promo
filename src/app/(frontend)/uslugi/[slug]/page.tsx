import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero } from '@/components/Reveal'
import { DEFAULT_SERVICES, SERVICE_ICON_SRC } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

type ServiceView = (typeof DEFAULT_SERVICES)[number]

export function generateStaticParams() {
  return DEFAULT_SERVICES.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = DEFAULT_SERVICES.find((item) => item.slug === slug)
  if (!service) return { title: 'Услуга' }
  return {
    title: service.title,
    description: service.lead,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = DEFAULT_SERVICES.find((item) => item.slug === slug) as ServiceView | undefined
  if (!service) notFound()

  const serviceOptions = DEFAULT_SERVICES.map((item) => ({ id: item.slug, title: item.title }))
  const icon = SERVICE_ICON_SRC[service.icon] || SERVICE_ICON_SRC['shield-alert']

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
            <nav className="about-crumbs" aria-label="Навигация">
              <Link href="/">Главная</Link>
              <span>/</span>
              <Link href="/uslugi">Услуги</Link>
              <span>/</span>
              <em>{service.title}</em>
            </nav>
            <div className="about-hero__copy">
              <span className="home-tag">Орган инспекции</span>
              <h1>{service.title}</h1>
              <p>{service.lead}</p>
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
            <span className="home-tag">Суть работы</span>
            <h2>Как устроено направление</h2>
            <div className="service-detail__about">
              {service.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="service-detail__audience">{service.audience}</p>
            </div>
          </Reveal>

          <Reveal className="service-detail__block">
            <span className="home-tag">Состав работ</span>
            <h2>Что входит в услугу</h2>
            <ul className="service-detail__scope">
              {service.scope.map((item) => (
                <li key={item}>
                  <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="service-detail__block service-detail__block--wide">
            <span className="home-tag">Порядок работ</span>
            <h2>Как идём от исходных данных к согласованию</h2>
            <div className="service-detail__stages">
              {service.stages.map((stage, index) => (
                <article className="service-detail__stage" key={stage.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </article>
              ))}
              <article className="service-detail__stage is-result">
                <span>04</span>
                <h3>Ожидаемый результат</h3>
                <p>{service.result}</p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">Запрос</span>
              <h2>Рассчитаем состав и стоимость по этому направлению</h2>
              <p>
                Пришлите ГПЗУ, инвентаризацию, ТЗ или хотя бы описание площадки. Подготовим
                технико-экономическое предложение в течение рабочего дня.
              </p>
            </div>
            <Link className="home-btn home-btn--outline" href="/uslugi">
              Все услуги
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
