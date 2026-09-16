import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['type', 'name', 'email', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Тип заявки',
      options: [
        { label: 'Обратная связь', value: 'contact' },
        { label: 'Коммерческое предложение', value: 'proposal' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Имя',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Электронная почта',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Компания',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Услуга',
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      label: 'Вложение',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Статус',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Закрыта', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
