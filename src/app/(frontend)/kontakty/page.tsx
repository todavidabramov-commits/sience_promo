import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactsLive } from '@/components/live/ContactsLive'
import { RevealHero } from '@/components/Reveal'
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
        <ContactsLive contacts={contacts} serviceOptions={serviceOptions} t={t} />
      </section>
    </>
  )
}
