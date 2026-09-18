import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { loc } from '../i18n/label'
import { collectionPreview } from '../lib/preview'

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: loc('Публикация', 'Publication'),
    plural: loc('Публикации', 'Publications'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'featured', 'updatedAt'],
    preview: collectionPreview('publications'),
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      label: loc('Анонс', 'Excerpt'),
    },
    {
      name: 'category',
      type: 'select',
      label: loc('Категория (служебная)', 'Category (internal)'),
      admin: { position: 'sidebar' },
      options: [
        { label: loc('Наука', 'Science'), value: 'science' },
        { label: loc('Методология', 'Methodology'), value: 'methodology' },
        { label: loc('Регуляторика', 'Regulation'), value: 'regulation' },
        { label: loc('Кейсы', 'Cases'), value: 'cases' },
      ],
    },
    {
      name: 'categoryLabel',
      type: 'text',
      localized: true,
      label: loc('Категория на сайте', 'Category on the site'),
    },
    {
      name: 'dateLabel',
      type: 'text',
      localized: true,
      label: loc('Дата текстом', 'Date label'),
    },
    {
      name: 'readTime',
      type: 'text',
      localized: true,
      label: loc('Время чтения', 'Reading time'),
    },
    {
      name: 'section',
      type: 'select',
      label: loc('Раздел фильтра', 'Filter section'),
      options: [
        { label: loc('Научные статьи', 'Scientific papers'), value: 'science' },
        { label: loc('Исследования рисков', 'Risk research'), value: 'risks' },
        { label: loc('Аналитика застройки', 'Development analytics'), value: 'urban' },
        { label: loc('Охрана атмосферного воздуха', 'Ambient air protection'), value: 'air' },
      ],
    },
    {
      name: 'image',
      type: 'text',
      label: loc('Путь к обложке', 'Cover path'),
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: loc('Обложка', 'Cover'),
    },
    {
      name: 'body',
      type: 'array',
      localized: true,
      label: loc('Текст статьи', 'Article body'),
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          defaultValue: 'p',
          label: loc('Тип блока', 'Block type'),
          options: [
            { label: loc('Абзац', 'Paragraph'), value: 'p' },
            { label: loc('Подзаголовок', 'Heading'), value: 'h2' },
            { label: loc('Список', 'List'), value: 'ul' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          label: loc('Текст', 'Text'),
          admin: {
            condition: (_, siblingData) => siblingData?.blockType !== 'ul',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: loc('Пункты списка', 'List items'),
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'ul',
          },
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
              label: loc('Пункт', 'Item'),
            },
          ],
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: loc('Текст (служебное)', 'Body (legacy)'),
      admin: { hidden: true },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: loc('Выделенный материал', 'Featured'),
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showInCatalog',
      type: 'checkbox',
      label: loc('В каталоге публикаций', 'Show in catalog'),
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: loc('На главной', 'Show on home'),
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: loc('Дата публикации', 'Publication date'),
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        position: 'sidebar',
      },
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
