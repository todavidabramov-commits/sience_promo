import type { CollectionConfig } from 'payload'

import { seoFields } from '../fields/seo'
import { slugField } from '../fields/slug'
import { loc } from '../i18n/label'
import { collectionPreview } from '../lib/preview'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: loc('Проект', 'Project'),
    plural: loc('Проекты', 'Projects'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'updatedAt'],
    preview: collectionPreview('projects'),
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
      label: loc('Название в карточке', 'Card title'),
    },
    {
      name: 'headline',
      type: 'text',
      localized: true,
      label: loc('Заголовок на странице', 'Page headline'),
      admin: {
        description: 'Если пусто, на странице берётся название карточки. / If empty, the card title is used on the page.',
      },
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
      name: 'clientType',
      type: 'select',
      label: loc('Тип заказчика', 'Client type'),
      options: [
        { label: loc('Промышленность', 'Industry'), value: 'industry' },
        { label: loc('Нефтегаз', 'Oil and gas'), value: 'oilgas' },
        { label: loc('Аэропорт', 'Airport'), value: 'airport' },
        { label: loc('Девелопмент', 'Development'), value: 'development' },
        { label: loc('Инфраструктура', 'Infrastructure'), value: 'infra' },
        { label: loc('Проектирование', 'Design'), value: 'design' },
      ],
    },
    {
      name: 'clientLabel',
      type: 'text',
      localized: true,
      label: loc('Подпись заказчика на сайте', 'Client badge on the site'),
    },
    {
      name: 'sector',
      type: 'text',
      localized: true,
      label: loc('Отрасль', 'Sector'),
    },
    {
      name: 'section',
      type: 'select',
      label: loc('Фильтр каталога', 'Catalog filter'),
      options: [
        { label: loc('Авиация', 'Aviation'), value: 'aviation' },
        { label: loc('Нефтегаз', 'Oil and gas'), value: 'oilgas' },
        { label: loc('Градостроительство', 'Urban planning'), value: 'urban' },
      ],
    },
    {
      name: 'task',
      type: 'textarea',
      localized: true,
      label: loc('Задача', 'Task'),
    },
    {
      name: 'approach',
      type: 'textarea',
      localized: true,
      label: loc('Подход', 'Approach'),
    },
    {
      name: 'result',
      type: 'textarea',
      localized: true,
      label: loc('Результат', 'Result'),
    },
    {
      name: 'image',
      type: 'text',
      label: loc('Путь к изображению', 'Image path'),
      admin: {
        description: '/images/cases/case-1-hq.png',
      },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: loc('Обложка', 'Cover'),
    },
    {
      name: 'content',
      type: 'richText',
      label: loc('Описание кейса', 'Case description'),
      admin: { hidden: true },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: loc('На главной (старое поле)', 'Featured (legacy)'),
      defaultValue: false,
      admin: { hidden: true },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: loc('На главной', 'Show on home'),
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'year',
      type: 'number',
      label: loc('Год', 'Year'),
      admin: { position: 'sidebar' },
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
