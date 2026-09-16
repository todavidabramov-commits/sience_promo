'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type RiseTag = 'div' | 'section' | 'article'

export function RiseRings({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: RiseTag
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0, rootMargin: '0px 0px 15% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      className={`${className ?? ''} is-rise-rings${inView ? ' is-inview' : ''}`.trim()}
      ref={ref as never}
    >
      <span className="rise-ring" aria-hidden />
      <span className="rise-ring" aria-hidden />
      <span className="rise-ring" aria-hidden />
      <span className="rise-ring" aria-hidden />
      {children}
    </Tag>
  )
}
