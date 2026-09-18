import type { Metadata } from 'next'
import React from 'react'

import { ScrollToTop } from '@/components/ScrollToTop'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { SiteChrome } from '@/components/SiteChrome'
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
          <LivePreviewListener>
            <ScrollToTop />
            <SiteChrome contacts={contacts} messages={messages}>
              {children}
            </SiteChrome>
          </LivePreviewListener>
        </LocaleProvider>
      </body>
    </html>
  )
}
