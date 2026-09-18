import type { GlobalConfig } from 'payload'

import { loc } from '../i18n/label'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: loc('Настройки сайта', 'Site settings'),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'САНЭПИДЭКСПЕРТ',
      label: loc('Название компании', 'Company name'),
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: 'Экспертный центр',
      label: loc('Слоган', 'Tagline'),
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+7 (495) 120-44-88',
      label: loc('Телефон', 'Phone'),
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@sanepidexpert.ru',
      label: loc('Email', 'Email'),
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      label: loc('Адрес', 'Address'),
    },
    {
      name: 'officeTitle',
      type: 'text',
      localized: true,
      label: loc('Название офиса', 'Office title'),
    },
    {
      name: 'hours',
      type: 'text',
      localized: true,
      label: loc('Часы работы', 'Opening hours'),
    },
    {
      name: 'officeNote',
      type: 'textarea',
      localized: true,
      label: loc('Примечание об офисе', 'Office note'),
    },
    {
      name: 'lat',
      type: 'number',
      defaultValue: 55.7233,
      label: loc('Широта', 'Latitude'),
    },
    {
      name: 'lon',
      type: 'number',
      defaultValue: 37.5985,
      label: loc('Долгота', 'Longitude'),
    },
    {
      name: 'channels',
      type: 'array',
      label: loc('Контактные каналы', 'Contact channels'),
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: loc('Название', 'Title'),
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: loc('Телефон', 'Phone'),
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: loc('Email', 'Email'),
        },
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          label: loc('Описание', 'Description'),
        },
      ],
    },
    {
      name: 'contactDocs',
      type: 'array',
      localized: true,
      label: loc('Документы для расчёта', 'Documents for an estimate'),
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: loc('Пункт', 'Item'),
        },
      ],
    },
    {
      name: 'requisites',
      type: 'array',
      label: loc('Реквизиты', 'Requisites'),
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: loc('Подпись', 'Label'),
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          label: loc('Значение', 'Value'),
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: loc('Аналитика', 'Analytics'),
      fields: [
        {
          name: 'ymId',
          type: 'text',
          label: loc('Яндекс.Метрика ID', 'Yandex.Metrica ID'),
        },
        {
          name: 'gaId',
          type: 'text',
          label: loc('Google Analytics ID', 'Google Analytics ID'),
        },
      ],
    },
  ],
}
