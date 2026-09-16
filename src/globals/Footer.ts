import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Подвал',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Колонки',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Заголовок колонки',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Ссылки',
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Название' },
            { name: 'href', type: 'text', required: true, label: 'Ссылка' },
          ],
        },
      ],
    },
    {
      name: 'legal',
      type: 'textarea',
      label: 'Юридическая информация',
    },
  ],
}
