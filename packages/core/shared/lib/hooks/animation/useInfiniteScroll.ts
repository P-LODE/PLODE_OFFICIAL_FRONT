'use client'

import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
  rootMargin?: string
  threshold?: number
}

export function useInfiniteScroll({
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  rootMargin = '100px',
  threshold = 0,
}: UseInfiniteScrollOptions) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      if (
        entry?.isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage
      ) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  )

  useEffect(() => {
    if (!loadMoreRef.current || !fetchNextPage) return

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin,
      threshold,
    })

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [handleIntersect, rootMargin, threshold])

  return { loadMoreRef }
}
