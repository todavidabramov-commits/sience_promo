import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { DocumentsCatalog } from '@/components/DocumentsCatalog'
import { LeadForm } from '@/components/LeadForm'
import { Reveal, RevealHero } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Документы',
  description:
    'Справочная база действующих санитарных норм, гигиенических нормативов и методик проведения экспертиз.',
}

const DOC_CHECKS = [
  'Предоставляем обоснованный письменный ответ экспертов Органа инспекции.',
  'Опираемся на разъяснения Федеральной службы Роспотребнадзора.',
] as const

export default function DocumentsPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/heroes/dokumenty.jpg"
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="about-hero__bg-img"
          />
          <div className="about-hero__shade" />
        </div>
        <div className="home-wrap about-hero__content">
          <RevealHero className="about-hero__copy">
            <nav className="about-crumbs" aria-label="Навигация">
              <Link href="/">Главная</Link>
              <span>/</span>
              <span>Информационный центр</span>
              <span>/</span>
              <em>Документы</em>
            </nav>
            <span className="home-tag">Реестр и законы</span>
            <h1>Регламентирующие нормативно-правовые акты и ГОСТы</h1>
            <p>
              Справочная база действующих санитарных норм, гигиенических нормативов и методик
              проведения экспертиз, используемых при проектировании СЗЗ и расчете рисков.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted catalog-section">
        <CatalogSectionMark icon="/images/icons/file-text.svg" />
        <div className="home-wrap">
          <Reveal>
            <DocumentsCatalog />
          </Reveal>
        </div>
      </section>

      <section className="home-section">
        <div className="home-wrap home-cta">
          <Reveal className="home-cta__copy">
            <div className="home-cta__intro">
              <span className="home-tag">Официальный запрос</span>
              <h2>Запрос разъяснений по расчету рисков и СЗЗ</h2>
              <p>
                Если вы не нашли нужную гигиеническую методику или вам требуется расшифровка
                законодательных изменений в рамках ПАТ — обратитесь к инспекторам центра.
              </p>
            </div>
            <ul>
              {DOC_CHECKS.map((item) => (
                <li key={item}>
                  <Image src="/images/icons/check.svg" alt="" width={16} height={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm type="document" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
