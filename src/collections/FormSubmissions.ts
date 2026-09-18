import type { CollectionConfig } from 'payload'

import { loc } from '../i18n/label'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: loc('Заявка', 'Enquiry'),
    plural: loc('Заявки', 'Enquiries'),
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
      label: loc('Тип заявки', 'Enquiry type'),
      options: [
        { label: loc('Обратная связь', 'Contact'), value: 'contact' },
        { label: loc('Коммерческое предложение', 'Proposal'), value: 'proposal' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: loc('Имя', 'Name'),
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: loc('Электронная почта', 'Email'),
    },
    {
      name: 'phone',
      type: 'text',
      label: loc('Телефон', 'Phone'),
    },
    {
      name: 'company',
      type: 'text',
      label: loc('Компания', 'Company'),
    },
    {
      name: 'message',
      type: 'textarea',
      label: loc('Сообщение', 'Message'),
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: loc('Услуга', 'Service'),
    },
    {
      name: 'attachment',
      type: 'upload',
      relationTo: 'media',
      label: loc('Вложение', 'Attachment'),
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: loc('Статус', 'Status'),
      options: [
        { label: loc('Новая', 'New'), value: 'new' },
        { label: loc('В работе', 'In progress'), value: 'in_progress' },
        { label: loc('Закрыта', 'Closed'), value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
