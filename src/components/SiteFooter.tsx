import Image from 'next/image'
import Link from 'next/link'

import type { Messages } from '@/i18n/messages'
import { fill } from '@/i18n/label'

export function SiteFooter({
  companyName,
  phone,
  email,
  address,
  legal,
  messages,
}: {
  companyName: string
  phone?: string | null
  email?: string | null
  address?: string | null
  legal?: string | null
  messages: Messages
}) {
  const t = messages.footer
  return (
    <footer className="site-footer">
      <div className="home-wrap site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__company">
            <Link href="/" className="brand brand--footer">
              <span className="brand-mark">
                <Image
                  src="/images/icons/logo-premium.png"
                  alt=""
                  width={48}
                  height={48}
                  quality={100}
                />
              </span>
              <span className="brand-text">
                <strong>{companyName}</strong>
                <span>{messages.common.tagline}</span>
              </span>
            </Link>
            <p className="site-footer__lead">{t.lead}</p>
            <p className="site-footer__note">{t.note}</p>
          </div>

          <div className="site-footer__nav">
            <div>
              <h4>{t.directions}</h4>
              <Link href="/uslugi/otsenka-riska">{t.links.risk}</Link>
              <Link href="/uslugi/szz">{t.links.szz}</Link>
              <Link href="/uslugi/sanepid-ekspertiza">{t.links.expertise}</Link>
              <Link href="/uslugi/shum">{t.links.noise}</Link>
              <Link href="/uslugi/toksikologiya">{t.links.tox}</Link>
            </div>

            <div>
              <h4>{t.info}</h4>
              <Link href="/o-kompanii">{t.links.about}</Link>
              <Link href="/eksperty">{t.links.experts}</Link>
              <Link href="/proekty">{t.links.projects}</Link>
              <Link href="/publikacii">{t.links.pubs}</Link>
              <Link href="/dokumenty">{t.links.docs}</Link>
            </div>

            <div className="site-footer__contacts">
              <h4>{t.contacts}</h4>
              <p className="site-footer__phone">{phone || '+7 (495) 120-44-88'}</p>
              <p>{email || 'info@sanepid-expert.ru'}</p>
              <p className="site-footer__address">
                {address ||
                  '119049, г. Москва, Ленинский проспект, д. 8, стр. 16, Научно-исследовательский кластер'}
              </p>
            </div>
          </div>
        </div>

        <hr className="site-footer__rule" />

        <div className="site-footer__bottom">
          <p>{legal || fill(t.legalDefault, { year: new Date().getFullYear() })}</p>
          <div className="site-footer__legal">
            <Link href="/dokumenty">{t.privacy}</Link>
            <Link href="/dokumenty">{t.disclosure}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
