'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { FieldError, NameInput, PhoneInput } from '@/components/MaskedFields'
import { leadSchema, resolveYup, type LeadFormType, type LeadFormValues } from '@/lib/validation'

export function LeadForm({
  type = 'contact',
  services = [],
  variant = 'default',
  defaultTopic = 'Обоснование границ СЗЗ по фактору шума',
}: {
  type?: LeadFormType
  services?: { id: string; title: string }[]
  variant?: 'default' | 'contacts'
  defaultTopic?: string
}) {
  const isProposal = type === 'proposal'
  const isDocument = type === 'document'
  const isContacts = variant === 'contacts'
  const boxed = isProposal || isDocument
  const maxFileMb = isContacts ? 100 : 50

  const schema = useMemo(() => leadSchema(type, maxFileMb), [type, maxFileMb])
  const defaultService = services.find((item) => item.id === 'szz')?.id || services[0]?.id || ''

  const [sent, setSent] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: async (values) => resolveYup(schema, values),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: isDocument ? 'Запрос документов' : isProposal ? 'Заявка с сайта' : '',
      company: '',
      email: '',
      phone: '',
      message: isProposal
        ? 'Запрос расчета стоимости экспертных работ'
        : isDocument
          ? defaultTopic
          : '',
      serviceId: defaultService,
      attachment: null,
    },
  })

  useEffect(() => {
    if (isDocument) setValue('message', defaultTopic)
  }, [defaultTopic, isDocument, setValue])

  const attachment = watch('attachment')

  async function onSubmit(values: LeadFormValues) {
    setSent(false)
    const data = new FormData()
    data.set('type', isDocument ? 'contact' : type)
    data.set('name', values.name || (isDocument ? 'Запрос документов' : 'Заявка с сайта'))
    data.set('email', values.email)
    data.set('phone', values.phone)
    data.set('company', values.company)
    data.set(
      'message',
      values.message || (isProposal ? 'Запрос расчета стоимости экспертных работ' : ''),
    )
    if (values.serviceId) data.set('serviceId', values.serviceId)
    if (values.attachment) data.set('attachment', values.attachment)

    try {
      const res = await fetch('/api/form', { method: 'POST', body: data })
      if (!res.ok) throw new Error('Request failed')
    } catch {
      setError('root', { message: 'Не удалось отправить' })
      return
    }

    reset({
      name: isDocument ? 'Запрос документов' : isProposal ? 'Заявка с сайта' : '',
      company: '',
      email: '',
      phone: '',
      message: isProposal
        ? 'Запрос расчета стоимости экспертных работ'
        : isDocument
          ? defaultTopic
          : '',
      serviceId: defaultService,
      attachment: null,
    }, {
      keepErrors: false,
      keepIsSubmitted: false,
      keepTouched: false,
      keepDirty: false,
    })
    setSent(true)
  }

  return (
    <form
      className={`form home-form${boxed ? ' home-form--proposal' : ''}${isDocument ? ' home-form--document' : ''}${isContacts ? ' home-form--contacts' : ''}`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {isProposal || isDocument ? <input type="hidden" {...register('name')} /> : null}
      {!boxed ? (
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Обратная связь</h3>
      ) : null}

      {isDocument ? (
        <>
          <label>
            Тема запроса документов
            <input
              {...register('message')}
              className={errors.message ? 'is-invalid' : undefined}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? 'lead-message-error' : undefined}
            />
            <FieldError id="lead-message-error" message={errors.message?.message} />
          </label>
          <div className="home-form__row">
            <label>
              Контактный E-mail
              <input
                type="email"
                autoComplete="email"
                placeholder="client@company.ru"
                {...register('email')}
                className={errors.email ? 'is-invalid' : undefined}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'lead-email-error' : undefined}
              />
              <FieldError id="lead-email-error" message={errors.email?.message} />
            </label>
            <label>
              Номер телефона
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="+7 (495) 000-00-00"
                    invalid={Boolean(!sent && errors.phone)}
                    describedBy={!sent && errors.phone ? 'lead-phone-error' : undefined}
                  />
                )}
              />
              <FieldError id="lead-phone-error" message={sent ? undefined : errors.phone?.message} />
            </label>
          </div>
        </>
      ) : (
        <>
          <label>
            {isProposal ? (isContacts ? 'Наименование организации' : 'Название организации') : 'Имя *'}
            {isProposal ? (
              <input
                autoComplete="organization"
                placeholder={
                  isContacts ? 'ООО «Строительный холдинг»' : 'ООО «ТехноПром»'
                }
                {...register('company')}
                className={errors.company ? 'is-invalid' : undefined}
                aria-invalid={errors.company ? true : undefined}
                aria-describedby={errors.company ? 'lead-company-error' : undefined}
              />
            ) : (
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <NameInput
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Как к вам обращаться"
                    invalid={Boolean(errors.name)}
                    describedBy={errors.name ? 'lead-name-error' : undefined}
                  />
                )}
              />
            )}
            <FieldError
              id={isProposal ? 'lead-company-error' : 'lead-name-error'}
              message={isProposal ? errors.company?.message : errors.name?.message}
            />
          </label>

          {isProposal ? (
            <div className="home-form__row">
              <label>
                {isContacts ? 'Контактный E-mail' : 'Электронная почта'}
                <input
                  type="email"
                  autoComplete="email"
                  placeholder={isContacts ? 'info@builder.ru' : 'project@industry.ru'}
                  {...register('email')}
                  className={errors.email ? 'is-invalid' : undefined}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'lead-email-error' : undefined}
                />
                <FieldError id="lead-email-error" message={errors.email?.message} />
              </label>
              <label>
                {isContacts ? 'Телефон' : 'Контактный телефон'}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder={isContacts ? '+7 (900) 000-00-00' : '+7 (999) 123-45-67'}
                      invalid={Boolean(!sent && errors.phone)}
                      describedBy={!sent && errors.phone ? 'lead-phone-error' : undefined}
                    />
                  )}
                />
                <FieldError id="lead-phone-error" message={sent ? undefined : errors.phone?.message} />
              </label>
            </div>
          ) : (
            <>
              <label>
                Электронная почта *
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.ru"
                  {...register('email')}
                  className={errors.email ? 'is-invalid' : undefined}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'lead-email-error' : undefined}
                />
                <FieldError id="lead-email-error" message={errors.email?.message} />
              </label>
              <label>
                Контактный телефон
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      placeholder="+7 (___) ___-__-__"
                      invalid={Boolean(!sent && errors.phone)}
                      describedBy={!sent && errors.phone ? 'lead-phone-error' : undefined}
                    />
                  )}
                />
                <FieldError id="lead-phone-error" message={sent ? undefined : errors.phone?.message} />
              </label>
            </>
          )}
        </>
      )}

      {isProposal && !isContacts && services.length > 0 ? (
        <label>
          Направление экспертизы
          <select {...register('serviceId')}>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {isProposal ? <input type="hidden" {...register('message')} /> : isDocument ? null : (
        <label>
          Сообщение *
          <textarea
            placeholder="Кратко опишите задачу"
            {...register('message')}
            className={errors.message ? 'is-invalid' : undefined}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'lead-message-error' : undefined}
          />
          <FieldError id="lead-message-error" message={errors.message?.message} />
        </label>
      )}

      {isDocument ? null : (
        <label className={`home-form__upload${errors.attachment ? ' is-invalid' : ''}`}>
          <span className="home-form__upload-box">
            <Image src="/images/icons/paperclip.svg" alt="" width={24} height={24} />
            <strong>
              {attachment
                ? attachment.name
                : isContacts
                  ? 'Загрузить файлы проекта'
                  : 'Перетащите ТЗ или чертежи сюда'}
            </strong>
            <em>
              {isContacts ? 'PDF, DOCX, DWG до 100 МБ' : 'PDF, DOCX, DWG до 50 МБ'}
            </em>
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.dwg"
            onChange={(event) => {
              const file = event.target.files?.[0] || null
              setValue('attachment', file, { shouldValidate: true })
            }}
          />
          <FieldError id="lead-file-error" message={errors.attachment?.message as string | undefined} />
        </label>
      )}

      <button className="home-btn home-btn--primary" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? 'Отправка…'
          : isDocument
            ? 'Отправить официальный запрос'
            : isContacts
              ? 'Отправить данные на расчет'
              : isProposal
                ? 'Отправить запрос на расчет'
                : 'Отправить'}
        {isProposal && !isContacts && !isSubmitting ? (
          <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
        ) : null}
      </button>

      {isProposal && !isContacts ? (
        <p className="home-form__legal">
          Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных в соответствии с{' '}
          <Link href="/dokumenty">Политикой конфиденциальности</Link>.
        </p>
      ) : null}

      {errors.root?.message ? (
        <p className="form-field__error" role="alert">
          {errors.root.message}
        </p>
      ) : null}

      {sent ? (
        <p className="form-field__ok" role="status">
          Заявка отправлена. Мы свяжемся с вами.
        </p>
      ) : null}
    </form>
  )
}
