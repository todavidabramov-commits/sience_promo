import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nav',
      type: 'array',
      label: 'Навигация',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Название',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Ссылка',
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
      defaultValue: 'Запросить КП',
      label: 'Текст кнопки',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/kontakty?type=proposal',
      label: 'Ссылка кнопки',
    },
  ],
}
