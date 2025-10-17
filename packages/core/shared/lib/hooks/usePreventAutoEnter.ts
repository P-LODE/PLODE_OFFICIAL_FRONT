'use client'
import { useEffect, useRef, useState } from 'react'

export function usePreventAutoEnter(delay = 3000) {
  const [wasUserTyping, setWasUserTyping] = useState(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  const markUserTyping = () => {
    setWasUserTyping(true)
    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      setWasUserTyping(false)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current)
    }
  }, [])

  return {
    wasUserTyping,
    markUserTyping,
  }
}
