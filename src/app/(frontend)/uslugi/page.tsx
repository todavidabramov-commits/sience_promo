import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { getServiceOptions, getServices } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'
import { SERVICE_ICON_SRC } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).services
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ServicesPage() {
  const locale = await getLocale()
  const t = getMessages(locale).services
  const [services, serviceOptions] = await Promise.all([
    getServices(locale),
    getServiceOptions(locale),
  ])

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
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/layers.svg" />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">{t.catalogTag}</span>
            <h2>{t.catalogTitle}</h2>
            <p className="about-section-lead">{t.catalogLead}</p>
          </Reveal>

          <RevealStagger className="services-catalog" stagger={0.06}>
            {services.map((service, index) => {
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
                      <em>{t.expected}</em>
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
              <span className="home-tag">{t.calcTag}</span>
              <h2>{t.calcTitle}</h2>
              <p>{t.calcLead}</p>
            </div>
            <ul>
              {t.checks.map((item) => (
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
