'use client'

import type { ContactsView } from '@/cms/types'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { useLiveContacts } from '@/components/LivePreviewListener'
import type { Messages } from '@/i18n/messages'
import type { ReactNode } from 'react'

export function SiteChrome({
  contacts,
  messages,
  children,
}: {
  contacts: ContactsView
  messages: Messages
  children: ReactNode
}) {
  const live = useLiveContacts(contacts)

  return (
    <>
      <SiteHeader
        companyName={live.companyName}
        tagline={live.tagline}
        phone={live.phone}
        email={live.email}
        address={live.address}
        nav={live.nav}
        ctaLabel={live.ctaLabel}
        ctaHref={live.ctaHref}
      />
      <main>{children}</main>
      <SiteFooter
        companyName={live.companyName}
        phone={live.phone}
        email={live.email}
        address={live.address}
        legal={live.legal}
        messages={messages}
      />
    </>
  )
}
