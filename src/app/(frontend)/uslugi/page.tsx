import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { DEFAULT_SERVICES, SERVICE_ICON_SRC } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Полный спектр экспертных работ в области гигиены, токсикологии и санитарно-защитных зон.',
}

const RFP_CHECKS = [
  'Детализированное ТКП с обоснованием стоимости',
  'Полная конфиденциальность по соглашению NDA',
  'Опыт согласования в Центральном аппарате Роспотребнадзора',
] as const

export default function ServicesPage() {
  const serviceOptions = DEFAULT_SERVICES.map((s) => ({ id: s.slug, title: s.title }))

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
          <RevealHero className="about-hero__copy">
            <span className="home-tag">Услуги центра</span>
            <h1>Полный спектр экспертных работ в области гигиены, токсикологии и СЗЗ</h1>
            <p>
              Оказываем высокотехнологичные инжиниринговые и консалтинговые услуги для девелопмента,
              авиации и промышленности. Гарантируем легитимность каждого этапа разработки.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/layers.svg" />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Каталог услуг</span>
            <h2>9 ключевых направлений деятельности Органа Инспекции</h2>
            <p className="about-section-lead">
              Мы не предлагаем стандартные шаблоны. Каждое направление обеспечивается
              специализированной группой инженеров-акустиков, токсикологов и врачей по общей гигиене.
            </p>
          </Reveal>

          <RevealStagger className="services-catalog" stagger={0.06}>
            {DEFAULT_SERVICES.map((service, index) => {
              const icon = SERVICE_ICON_SRC[service.icon] || SERVICE_ICON_SRC['shield-alert']
              const num = String(index + 1).padStart(2, '0')
              return (
                <RevealItem key={service.slug}>
                  <Link className="services-card" href={`/uslugi/${service.slug}`}>
                    <div className="services-card__top">
                      <span className="services-card__icon">
                        <Image src={icon} alt="" width={20} height={20} />
                      </span>
                      <span className="services-card__num">{num}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <div className="services-card__result">
                      <em>Ожидаемый результат:</em>
                      <span>{service.result}</span>
                    </div>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">Калькуляция</span>
              <h2>Оценка стоимости проектирования и экспертизы за 1 рабочий день</h2>
              <p>
                Отправьте имеющиеся чертежи, градостроительные планы или техническое задание. Мы
                детально рассчитаем бюджет без скрытых платежей.
              </p>
            </div>
            <ul>
              {RFP_CHECKS.map((item) => (
                <li key={item}>
                  <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm type="proposal" services={serviceOptions} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
