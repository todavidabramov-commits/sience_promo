import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
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
      name: 'category',
      type: 'select',
      label: 'Направление',
      options: [
        { label: 'Оценка риска здоровью', value: 'health-risk' },
        { label: 'Санитарно-защитные зоны', value: 'sanitary-zones' },
        { label: 'Санэпидэкспертиза', value: 'sanitary-expertise' },
        { label: 'Экологическое проектирование', value: 'eco-design' },
        { label: 'Атмосферный воздух', value: 'air' },
        { label: 'Шум', value: 'noise' },
        { label: 'Приаэродромные территории', value: 'airport' },
        { label: 'Токсикология', value: 'toxicology' },
        { label: 'НИР и экспертиза', value: 'research' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Краткое описание',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Иконка',
      defaultValue: 'risk',
      options: [
        { label: 'Риск', value: 'risk' },
        { label: 'Зона', value: 'zone' },
        { label: 'Экспертиза', value: 'expertise' },
        { label: 'Воздух', value: 'air' },
        { label: 'Шум', value: 'noise' },
        { label: 'Исследование', value: 'research' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Подробное описание',
    },
    {
      name: 'deliverables',
      type: 'array',
      label: 'Результаты работ',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Пункт',
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
    seoFields,
  ],
}
