import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPublication } from '@/cms/queries'
import { PublicationDetailLive } from '@/components/live/PublicationDetailLive'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).pubs
  const pub = await getPublication(slug, locale)
  if (!pub) return { title: t.fallback }
  return { title: pub.title, description: pub.excerpt }
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).pubs
  const common = getMessages(locale).common
  const pub = await getPublication(slug, locale)
  if (!pub) notFound()

  return <PublicationDetailLive publication={pub} t={t} common={common} />
}
