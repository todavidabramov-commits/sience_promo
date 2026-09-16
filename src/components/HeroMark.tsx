'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroMolecule = dynamic(
  () => import('@/components/HeroMolecule').then((m) => m.HeroMolecule),
  {
    ssr: false,
    loading: () => <div className="hero-mark hero-mark--3d hero-mark--loading" aria-hidden />,
  },
)

const DESKTOP_MQ = '(min-width: 981px)'
const REDUCE_MQ = '(prefers-reduced-motion: reduce)'

export function HeroMark() {
  const [show3d, setShow3d] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_MQ)
    const reduce = window.matchMedia(REDUCE_MQ)

    const sync = () => {
      setShow3d(desktop.matches && !reduce.matches)
    }

    sync()
    desktop.addEventListener('change', sync)
    reduce.addEventListener('change', sync)
    return () => {
      desktop.removeEventListener('change', sync)
      reduce.removeEventListener('change', sync)
    }
  }, [])

  if (!show3d) return null

  return <HeroMolecule />
}
