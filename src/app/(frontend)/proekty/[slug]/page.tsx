import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProject } from '@/cms/queries'
import { ProjectDetailLive } from '@/components/live/ProjectDetailLive'
import { getLocale } from '@/i18n/get-locale'
import { getMessages } from '@/i18n/messages'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).projects
  const project = await getProject(slug, locale)
  if (!project) return { title: t.fallback }
  return { title: project.headline || project.title, description: project.summary || project.task }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const t = getMessages(locale).projects
  const common = getMessages(locale).common
  const project = await getProject(slug, locale)
  if (!project) notFound()

  return <ProjectDetailLive project={project} t={t} common={common} />
}
