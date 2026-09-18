import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { loc } from '../i18n/label'
import { collectionPreview } from '../lib/preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: loc('Услуга', 'Service'),
    plural: loc('Услуги', 'Services'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: collectionPreview('services'),
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
      label: loc('Название', 'Title'),
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: loc('Краткое описание', 'Summary'),
    },
    {
      name: 'lead',
      type: 'textarea',
      localized: true,
      label: loc('Лид на странице', 'Page lead'),
    },
    {
      name: 'category',
      type: 'select',
      label: loc('Направление', 'Practice area'),
      admin: { position: 'sidebar' },
      options: [
        { label: loc('Оценка риска здоровью', 'Health risk assessment'), value: 'health-risk' },
        { label: loc('Санитарно-защитные зоны', 'Sanitary protection zones'), value: 'sanitary-zones' },
        { label: loc('Санэпидэкспертиза', 'Sanitary-epidemiological review'), value: 'sanitary-expertise' },
        { label: loc('Экологическое проектирование', 'Environmental design'), value: 'eco-design' },
        { label: loc('Атмосферный воздух', 'Ambient air'), value: 'air' },
        { label: loc('Шум', 'Noise'), value: 'noise' },
        { label: loc('Приаэродромные территории', 'Aerodrome vicinity territories'), value: 'airport' },
        { label: loc('Токсикология', 'Toxicology'), value: 'toxicology' },
        { label: loc('НИР и экспертиза', 'Research and review'), value: 'research' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      label: loc('Иконка', 'Icon'),
      defaultValue: 'shield-alert',
      options: [
        { label: loc('Риск', 'Risk'), value: 'risk' },
        { label: loc('Зона', 'Zone'), value: 'zone' },
        { label: loc('Экспертиза', 'Review'), value: 'expertise' },
        { label: loc('Воздух', 'Air'), value: 'air' },
        { label: loc('Шум', 'Noise'), value: 'noise' },
        { label: loc('Исследование', 'Research'), value: 'research' },
        { label: loc('Щит', 'Shield'), value: 'shield-alert' },
        { label: loc('Карта', 'Map'), value: 'map-pin' },
        { label: loc('Награда', 'Award'), value: 'award' },
        { label: loc('Экология', 'Environment'), value: 'activity' },
        { label: loc('Ветер', 'Wind'), value: 'wind' },
        { label: loc('Громкость', 'Volume'), value: 'volume' },
        { label: loc('Авиация', 'Aviation'), value: 'plane' },
        { label: loc('Лаборатория', 'Laboratory'), value: 'microscope' },
        { label: loc('Документ', 'Document'), value: 'file-text' },
      ],
    },
    {
      name: 'overview',
      type: 'array',
      localized: true,
      label: loc('О направлении', 'About the practice'),
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: loc('Абзац', 'Paragraph'),
        },
      ],
    },
    {
      name: 'scope',
      type: 'array',
      localized: true,
      label: loc('Состав работ', 'Scope of work'),
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: loc('Пункт', 'Item'),
        },
      ],
    },
    {
      name: 'stages',
      type: 'array',
      localized: true,
      label: loc('Этапы', 'Stages'),
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: loc('Название этапа', 'Stage title'),
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: loc('Описание', 'Description'),
        },
      ],
    },
    {
      name: 'audience',
      type: 'textarea',
      localized: true,
      label: loc('Для кого', 'Audience'),
    },
    {
      name: 'result',
      type: 'textarea',
      localized: true,
      label: loc('Ожидаемый результат', 'Expected result'),
    },
    {
      name: 'deliverables',
      type: 'array',
      label: loc('Результаты работ', 'Deliverables'),
      admin: { hidden: true },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: loc('Пункт', 'Item'),
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: loc('Порядок', 'Order'),
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
