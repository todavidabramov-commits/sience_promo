import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Документ',
    plural: 'Документы',
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
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Лицензии', value: 'licenses' },
        { label: 'Сертификаты', value: 'certificates' },
        { label: 'Методики', value: 'methods' },
        { label: 'Регламенты', value: 'regulations' },
        { label: 'Прочее', value: 'other' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Файл',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        position: 'sidebar',
      },
    },
  ],
}
