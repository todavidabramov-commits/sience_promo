import { cookies, headers } from 'next/headers'

import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, type Locale } from './config'
import { detectLocale } from './detect'

export async function getLocale(): Promise<Locale> {
  const jar = await cookies()
  const fromCookie = jar.get(LOCALE_COOKIE)?.value
  if (isLocale(fromCookie)) return fromCookie

  const header = (await headers()).get('accept-language')
  return detectLocale(header) || DEFAULT_LOCALE
}
