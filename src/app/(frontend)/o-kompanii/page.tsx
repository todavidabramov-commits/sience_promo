import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CatalogSectionMark } from '@/components/CatalogSectionMark'
import { RiseRings } from '@/components/RiseRings'
import { Reveal, RevealHero, RevealItem, RevealStagger } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'Экспертный центр «СанЭпидЭксперт» — научный фундамент и высший стандарт санитарного проектирования.',
}

const PRINCIPLES = [
  {
    icon: '/images/icons/microscope.svg',
    title: 'Академический подход',
    text: 'Наши методологии базируются на актуальных рецензируемых токсикологических исследованиях и проверенных физических законах распространения звуковых волн.',
  },
  {
    icon: '/images/icons/shield-alert.svg',
    title: 'Легитимность решений',
    text: 'Разрабатываемые проекты санитарно-защитных зон (СЗЗ) полностью выдерживают судебные экспертизы и встречные проверки Роспотребнадзора.',
  },
  {
    icon: '/images/icons/award.svg',
    title: 'Орган Инспекции ISO 17020',
    text: 'Деятельность ведется строго в рамках национальной аккредитации, исключая неточности и предвзятость оценок.',
  },
] as const

const HISTORY = [
  {
    year: '2010',
    title: 'Основание центра',
    text: 'Создание научно-производственной группы на базе профильного экологического института для разработки сложных методик акустических расчетов.',
  },
  {
    year: '2014',
    title: 'Аккредитация лаборатории',
    text: 'Запуск собственного испытательного лабораторного центра физических и химических факторов. Внедрение стандартов качества ISO.',
  },
  {
    year: '2018',
    title: 'Экспертиза приаэродромных территорий',
    text: 'Разработка уникальной методики комплексного моделирования авиационного шума в границах приаэродромных территорий (ПАТ).',
  },
  {
    year: '2022',
    title: 'Орган Инспекции Росаккредитации',
    text: 'Получение статуса Органа Инспекции по типу А (требования ГОСТ ISO/IEC 17020), позволяющего выдавать независимые экспертные заключения высокого уровня легитимности.',
  },
] as const

const LICENCES = [
  {
    code: '17020',
    title: 'Аттестат Органа Инспекции',
    text: 'Официальный государственный статус инспекционного органа типа «А», подтверждающий полную беспристрастность оценок.',
  },
  {
    code: 'ISO 9001',
    title: 'Система Менеджмента',
    text: 'Все этапы проектирования, согласования и моделирования сертифицированы по международным регламентам.',
  },
  {
    code: 'РАН',
    title: 'Научный верификатор',
    text: 'Применение только валидированных математических ядер и программных комплексов, одобренных Российской Академией Наук.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden>
          <Image
            src="/images/hero-bg.jpg"
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
            <span className="home-tag">О компании</span>
            <h1>Научный фундамент и высший стандарт санитарного проектирования</h1>
            <p>
              Экспертный центр «СанЭпидЭксперт» объединяет ведущих академических специалистов для
              решения сложных промышленных и градостроительных задач. Мы гарантируем бескомпромиссную
              точность расчетов.
            </p>
          </RevealHero>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Ценности и ориентиры</span>
            <h2>Научная достоверность вместо формальных согласований</h2>
            <p className="about-section-lead">
              Наша цель — обеспечить реальную безопасность населения и устойчивость бизнеса. Каждое
              решение подкреплено легитимными математическими моделями и лабораторными испытаниями.
            </p>
          </Reveal>

          <RevealStagger className="about-principles" stagger={0.08}>
            {PRINCIPLES.map((item) => (
              <RevealItem key={item.title}>
                <article className="about-principle">
                  <span className="about-principle__icon">
                    <Image src={item.icon} alt="" width={24} height={24} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section catalog-section">
        <CatalogSectionMark icon="/images/icons/logo-premium.png" exact />
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">История Центра</span>
            <h2>Этапы становления экспертной организации</h2>
            <p className="about-section-lead">
              От университетской лаборатории до независимого научно-экспертного центра федерального
              масштаба.
            </p>
          </Reveal>

          <RevealStagger className="about-timeline" stagger={0.07}>
            {HISTORY.map((item) => (
              <RevealItem key={item.year}>
                <article className="about-timeline__item">
                  <span className="about-timeline__year">{item.year}</span>
                  <div className="about-timeline__text">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="home-section home-section--muted">
        <div className="home-wrap">
          <Reveal className="home-section__head">
            <span className="home-tag">Гарантия Легитимности</span>
            <h2>Аккредитации и соответствие стандартам</h2>
            <p className="about-section-lead">
              Каждый расчет проходит тройной контроль качества: ведущий инженер, Орган инспекции,
              члены Экспертного научного совета.
            </p>
          </Reveal>

          <RevealStagger className="about-licences" stagger={0.08}>
            {LICENCES.map((item) => (
              <RevealItem key={item.code}>
                <article className="about-licence">
                  <strong>{item.code}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <RiseRings as="section" className="about-cta">
        <div className="home-wrap about-cta__inner">
          <Reveal className="about-cta__copy">
            <h2>Требуется профессиональная экспертиза проекта?</h2>
            <p>
              Обсудите сложный градостроительный или промышленный кейс напрямую с нашими экспертами.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link className="home-btn home-btn--primary" href="/kontakty?type=proposal">
              Начать консультацию
              <Image src="/images/icons/arrow-right.svg" alt="" width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </RiseRings>
    </>
  )
}
