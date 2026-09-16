import Image from 'next/image'
import Link from 'next/link'

export function SiteFooter({
  companyName,
  phone,
  email,
  address,
  legal,
}: {
  companyName: string
  phone?: string | null
  email?: string | null
  address?: string | null
  legal?: string | null
}) {
  return (
    <footer className="site-footer">
      <div className="home-wrap site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__company">
            <Link href="/" className="brand brand--footer">
              <span className="brand-mark">
                <Image
                  src="/images/icons/logo-premium.png"
                  alt=""
                  width={48}
                  height={48}
                  quality={100}
                />
              </span>
              <span className="brand-text">
                <strong>{companyName}</strong>
                <span>Экспертный центр</span>
              </span>
            </Link>
            <p className="site-footer__lead">
              Научные расчеты, гигиеническая оценка риска здоровью, проектирование санитарно-защитных
              зон и экологический консалтинг.
            </p>
            <p className="site-footer__note">
              Орган инспекции аккредитован в соответствии с требованиями регулятора. Соответствие
              стандарту ГОСТ ISO/IEC 17020.
            </p>
          </div>

          <div className="site-footer__nav">
            <div>
              <h4>Направления</h4>
              <Link href="/uslugi/otsenka-riska">Оценка рисков здоровью</Link>
              <Link href="/uslugi/szz">Проекты СЗЗ</Link>
              <Link href="/uslugi/sanepid-ekspertiza">Экспертиза Роспотребнадзора</Link>
              <Link href="/uslugi/shum">Акустические расчеты</Link>
              <Link href="/uslugi/toksikologiya">Токсикология</Link>
            </div>

            <div>
              <h4>Информация</h4>
              <Link href="/o-kompanii">О компании</Link>
              <Link href="/eksperty">Наш Экспертный совет</Link>
              <Link href="/proekty">Выполненные кейсы</Link>
              <Link href="/publikacii">Публикации</Link>
              <Link href="/dokumenty">Регламентирующие документы</Link>
            </div>

            <div className="site-footer__contacts">
              <h4>Контакты центра</h4>
              <p className="site-footer__phone">{phone || '+7 (495) 120-44-88'}</p>
              <p>{email || 'info@sanepid-expert.ru'}</p>
              <p className="site-footer__address">
                {address ||
                  '119049, г. Москва, Ленинский проспект, д. 8, стр. 16, Научно-исследовательский кластер'}
              </p>
            </div>
          </div>
        </div>

        <hr className="site-footer__rule" />

        <div className="site-footer__bottom">
          <p>
            {legal ||
              `© ${new Date().getFullYear()} Экспертный центр «СанЭпидЭксперт». Все права защищены.`}
          </p>
          <div className="site-footer__legal">
            <Link href="/dokumenty">Политика обработки данных</Link>
            <Link href="/dokumenty">Раскрытие информации</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
