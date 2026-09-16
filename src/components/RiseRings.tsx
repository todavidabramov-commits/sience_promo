'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

export function RiseRings({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType
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
      { threshold: 0.35 },
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
