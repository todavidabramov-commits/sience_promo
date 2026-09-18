import type { FieldValues, Resolver } from 'react-hook-form'
import * as yup from 'yup'

import { getMessages, type Messages } from '@/i18n/messages'
import { fill } from '@/i18n/label'

export type LeadFormType = 'contact' | 'proposal' | 'document'
export type ValidationCopy = Messages['validation']

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

function copy(v?: ValidationCopy): ValidationCopy {
  return v || getMessages('ru').validation
}

function emailSchema(v?: ValidationCopy) {
  const t = copy(v)
  return yup.string().trim().required(t.emailRequired).email(t.emailInvalid)
}

function phoneSchema(v?: ValidationCopy) {
  const t = copy(v)
  return yup
    .string()
    .trim()
    .required(t.phoneRequired)
    .test('ru-phone', t.phoneIncomplete, (value) => isCompleteRuPhone(value || ''))
}

function nameSchema(v?: ValidationCopy) {
  const t = copy(v)
  return yup
    .string()
    .trim()
    .required(t.nameRequired)
    .min(2, t.tooShort)
    .max(80, t.tooLong)
    .matches(NAME_MASK, t.lettersOnly)
}

function companySchema(v?: ValidationCopy) {
  const t = copy(v)
  return yup.string().trim().required(t.companyRequired).min(2, t.tooShort).max(160, t.tooLong)
}

function messageSchema(v?: ValidationCopy) {
  const t = copy(v)
  return yup.string().trim().required(t.fieldRequired).min(8, t.tooShort).max(2000, t.tooLong)
}

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

export function fileSchema(maxMb: number, v?: ValidationCopy) {
  const t = copy(v)
  return yup
    .mixed<File>()
    .nullable()
    .transform((value) => asFile(value))
    .test('size', fill(t.fileTooBig, { mb: maxMb }), (file) => {
      if (!file) return true
      return file.size <= maxMb * 1024 * 1024
    })
    .test('type', t.fileType, (file) => {
      if (!file) return true
      return ALLOWED_FILE.test(file.name)
    })
}

export function leadSchema(type: LeadFormType, maxFileMb = 50, v?: ValidationCopy) {
  return yup.object({
    name: type === 'contact' ? nameSchema(v) : yup.string().default(''),
    company: type === 'proposal' ? companySchema(v) : yup.string().default(''),
    email: emailSchema(v),
    phone: phoneSchema(v),
    message: type === 'proposal' ? yup.string().default('') : messageSchema(v),
    serviceId: yup.string().default(''),
    attachment: type === 'document' ? yup.mixed<File>().nullable() : fileSchema(maxFileMb, v),
  })
}

export function digestSchema(v?: ValidationCopy) {
  return yup.object({
    email: emailSchema(v),
  })
}

export type DigestFormValues = { email: string }

export type LeadFieldErrors = Partial<Record<keyof LeadFormValues | 'form', string>>

export function yupFormResolver<T extends FieldValues>(schema: yup.AnyObjectSchema): Resolver<T> {
  return (async (values) => {
    try {
      const data = (await schema.validate(values, { abortEarly: false })) as T
      return { values: data, errors: {} }
    } catch (error) {
      const errors: Record<string, { type: string; message: string }> = {}
      if (error instanceof yup.ValidationError) {
        for (const item of error.inner.length ? error.inner : [error]) {
          const path = item.path || 'root'
          if (!errors[path]) {
            errors[path] = { type: item.type || 'validate', message: item.message }
          }
        }
      } else {
        errors.root = { type: 'validate', message: getMessages('ru').validation.checkFields }
      }
      return { values: {}, errors }
    }
  }) as Resolver<T>
}

export async function validateLeadFields(
  type: LeadFormType,
  values: Record<string, string>,
): Promise<{ ok: true } | { ok: false; errors: LeadFieldErrors }> {
  try {
    await leadSchema(type, 50, copy()).validate(
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
