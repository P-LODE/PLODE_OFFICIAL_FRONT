'use client'

import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  className?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const currentElement = ref.current
    if (!currentElement) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)

          if (once && observerRef.current) {
            observerRef.current.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observerRef.current.observe(currentElement)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, once])

  const getTransform = (): string => {
    if (isVisible) return 'translate3d(0, 0, 0)'

    switch (direction) {
      case 'up':
        return 'translate3d(0, 40px, 0)'
      case 'down':
        return 'translate3d(0, -40px, 0)'
      case 'left':
        return 'translate3d(40px, 0, 0)'
      case 'right':
        return 'translate3d(-40px, 0, 0)'
      case 'fade':
        return 'translate3d(0, 0, 0)'
      default:
        return 'translate3d(0, 40px, 0)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden={!isVisible}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
