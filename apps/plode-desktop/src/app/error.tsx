'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return <div>Error</div>
}
