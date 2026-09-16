import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    slugField(),
    {
      name: 'hero',
      type: 'group',
      label: 'Первый экран',
      fields: [
        {
          name: 'headline',
          type: 'text',
          label: 'Заголовок секции',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Подзаголовок',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент',
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Связанные услуги',
    },
    seoFields,
  ],
}
