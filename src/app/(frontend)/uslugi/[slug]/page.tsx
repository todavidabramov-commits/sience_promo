import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getService, getServiceOptions } from '@/cms/queries'
import { ServiceDetailLive } from '@/components/live/ServiceDetailLive'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).services
  const service = await getService(slug, locale)
  if (!service) return { title: t.fallback }
  return {
    title: service.title,
    description: service.lead,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).services
  const common = getMessages(locale).common
  const [service, serviceOptions] = await Promise.all([
    getService(slug, locale),
    getServiceOptions(locale),
  ])
  if (!service) notFound()

  return (
    <ServiceDetailLive service={service} serviceOptions={serviceOptions} t={t} common={common} />
  )
}
