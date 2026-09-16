import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'САНЭПИДЭКСПЕРТ',
      label: 'Название компании',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Экспертный центр',
      label: 'Слоган',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+7 (495) 120-44-88',
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@sanepidexpert.ru',
      label: 'Email',
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue:
        '119049, г. Москва, Ленинский проспект, д. 8, стр. 16, Научно-исследовательский кластер',
      label: 'Адрес',
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Аналитика',
      fields: [
        {
          name: 'ymId',
          type: 'text',
          label: 'Яндекс.Метрика ID',
        },
        {
          name: 'gaId',
          type: 'text',
          label: 'Google Analytics ID',
        },
      ],
    },
  ],
}
