import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'meta',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Мета-заголовок',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Мета-описание',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение для соцсетей',
    },
  ],
}
