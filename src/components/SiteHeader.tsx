'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DEFAULT_NAV } from '@/lib/content'

type NavItem = { label: string; href: string }

export function SiteHeader({
  companyName,
  tagline,
  phone,
  email,
  address,
  nav,
  ctaLabel,
  ctaHref,
}: {
  companyName: string
  tagline?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  nav?: NavItem[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const items = nav?.length ? nav : [...DEFAULT_NAV]

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <header className={`site-header${open ? ' is-nav-open' : ''}`}>
      <div className="site-header__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Image
              src="/images/icons/logo-premium.png"
              alt=""
              width={64}
              height={64}
              quality={100}
              priority
            />
          </span>
          <span className="brand-text">
            <strong>{companyName}</strong>
            <span>{tagline || 'Экспертный центр'}</span>
          </span>
        </Link>

        <button
          type="button"
          className={`mobile-nav-toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="mobile-nav-toggle__clip" aria-hidden>
            <span className="mobile-nav-toggle__ring" />
            <span className="mobile-nav-toggle__ring" />
            <span className="mobile-nav-toggle__ring" />
            <span className="mobile-nav-toggle__ring" />
          </span>
          <span className="mobile-nav-toggle__burger" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav className={`nav${open ? ' is-open' : ''}`}>
          <div className="nav__links">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'is-active' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="nav__footer">
            <div className="nav__phone">
              <span className="nav__caption">Телефон</span>
              {phone ? (
                <a className="nav-phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                  {phone}
                </a>
              ) : null}
            </div>
            <div className="nav__contacts">
              <span className="nav__caption">Контакты</span>
              {email ? (
                <a href={`mailto:${email}`} onClick={() => setOpen(false)}>
                  {email}
                </a>
              ) : null}
              {address ? <p className="nav__address">{address}</p> : null}
              <Link
                className="home-btn home-btn--primary home-btn--sm"
                href={ctaHref || '/kontakty?type=proposal'}
                onClick={() => setOpen(false)}
              >
                {ctaLabel || 'Запросить КП'}
                <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
              </Link>
            </div>
          </div>
        </nav>

        <div className="site-header__actions site-header__actions--desktop">
          {phone ? (
            <a className="nav-phone" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
              {phone}
            </a>
          ) : null}
          <Link
            className="home-btn home-btn--primary home-btn--sm"
            href={ctaHref || '/kontakty?type=proposal'}
            onClick={() => setOpen(false)}
          >
            {ctaLabel || 'Запросить КП'}
            <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
