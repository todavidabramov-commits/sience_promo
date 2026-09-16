'use client'

import { useEffect, useRef, useState } from 'react'

function parseStatValue(value: string): { target: number; suffix: string; decimals: number } {
  const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/)
  if (!match) {
    return { target: 0, suffix: value, decimals: 0 }
  }

  const raw = match[1].replace(',', '.')
  const decimals = raw.includes('.') ? raw.split('.')[1].length : 0
  return {
    target: Number(raw),
    suffix: match[2] ?? '',
    decimals,
  }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function CountUp({
  value,
  duration = 1600,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const { target, suffix, decimals } = parseStatValue(value)
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finish = () => {
      setDisplay(target.toFixed(decimals))
    }

    if (reduce || target === 0) {
      finish()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const start = performance.now()

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const current = target * easeOutCubic(t)
          setDisplay(current.toFixed(decimals))
          if (t < 1) {
            requestAnimationFrame(tick)
          } else {
            finish()
          }
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals, duration])

  return (
    <strong ref={ref} className={className}>
      {display}
      {suffix}
    </strong>
  )
}
