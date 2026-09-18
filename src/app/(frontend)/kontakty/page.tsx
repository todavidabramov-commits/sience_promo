import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactsYandexMap } from '@/components/ContactsYandexMap'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import { getContacts, getServiceOptions } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale()).contacts
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ContactsPage() {
  const locale = await getLocale()
  const t = getMessages(locale).contacts
  const common = getMessages(locale).common
  const [contacts, serviceOptions] = await Promise.all([
    getContacts(locale),
    getServiceOptions(locale),
  ])
  const requisitesColumns = [
    contacts.requisites.slice(0, Math.ceil(contacts.requisites.length / 2)),
    contacts.requisites.slice(Math.ceil(contacts.requisites.length / 2)),
  ].filter((column) => column.length)

  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/kontakty.jpg"
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
              <span>{t.crumbParent}</span>
              <span>/</span>
              <em>{t.crumb}</em>
            </nav>
            <span className="home-tag">{t.tag}</span>
            <h1>{t.title}</h1>
            <p>{t.lead}</p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap contacts-body">
          <RevealStagger className="contacts-channels" stagger={0.08}>
            {contacts.channels.map((item) => (
              <RevealItem key={item.email}>
                <article className="contacts-card">
                  <h3>{item.title}</h3>
                  <div className="contacts-card__links">
                    <a href={`tel:${item.phone.replace(/[^\d+]/g, '')}`}>{item.phone}</a>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="contacts-map">
            <div className="contacts-map__info">
              <span className="home-tag">{t.addressTag}</span>
              <h2>{contacts.officeTitle}</h2>
              <p>{contacts.address}</p>
              <div className="contacts-map__hours">
                <span>{t.hours}</span>
                <strong>{contacts.hours}</strong>
                <p>{contacts.officeNote}</p>
              </div>
            </div>
            <div className="contacts-map__visual">
              <ContactsYandexMap
                lat={contacts.lat}
                lon={contacts.lon}
                title={contacts.officeTitle}
                address={contacts.address}
              />
            </div>
          </Reveal>

          <div className="home-cta">
            <Reveal className="home-cta__copy">
              <div className="home-cta__intro">
                <span className="home-tag">{t.calcTag}</span>
                <h2>{t.calcTitle}</h2>
                <p>{t.calcLead}</p>
              </div>
              <div className="contacts-docs">
                <p className="contacts-docs-label">{t.docsLabel}</p>
                <ul>
                  {contacts.contactDocs.map((item) => (
                    <li key={item}>
                      <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <LeadForm type="proposal" variant="contacts" services={serviceOptions} />
            </Reveal>
          </div>

          <Reveal>
            <article className="contacts-reqs">
              <h2>{t.requisites}</h2>
              <dl className="contacts-reqs__grid">
                {requisitesColumns.map((column) => (
                  <div key={column[0].label}>
                    {column.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  )
}
