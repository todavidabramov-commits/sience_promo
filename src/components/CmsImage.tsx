'use client'

import Image, { type ImageProps } from 'next/image'

import { isCmsMedia } from '@/cms/utils'

type Props = Omit<ImageProps, 'src'> & { src: string }

export function CmsImage({ src, ...props }: Props) {
  return <Image {...props} key={src} src={src} unoptimized={isCmsMedia(src)} />
}
