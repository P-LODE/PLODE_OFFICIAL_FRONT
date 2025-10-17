'use client'

import { useEffect } from 'react'

export function useAutoScroll<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  deps: unknown[],
) {
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, deps)
}
