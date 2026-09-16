import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Публикация',
    plural: 'Публикации',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Анонс',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Наука', value: 'science' },
        { label: 'Методология', value: 'methodology' },
        { label: 'Регуляторика', value: 'regulation' },
        { label: 'Кейсы', value: 'cases' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Дата публикации',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        position: 'sidebar',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'experts',
      hasMany: true,
      label: 'Авторы',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Текст',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Избранная',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
