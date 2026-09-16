'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { DEFAULT_NAV } from '@/lib/content'

type NavItem = { label: string; href: string }

export function SiteHeader({
  companyName,
  tagline,
  phone,
  nav,
  ctaLabel,
  ctaHref,
}: {
  companyName: string
  tagline?: string | null
  phone?: string | null
  nav?: NavItem[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const items = nav?.length ? nav : [...DEFAULT_NAV]

  return (
    <header className="site-header">
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
          className="mobile-nav-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          Меню
        </button>

        <nav className={`nav${open ? ' is-open' : ''}`}>
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
          <div className="site-header__actions site-header__actions--mobile">
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
