import type { CollectionConfig } from 'payload'

import { loc } from '../i18n/label'
import { collectionPreview } from '../lib/preview'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: loc('Документ', 'Document'),
    plural: loc('Документы', 'Documents'),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['code', 'title', 'section', 'updatedAt'],
    preview: collectionPreview('documents'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: loc('Номер / шифр', 'Number / code'),
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: loc('Название', 'Title'),
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: loc('Описание', 'Description'),
    },
    {
      name: 'category',
      type: 'select',
      label: loc('Категория (служебная)', 'Category (internal)'),
      admin: { position: 'sidebar' },
      options: [
        { label: loc('Лицензии', 'Licences'), value: 'licenses' },
        { label: loc('Сертификаты', 'Certificates'), value: 'certificates' },
        { label: loc('Методики', 'Methods'), value: 'methods' },
        { label: loc('Регламенты', 'Regulations'), value: 'regulations' },
        { label: loc('Прочее', 'Other'), value: 'other' },
      ],
    },
    {
      name: 'section',
      type: 'select',
      label: loc('Раздел', 'Section'),
      options: [
        { label: loc('Федеральные законы', 'Federal laws'), value: 'federal' },
        { label: loc('СанПиН и СП', 'SanPiN and codes of practice'), value: 'sanpin' },
        { label: loc('Методические указания', 'Methodological instructions'), value: 'methods' },
        { label: loc('Аттестаты аккредитации', 'Accreditation certificates'), value: 'accreditation' },
      ],
    },
    {
      name: 'fileLabel',
      type: 'text',
      localized: true,
      label: loc('Подпись файла', 'File label'),
      admin: {
        description: loc('Например: PDF, 1.2 MB', 'For example: PDF, 1.2 MB'),
      },
    },
    {
      name: 'homeMeta',
      type: 'text',
      localized: true,
      label: loc('Мета на главной', 'Home meta'),
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: loc('Файл', 'File'),
    },
    {
      name: 'showInCatalog',
      type: 'checkbox',
      label: loc('В реестре документов', 'Show in register'),
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
      name: 'order',
      type: 'number',
      label: loc('Порядок', 'Order'),
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
