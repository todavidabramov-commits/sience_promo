import type { GlobalConfig } from 'payload'

import { loc } from '../i18n/label'
import { globalPreview } from '../lib/preview'

export const Header: GlobalConfig = {
  slug: 'header',
  label: loc('Шапка', 'Header'),
  admin: {
    preview: globalPreview('header'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: loc('Навигация', 'Navigation'),
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: loc('Название', 'Label'),
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: loc('Ссылка', 'Link'),
        },
      ],
      defaultValue: [
        { label: 'Главная', href: '/' },
        { label: 'О компании', href: '/o-kompanii' },
        { label: 'Услуги', href: '/uslugi' },
        { label: 'Проекты', href: '/proekty' },
        { label: 'Эксперты', href: '/eksperty' },
        { label: 'Публикации', href: '/publikacii' },
        { label: 'Документы', href: '/dokumenty' },
        { label: 'Контакты', href: '/kontakty' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Запросить КП',
      label: loc('Текст кнопки', 'Button text'),
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/kontakty?type=proposal',
      label: loc('Ссылка кнопки', 'Button link'),
    },
  ],
}
