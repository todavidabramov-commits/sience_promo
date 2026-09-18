import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Experts } from './collections/Experts'
import { Publications } from './collections/Publications'
import { Documents } from './collections/Documents'
import { Pages } from './collections/Pages'
import { FormSubmissions } from './collections/FormSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — СанЭпидЭксперт / SanEpidExpert',
    },
  },
  i18n: {
    fallbackLanguage: 'ru',
    supportedLanguages: { ru, en },
  },
  localization: {
    defaultLocale: 'ru',
    fallback: true,
    locales: [
      { code: 'ru', label: 'Русский' },
      { code: 'en', label: 'English' },
    ],
  },
  collections: [
    Users,
    Media,
    Services,
    Projects,
    Experts,
    Publications,
    Documents,
    Pages,
    FormSubmissions,
  ],
  globals: [SiteSettings, Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
})
