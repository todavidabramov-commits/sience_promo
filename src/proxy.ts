import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isLocale, LOCALE_COOKIE, LOCALE_MAX_AGE } from './i18n/config'
import { detectLocale } from './i18n/detect'

export function proxy(request: NextRequest) {
  const current = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(current)) return NextResponse.next()

  const locale = detectLocale(request.headers.get('accept-language'))
  const response = NextResponse.next()
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_MAX_AGE,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|api/media).*)'],
}
