import { ReactNode, Suspense, ComponentType } from 'react'
import { ErrorBoundary, ErrorPageProps } from '@plode-front/core/shared/lib'

interface ErrorBoundaryProviderProps {
  children: any
  fallbackComponent: ComponentType<ErrorPageProps> | any
  suspenseFallback: ReactNode
}

export function ErrorBoundaryProvider({
  children,
  fallbackComponent,
  suspenseFallback,
}: ErrorBoundaryProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={fallbackComponent} onReset={() => {}}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
}
