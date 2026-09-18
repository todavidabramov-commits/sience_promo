import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { DocumentsCatalog } from '@/components/DocumentsCatalog'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero } from '@/components/Reveal'
import { documentFilters } from '@/cms/filters'
import { getDocuments } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).docs
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function DocumentsPage() {
  const locale = await getLocale()
  const messages = getMessages(locale)
  const t = messages.docs
  const common = messages.common
  const documents = (await getDocuments(locale)).filter((item) => item.showInCatalog)

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/dokumenty.jpg"
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
            <nav className="about-crumbs" aria-label={common.crumbs}>
              <Link href="/">{common.home}</Link>
              <span>/</span>
              <span>{t.info}</span>
              <span>/</span>
              <em>{t.crumb}</em>
            </nav>
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/file-text.svg" />
        <div className="home-wrap">
          <Reveal>
            <DocumentsCatalog documents={documents} filters={documentFilters(t)} />
          </Reveal>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">{t.requestTag}</span>
              <h2>{t.requestTitle}</h2>
              <p>{t.requestLead}</p>
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
            <LeadForm type="document" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
