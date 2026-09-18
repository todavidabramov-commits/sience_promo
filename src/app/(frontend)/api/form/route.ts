import { NextRequest, NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'
import { digestSchema, type LeadFormType, validateLeadFields } from '@/lib/validation'

function asLeadType(value: string): LeadFormType | 'digest' {
  if (value === 'proposal' || value === 'document' || value === 'contact' || value === 'digest') {
    return value
  }
  return 'contact'
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const formData = await req.formData()

    const type = asLeadType(String(formData.get('type') || 'contact'))
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const company = String(formData.get('company') || '').trim()
    const message = String(formData.get('message') || '').trim()
    const serviceId = String(formData.get('serviceId') || '').trim()
    const attachment = formData.get('attachment')

    if (type === 'digest') {
      try {
        await digestSchema().validate({ email }, { abortEarly: false })
      } catch (error) {
        const messageText = error instanceof Error ? error.message : 'Проверьте e-mail'
        return NextResponse.json({ error: messageText }, { status: 400 })
      }
    } else {
      const checked = await validateLeadFields(type, {
        name,
        email,
        phone,
        company,
        message,
        serviceId,
      })

      if (!checked.ok) {
        return NextResponse.json(
          { error: Object.values(checked.errors)[0] || 'Проверьте поля формы', errors: checked.errors },
          { status: 400 },
        )
      }
    }

    let attachmentId: number | undefined

    if (attachment instanceof File && attachment.size > 0) {
      const buffer = Buffer.from(await attachment.arrayBuffer())
      const uploaded = await payload.create({
        collection: 'media',
        data: {
          alt: attachment.name,
        },
        file: {
          data: buffer,
          mimetype: attachment.type || 'application/octet-stream',
          name: attachment.name,
          size: attachment.size,
        },
      })
      attachmentId = typeof uploaded.id === 'number' ? uploaded.id : Number(uploaded.id)
    }

    let service: number | undefined
    if (serviceId && /^\d+$/.test(serviceId)) {
      service = Number(serviceId)
    }

    await payload.create({
      collection: 'form-submissions',
      data: {
        type: type === 'proposal' ? 'proposal' : 'contact',
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        message,
        ...(service ? { service } : {}),
        ...(attachmentId ? { attachment: attachmentId } : {}),
        status: 'new',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
