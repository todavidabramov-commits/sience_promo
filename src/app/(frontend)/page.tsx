import Image from 'next/image'
import Link from 'next/link'

import { CountUp } from '@/components/CountUp'
import { HeroMark } from '@/components/HeroMark'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { getDocuments, getExperts, getProjects, getPublications, getServices } from '@/cms/queries'
import { getCatalog } from '@/i18n/catalog'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'
import { SERVICE_ICON_SRC } from '@/lib/content'

export default async function HomePage() {
  const locale = await getLocale()
  const t = getMessages(locale).home
  const catalog = getCatalog(locale)
  const [services, projects, experts, publications, documents] = await Promise.all([
    getServices(locale),
    getProjects(locale),
    getExperts(locale),
    getPublications(locale),
    getDocuments(locale),
  ])
  const serviceOptions = services.map((s) => ({ id: s.slug, title: s.title }))
  const homeProjects = projects.filter((item) => item.showOnHome)
  const homeExperts = experts.filter((item) => item.showOnHome)
  const homePubs = publications.filter((item) => item.showOnHome)
  const homeDocs = documents.filter((item) => item.showOnHome)

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
              <span className="home-tag">{t.tag}</span>
              <h1>{t.title}</h1>
              <p>{t.lead}</p>
            </RevealHero>

            <RevealHero className="home-hero__actions" delay={0.12}>
              <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
                {t.request}
                <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
              </Link>
              <Link className="home-btn home-btn--ghost" href="/dokumenty">
                {t.presentation}
              </Link>
            </RevealHero>
          </div>

          <HeroMark />

          <RevealHero className="home-hero__stats" delay={0.22}>
            {catalog.stats.map((stat) => (
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
            <span className="home-tag">{t.servicesTag}</span>
            <h2>{t.servicesTitle}</h2>
            <p className="home-section__aside">{t.servicesAside}</p>
          </Reveal>

          <RevealStagger className="home-services" stagger={0.07}>
            {services.map((service) => {
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
            <span className="home-tag">{t.metricsTag}</span>
            <h2>{t.metricsTitle}</h2>
          </Reveal>
          <RevealStagger className="home-metrics" stagger={0.09}>
            {catalog.metrics.map((item) => (
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
            <span className="home-tag">{t.industriesTag}</span>
            <h2>{t.industriesTitle}</h2>
          </Reveal>
          <RevealStagger className="home-industries" stagger={0.06}>
            {catalog.industries.map((item) => (
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
              <span className="home-tag">{t.casesTag}</span>
              <h2>{t.casesTitle}</h2>
            </div>
            <Link className="home-btn home-btn--outline home-btn--sm" href="/proekty">
              {t.allProjects}
            </Link>
          </Reveal>
          <RevealStagger className="home-cases" stagger={0.1}>
            {(homeProjects.length ? homeProjects : projects).map((project) => (
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
                      <span className="home-case__label">{t.scope}</span>
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
            <span className="home-tag">{t.stepsTag}</span>
            <h2>{t.stepsTitle}</h2>
          </Reveal>
          <RevealStagger className="home-steps" stagger={0.08}>
            {catalog.steps.map((step) => (
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
            <span className="home-tag">{t.expertsTag}</span>
            <h2>{t.expertsTitle}</h2>
          </Reveal>
          <RevealStagger className="home-experts" stagger={0.1}>
            {(homeExperts.length ? homeExperts : experts).map((expert) => (
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
              <span className="home-tag">{t.knowledgeTag}</span>
              <h2>{t.knowledgeTitle}</h2>
            </div>
            <div className="home-pubs">
              {homePubs.map((pub) => (
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
              <span className="home-tag">{t.docsTag}</span>
              <h2>{t.docsTitle}</h2>
            </div>
            <div className="home-docs">
              {homeDocs.map((doc) => (
                <Link className="home-doc" href="/dokumenty" key={doc.code}>
                  <span className="home-docs__icon">
                    <Image src="/images/icons/file-text.svg" alt="" width={20} height={20} />
                  </span>
                  <span className="home-doc__info">
                    <strong>{doc.title}</strong>
                    <span className="home-doc__meta">
                      <em>{doc.homeMeta}</em>
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
              <span className="home-tag">{catalog.cta.tag}</span>
              <h2>{catalog.cta.title}</h2>
              <p>{catalog.cta.text}</p>
            </div>
            <ul>
              {catalog.cta.checks.map((item) => {
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
