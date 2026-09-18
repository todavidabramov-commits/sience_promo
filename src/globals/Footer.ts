import type { GlobalConfig } from 'payload'

import { loc } from '../i18n/label'
import { globalPreview } from '../lib/preview'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: loc('Подвал', 'Footer'),
  admin: {
    preview: globalPreview('footer'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: loc('Колонки', 'Columns'),
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: loc('Заголовок колонки', 'Column title'),
        },
        {
          name: 'links',
          type: 'array',
          label: loc('Ссылки', 'Links'),
          fields: [
            { name: 'label', type: 'text', required: true, localized: true, label: loc('Название', 'Label') },
            { name: 'href', type: 'text', required: true, label: loc('Ссылка', 'Link') },
          ],
        },
      ],
    },
    {
      name: 'legal',
      type: 'textarea',
      localized: true,
      label: loc('Юридическая информация', 'Legal information'),
    },
  ],
}
