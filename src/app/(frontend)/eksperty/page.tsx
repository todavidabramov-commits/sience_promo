import type { Metadata } from 'next'
import Image from 'next/image'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { getExperts } from '@/cms/queries'
import { getCatalog } from '@/i18n/catalog'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).experts
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ExpertsPage() {
  const locale = await getLocale()
  const t = getMessages(locale).experts
  const catalog = getCatalog(locale)
  const experts = await getExperts(locale)

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
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/microscope.svg" />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">{t.staffTag}</span>
            <h2>{t.staffTitle}</h2>
            <p className="about-section-lead">{t.staffLead}</p>
          </Reveal>
          <RevealStagger className="experts-list" stagger={0.08}>
            {experts.map((expert) => (
              <RevealItem key={expert.slug}>
                <article className="experts-row">
                  <div className="experts-row__media">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      quality={100}
                      sizes="(max-width: 980px) 100vw, 200px"
                    />
                  </div>
                  <div className="experts-row__body">
                    <span className="experts-row__badge">{expert.title}</span>
                    <h3>{expert.name}</h3>
                    <p className="experts-row__creds">{expert.credentials}</p>
                    <p className="experts-row__bio">{expert.bio}</p>
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
            <span className="home-tag">{t.teamTag}</span>
            <h2>{t.teamTitle}</h2>
            <p className="about-section-lead">{t.teamLead}</p>
          </Reveal>
          <RevealStagger className="experts-steps" stagger={0.08}>
            {catalog.expertSteps.map((step) => (
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
