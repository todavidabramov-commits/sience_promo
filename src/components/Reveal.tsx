'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Softer rise for dense grids */
  compact?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children' | 'initial' | 'whileInView' | 'animate'>

export function Reveal({ children, className, delay = 0, compact = false, ...rest }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: compact ? 18 : 32,
        filter: 'blur(10px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
      transition={{ duration: compact ? 0.55 : 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type RevealStaggerProps = {
  children: ReactNode
  className?: string
  /** Stagger between children (seconds) */
  stagger?: number
  delay?: number
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: RevealStaggerProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
}

export function RevealItem({ children, className }: RevealItemProps) {
  const reduce = useReducedMotion()
  const merged = ['reveal-item', className].filter(Boolean).join(' ')

  if (reduce) {
    return <div className={merged}>{children}</div>
  }

  return (
    <motion.div
      className={merged}
      variants={{
        hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/** First-viewport entrance (hero), not scroll-triggered */
export function RevealHero({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
