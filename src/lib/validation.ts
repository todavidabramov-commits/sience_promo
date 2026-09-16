import * as yup from 'yup'

export type LeadFormType = 'contact' | 'proposal' | 'document'

export type LeadFormValues = {
  name: string
  company: string
  email: string
  phone: string
  message: string
  serviceId: string
  attachment: File | null
}

export const PHONE_MASK = '+{7} (000) 000-00-00'
export const NAME_MASK = /^[A-Za-zА-Яа-яЁё\s\-']*$/

export function phoneDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function isCompleteRuPhone(value: string) {
  const digits = phoneDigits(value)
  return digits.length === 11 && digits.startsWith('7')
}

const emailSchema = yup.string().trim().required('Укажите e-mail').email('Некорректный e-mail')

const phoneSchema = yup
  .string()
  .trim()
  .required('Укажите телефон')
  .test('ru-phone', 'Неполный номер', (value) => isCompleteRuPhone(value || ''))

const nameSchema = yup
  .string()
  .trim()
  .required('Укажите имя')
  .min(2, 'Слишком коротко')
  .max(80, 'Слишком длинно')
  .matches(NAME_MASK, 'Только буквы')

const companySchema = yup
  .string()
  .trim()
  .required('Укажите организацию')
  .min(2, 'Слишком коротко')
  .max(160, 'Слишком длинно')

const messageSchema = yup
  .string()
  .trim()
  .required('Заполните поле')
  .min(8, 'Слишком коротко')
  .max(2000, 'Слишком длинно')

const ALLOWED_FILE = /\.(pdf|doc|docx|xls|xlsx|png|jpe?g|dwg)$/i

function asFile(value: unknown): File | null {
  if (!value) return null
  if (typeof File !== 'undefined' && value instanceof File) {
    return value.size > 0 ? value : null
  }
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    const file = value.item(0)
    return file && file.size > 0 ? file : null
  }
  return null
}

export function fileSchema(maxMb: number) {
  return yup
    .mixed<File | null>()
    .nullable()
    .transform((value) => asFile(value))
    .test('size', `Файл больше ${maxMb} МБ`, (file) => {
      if (!file) return true
      return file.size <= maxMb * 1024 * 1024
    })
    .test('type', 'Недопустимый формат', (file) => {
      if (!file) return true
      return ALLOWED_FILE.test(file.name)
    })
}

export function leadSchema(type: LeadFormType, maxFileMb = 50) {
  return yup.object({
    name: type === 'contact' ? nameSchema : yup.string().default(''),
    company: type === 'proposal' ? companySchema : yup.string().default(''),
    email: emailSchema,
    phone: phoneSchema,
    message: type === 'proposal' ? yup.string().default('') : messageSchema,
    serviceId: yup.string().default(''),
    attachment: type === 'document' ? yup.mixed<File | null>().nullable() : fileSchema(maxFileMb),
  })
}

export const digestSchema = yup.object({
  email: emailSchema,
})

export type DigestFormValues = yup.InferType<typeof digestSchema>

export type LeadFieldErrors = Partial<Record<keyof LeadFormValues | 'form', string>>

type ResolverResult = {
  values: LeadFormValues | Record<string, never>
  errors: Record<string, { type: string; message: string }>
}

export function resolveYup<T extends Record<string, unknown>>(
  schema: yup.AnyObjectSchema,
  values: T,
): Promise<ResolverResult> {
  return schema
    .validate(values, { abortEarly: false })
    .then((data) => ({ values: data as LeadFormValues, errors: {} }))
    .catch((error: unknown) => {
      if (!(error instanceof yup.ValidationError)) {
        return { values: {}, errors: { root: { type: 'validate', message: 'Проверьте поля' } } }
      }
      const errors: Record<string, { type: string; message: string }> = {}
      for (const item of error.inner.length ? error.inner : [error]) {
        const path = item.path || 'root'
        if (!errors[path]) {
          errors[path] = { type: item.type || 'validate', message: item.message }
        }
      }
      return { values: {}, errors }
    })
}

export async function validateLeadFields(
  type: LeadFormType,
  values: Record<string, string>,
): Promise<{ ok: true } | { ok: false; errors: LeadFieldErrors }> {
  try {
    await leadSchema(type).validate(
      {
        name: values.name || '',
        company: values.company || '',
        email: values.email || '',
        phone: values.phone || '',
        message: values.message || '',
        serviceId: values.serviceId || '',
        attachment: null,
      },
      { abortEarly: false },
    )
    return { ok: true }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: LeadFieldErrors = {}
      for (const item of error.inner.length ? error.inner : [error]) {
        const key = (item.path as keyof LeadFormValues | undefined) || 'form'
        if (!errors[key]) errors[key] = item.message
      }
      return { ok: false, errors }
    }
    throw error
  }
}
