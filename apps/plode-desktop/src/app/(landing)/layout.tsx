import React from 'react'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 flex-shrink-0">Header</div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
