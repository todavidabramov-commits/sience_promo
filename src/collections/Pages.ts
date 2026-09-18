import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { loc } from '../i18n/label'
import { collectionPreview } from '../lib/preview'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: loc('Страница', 'Page'),
    plural: loc('Страницы', 'Pages'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: collectionPreview('pages'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: loc('Заголовок', 'Title'),
    },
    slugField(),
    {
      name: 'hero',
      type: 'group',
      label: loc('Первый экран', 'Hero'),
      fields: [
        {
          name: 'headline',
          type: 'text',
          localized: true,
          label: loc('Заголовок секции', 'Section headline'),
        },
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          label: loc('Подзаголовок', 'Subheadline'),
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: loc('Контент', 'Content'),
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: loc('Связанные услуги', 'Related services'),
    },
    seoFields,
  ],
}
