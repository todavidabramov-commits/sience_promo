'use client'

import { mapExpert } from '@/cms/map'
import type { ExpertView } from '@/cms/types'
import { CmsImage } from '@/components/CmsImage'
import { useLiveCollectionList } from '@/components/LivePreviewListener'
import { RevealItem, RevealStagger } from '@/components/Reveal'

export function ExpertsListLive({ experts }: { experts: ExpertView[] }) {
  const items = useLiveCollectionList(
    'experts',
    experts,
    (doc, initial) => mapExpert(doc, { live: true, fallback: initial }),
    (item) => item.slug,
  )

  return (
    <RevealStagger className="experts-list" stagger={0.08}>
      {items.map((expert) => (
        <RevealItem key={expert.slug}>
          <article className="experts-row">
            <div className="experts-row__media">
              <CmsImage
                src={expert.image}
                alt={expert.name}
                fill
                quality={100}
                sizes="(max-width: 980px) 100vw, 200px"
              />
            </div>
            <div className="experts-row__body">
              <span className="experts-row__badge">{expert.title}</span>
              <h3>{expert.name}</h3>
              <p className="experts-row__creds">{expert.credentials}</p>
              <p className="experts-row__bio">{expert.bio}</p>
              <div className="experts-row__tags">
                {expert.tags.map((tag, index) => (
                  <span key={`${index}-${tag}`}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        </RevealItem>
      ))}
    </RevealStagger>
  )
}
