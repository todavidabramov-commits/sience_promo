import type { Locale } from './config'
import { getMessages } from './messages'
import { getCatalog } from './catalog'

export async function getI18n() {
  const { getLocale } = await import('./get-locale')
  const locale = await getLocale()
  return {
    locale,
    messages: getMessages(locale),
    catalog: getCatalog(locale),
  }
}

export type { Locale }
export { getMessages, getCatalog }
