import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactsYandexMap } from '@/components/ContactsYandexMap'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'
import {
  CONTACT_CHANNELS,
  CONTACT_OFFICE,
  CONTACT_REQUISITES,
  CONTACT_RFP_DOCS,
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Контакты экспертного центра и навигационная карта. Свяжитесь с руководителями инспекционных направлений.',
}

export default function ContactsPage() {
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
            <nav className="about-crumbs" aria-label="Навигация">
              <Link href="/">Главная</Link>
              <span>/</span>
              <span>Связь с нами</span>
              <span>/</span>
              <em>Контакты</em>
            </nav>
            <span className="home-tag">Адрес и реквизиты</span>
            <h1>Контакты экспертного центра и навигационная карта</h1>
            <p>
              Свяжитесь напрямую с руководителями инспекционных направлений или посетите наш
              научно-исследовательский кластер на Ленинском проспекте.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap contacts-body">
          <RevealStagger className="contacts-channels" stagger={0.08}>
            {CONTACT_CHANNELS.map((item) => (
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
              <span className="home-tag">Адрес</span>
              <h2>{CONTACT_OFFICE.title}</h2>
              <p>{CONTACT_OFFICE.address}</p>
              <div className="contacts-map__hours">
                <span>Режим работы:</span>
                <strong>{CONTACT_OFFICE.hours}</strong>
                <p>{CONTACT_OFFICE.note}</p>
              </div>
            </div>
            <div className="contacts-map__visual">
              <ContactsYandexMap
                lat={CONTACT_OFFICE.coords[0]}
                lon={CONTACT_OFFICE.coords[1]}
                title={CONTACT_OFFICE.title}
                address={CONTACT_OFFICE.address}
              />
            </div>
          </Reveal>

          <div className="home-cta">
            <Reveal className="home-cta__copy">
              <div className="home-cta__intro">
                <span className="home-tag">Расчет затрат</span>
                <h2>Направить исходные данные на калькуляцию КП</h2>
                <p>
                  Прикрепите ситуационный или градостроительный план, и наши инженеры в течение 1
                  рабочего дня сформируют прозрачное коммерческое предложение.
                </p>
              </div>
              <div className="contacts-docs">
                <p className="contacts-docs-label">Желательные исходные документы:</p>
                <ul>
                  {CONTACT_RFP_DOCS.map((item) => (
                    <li key={item}>
                      <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <LeadForm type="proposal" variant="contacts" />
            </Reveal>
          </div>

          <Reveal>
            <article className="contacts-reqs">
              <h2>Реквизиты организации</h2>
              <dl className="contacts-reqs__grid">
                {CONTACT_REQUISITES.map((column) => (
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
