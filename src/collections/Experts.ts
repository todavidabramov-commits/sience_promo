import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'

export const Experts: CollectionConfig = {
  slug: 'experts',
  labels: {
    singular: 'Эксперт',
    plural: 'Эксперты',
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
      label: 'ФИО',
    },
    slugField('name'),
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Должность',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Биография',
    },
    {
      name: 'competencies',
      type: 'array',
      label: 'Компетенции',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Компетенция',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
