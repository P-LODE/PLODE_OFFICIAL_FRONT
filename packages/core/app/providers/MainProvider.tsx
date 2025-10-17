'use client'

import * as React from 'react'
import { QueryProvider } from './QueryProvider'
import { ErrorBoundaryProvider } from './ErrorBoundaryProvider'
import { ThemeProvider } from './ThemeProvider'
// import { LayoutProvider } from './LayoutProvider'

export function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ErrorBoundaryProvider
          fallbackComponent={<div>Error</div>}
          suspenseFallback={<></>}
        >
          {children}
        </ErrorBoundaryProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
