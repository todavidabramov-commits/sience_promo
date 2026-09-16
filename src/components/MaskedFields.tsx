'use client'

import { IMaskInput } from 'react-imask'

import { NAME_MASK, PHONE_MASK, phoneDigits } from '@/lib/validation'

type MaskFieldProps = {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  invalid?: boolean
  describedBy?: string
}

function normalizePhone(value: string) {
  return phoneDigits(value).length <= 1 ? '' : value
}

export function PhoneInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = '+7 (___) ___-__-__',
  invalid,
  describedBy,
}: MaskFieldProps) {
  return (
    <IMaskInput
      id={id}
      name={name}
      mask={PHONE_MASK}
      lazy={false}
      value={value}
      unmask={false}
      inputMode="tel"
      autoComplete="tel"
      placeholder={placeholder}
      className={invalid ? 'is-invalid' : undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onAccept={(next: string) => {
        const normalized = normalizePhone(next)
        if (normalized !== value) onChange(normalized)
      }}
      onBlur={onBlur}
    />
  )
}

export function NameInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  invalid,
  describedBy,
}: MaskFieldProps) {
  return (
    <IMaskInput
      id={id}
      name={name}
      mask={NAME_MASK}
      value={value}
      autoComplete="name"
      placeholder={placeholder}
      className={invalid ? 'is-invalid' : undefined}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onAccept={(next: string) => {
        if (next !== value) onChange(next)
      }}
      onBlur={onBlur}
    />
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <span className="form-field__error" id={id} role="alert">
      {message}
    </span>
  )
}
