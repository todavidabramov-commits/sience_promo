import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Проект',
    plural: 'Проекты',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'clientType', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название',
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Краткое описание',
    },
    {
      name: 'clientType',
      type: 'select',
      label: 'Тип заказчика',
      options: [
        { label: 'Промышленность', value: 'industry' },
        { label: 'Нефтегаз', value: 'oilgas' },
        { label: 'Аэропорт', value: 'airport' },
        { label: 'Девелопмент', value: 'development' },
        { label: 'Инфраструктура', value: 'infra' },
        { label: 'Проектирование', value: 'design' },
      ],
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Услуги',
    },
    {
      name: 'year',
      type: 'number',
      label: 'Год',
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Описание кейса',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'На главной',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
