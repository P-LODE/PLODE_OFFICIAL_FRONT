'use client'
import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

interface ResponsiveState {
  isMobile: boolean
  isDesktop: boolean
}

// 미디어 쿼리 판단 함수
const getResponsiveState = (): ResponsiveState => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isDesktop: true,
    }
  }

  const mobile = window.matchMedia('(max-width: 1023px)')
  const desktop = window.matchMedia('(min-width: 1024px)')

  return {
    isMobile: mobile.matches,
    isDesktop: desktop.matches,
  }
}

export const useResponsive = (): ResponsiveState => {
  const [responsiveState, setResponsiveState] =
    useState<ResponsiveState>(getResponsiveState())

  const updateResponsiveState = useCallback(() => {
    const newState = getResponsiveState()
    setResponsiveState((prevState) => {
      if (
        prevState.isMobile === newState.isMobile &&
        prevState.isDesktop === newState.isDesktop
      ) {
        return prevState
      }
      return newState
    })
  }, [])

  const debouncedHandleResize = useCallback(
    debounce(updateResponsiveState, 100),
    [updateResponsiveState],
  )

  useEffect(() => {
    updateResponsiveState()

    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [debouncedHandleResize, updateResponsiveState])

  return responsiveState
}
