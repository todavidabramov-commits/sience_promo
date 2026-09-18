import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { loc } from '../i18n/label'

export const Experts: CollectionConfig = {
  slug: 'experts',
  labels: {
    singular: loc('Эксперт', 'Expert'),
    plural: loc('Эксперты', 'Experts'),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: loc('ФИО', 'Full name'),
    },
    slugField('name'),
    {
      name: 'role',
      type: 'text',
      localized: true,
      label: loc('Должность (коротко)', 'Role (short)'),
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: loc('Должность на странице экспертов', 'Title on experts page'),
    },
    {
      name: 'credentials',
      type: 'textarea',
      localized: true,
      label: loc('Регалии', 'Credentials'),
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: loc('Биография', 'Biography'),
    },
    {
      name: 'competencies',
      type: 'array',
      label: loc('Компетенции (служебные)', 'Competencies (legacy)'),
      admin: { hidden: true },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: loc('Компетенция', 'Competency'),
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      localized: true,
      label: loc('Компетенции', 'Competencies'),
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: loc('Тег', 'Tag'),
        },
      ],
    },
    {
      name: 'image',
      type: 'text',
      label: loc('Путь к фото', 'Photo path'),
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: loc('Фото', 'Photo'),
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: loc('На главной', 'Show on home'),
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      label: loc('Порядок', 'Order'),
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
