'use client'

import Image from 'next/image'

import type { ContactsView } from '@/cms/types'
import { ContactsYandexMap } from '@/components/ContactsYandexMap'
import { LeadForm } from '@/components/LeadForm'
import { useLiveContacts } from '@/components/LivePreviewListener'
import { Reveal, RevealItem, RevealStagger } from '@/components/Reveal'
import type { Messages } from '@/i18n/messages'

export function ContactsLive({
  contacts,
  serviceOptions,
  t,
}: {
  contacts: ContactsView
  serviceOptions: { id: string; title: string }[]
  t: Messages['contacts']
}) {
  const live = useLiveContacts(contacts)
  const requisitesColumns = [
    live.requisites.slice(0, Math.ceil(live.requisites.length / 2)),
    live.requisites.slice(Math.ceil(live.requisites.length / 2)),
  ].filter((column) => column.length)

  return (
    <div className="home-wrap contacts-body">
      <RevealStagger className="contacts-channels" stagger={0.08}>
        {live.channels.map((item, index) => (
          <RevealItem key={`${item.email}-${index}`}>
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
          <h2>{live.officeTitle}</h2>
          <p>{live.address}</p>
          <div className="contacts-map__hours">
            <span>{t.hours}</span>
            <strong>{live.hours}</strong>
            <p>{live.officeNote}</p>
          </div>
        </div>
        <div className="contacts-map__visual">
          <ContactsYandexMap
            lat={live.lat}
            lon={live.lon}
            title={live.officeTitle}
            address={live.address}
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
              {live.contactDocs.map((item, index) => (
                <li key={`${index}-${item}`}>
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
  )
}

