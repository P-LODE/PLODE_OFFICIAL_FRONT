import { NextRequest, NextResponse } from 'next/server'

//TODO: Implement middleware

export const config = {
  matcher: ['/((?!.*\\..*|_next|favicon.ico|assets).*)'],
}
