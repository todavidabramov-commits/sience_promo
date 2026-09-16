'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'

export function ScrollToTop() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const html = document.documentElement
    const previous = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.scrollTop = 0
    document.body.scrollTop = 0
    html.style.scrollBehavior = previous
  }, [pathname])

  return null
}
