'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

export function CatalogSectionMark({
  icon,
  exact = false,
  origin = 'corner',
}: {
  icon?: string
  exact?: boolean
  origin?: 'corner' | 'bottom'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`catalog-section__mark${origin === 'bottom' ? ' catalog-section__mark--bottom' : ''}${inView ? ' is-inview' : ''}`}
      ref={ref}
      aria-hidden
      style={icon && !exact ? ({ '--catalog-icon': `url("${icon}")` } as CSSProperties) : undefined}
    >
      <span className="catalog-section__ring" />
      <span className="catalog-section__ring" />
      <span className="catalog-section__ring" />
      <span className="catalog-section__ring" />
      {exact && icon ? (
        <Image className="catalog-section__logo" src={icon} alt="" width={300} height={300} />
      ) : icon ? (
        <span className="catalog-section__icon" />
      ) : null}
    </div>
  )
}
