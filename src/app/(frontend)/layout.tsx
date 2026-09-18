import type { Metadata } from 'next'
import React from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ScrollToTop } from '@/components/ScrollToTop'
import { getContacts } from '@/cms/queries'
import { getLocale } from '@/i18n/get-locale'
import { LocaleProvider } from '@/i18n/locale-context'
import { getMessages } from '@/i18n/messages'

import './styles.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale())
  return {
    title: {
      default: t.meta.siteTitle,
      template: t.meta.template,
    },
    description: t.meta.description,
  }
}

export const viewport = {
  themeColor: '#0f172a',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = getMessages(locale)
  const contacts = await getContacts(locale)

  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <ScrollToTop />
          <SiteHeader
            companyName={contacts.companyName}
            tagline={contacts.tagline}
            phone={contacts.phone}
            email={contacts.email}
            address={contacts.address}
            nav={contacts.nav}
            ctaLabel={contacts.ctaLabel}
            ctaHref={contacts.ctaHref}
          />
          <main>{children}</main>
          <SiteFooter
            companyName={contacts.companyName}
            phone={contacts.phone}
            email={contacts.email}
            address={contacts.address}
            legal={contacts.legal}
            messages={messages}
          />
        </LocaleProvider>
      </body>
    </html>
  )
}
