import type { Metadata } from 'next'
import React from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { ScrollToTop } from '@/components/ScrollToTop'
import { getPayloadClient } from '@/lib/payload'

import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'САНЭПИДЭКСПЕРТ — экспертный центр',
    template: '%s | САНЭПИДЭКСПЕРТ',
  },
  description:
    'Экспертно-консалтинговая компания в области санитарно-эпидемиологической безопасности, экологии и оценки риска здоровью населения.',
}

export const viewport = {
  themeColor: '#0f172a',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()

  const [settings, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'header' }).catch(() => null),
    payload.findGlobal({ slug: 'footer' }).catch(() => null),
  ])

  const companyName = settings?.companyName || 'САНЭПИДЭКСПЕРТ'

  return (
    <html lang="ru">
      <body>
        <ScrollToTop />
        <SiteHeader
          companyName={companyName}
          tagline={settings?.tagline || 'Экспертный центр'}
          phone={settings?.phone || '+7 (495) 120-44-88'}
          email={settings?.email || 'info@sanepidexpert.ru'}
          address={
            settings?.address ||
            '119049, г. Москва, Ленинский проспект, д. 8, стр. 16, Научно-исследовательский кластер'
          }
          nav={header?.nav?.map((item) => ({ label: item.label, href: item.href }))}
          ctaLabel={header?.ctaLabel}
          ctaHref={header?.ctaHref}
        />
        <main>{children}</main>
        <SiteFooter
          companyName={companyName}
          phone={settings?.phone || '+7 (495) 120-44-88'}
          email={settings?.email}
          address={settings?.address}
          legal={footer?.legal}
        />
      </body>
    </html>
  )
}
