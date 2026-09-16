'use client'

import { useEffect, useRef, useState } from 'react'

type YMaps = {
  ready: (cb: () => void) => void
  Map: new (
    container: HTMLElement,
    state: { center: [number, number]; zoom: number; controls: string[] },
    options?: { suppressMapOpenBlock?: boolean },
  ) => {
    geoObjects: { add: (object: unknown) => void }
    container: { fitToViewport: () => void }
    destroy: () => void
  }
  Placemark: new (
    coords: [number, number],
    properties: { hintContent?: string; balloonContent?: string },
    options: { iconLayout: unknown; iconShape: unknown },
  ) => unknown
  templateLayoutFactory: { createClass: (html: string) => unknown }
}

declare global {
  interface Window {
    ymaps?: YMaps
  }
}

let ymapsLoader: Promise<YMaps> | null = null

function loadYmaps(): Promise<YMaps> {
  if (window.ymaps) return Promise.resolve(window.ymaps)
  if (ymapsLoader) return ymapsLoader

  ymapsLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-yandex-maps]')
    const onReady = () => {
      if (!window.ymaps) {
        reject(new Error('Yandex Maps failed to initialize'))
        return
      }
      window.ymaps.ready(() => resolve(window.ymaps as YMaps))
    }

    if (existing) {
      if (window.ymaps) {
        onReady()
        return
      }
      existing.addEventListener('load', onReady, { once: true })
      existing.addEventListener('error', () => reject(new Error('Yandex Maps script error')), {
        once: true,
      })
      return
    }

    const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
    const script = document.createElement('script')
    script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU${key ? `&apikey=${encodeURIComponent(key)}` : ''}`
    script.async = true
    script.dataset.yandexMaps = 'true'
    script.addEventListener('load', onReady, { once: true })
    script.addEventListener('error', () => reject(new Error('Yandex Maps script error')), {
      once: true,
    })
    document.head.appendChild(script)
  })

  return ymapsLoader
}

export function ContactsYandexMap({
  lat,
  lon,
  title,
  address,
}: {
  lat: number
  lon: number
  title: string
  address: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    if (fallback) return
    if (!rootRef.current) return

    let destroyed = false
    let map: InstanceType<YMaps['Map']> | null = null
    let resizeObserver: ResizeObserver | null = null

    loadYmaps()
      .then((ymaps) => {
        if (destroyed || !rootRef.current) return

        const pinLayout = ymaps.templateLayoutFactory.createClass(
          `<div class="contacts-map-pin" aria-hidden="true">
             <span class="contacts-map-pin__pulse"></span>
             <span class="contacts-map-pin__dot"></span>
           </div>`,
        )

        map = new ymaps.Map(
          rootRef.current,
          {
            center: [lat, lon],
            zoom: 16,
            controls: ['zoomControl'],
          },
          { suppressMapOpenBlock: true },
        )

        map.geoObjects.add(
          new ymaps.Placemark(
            [lat, lon],
            {
              hintContent: title,
              balloonContent: `<strong>${title}</strong><br>${address}`,
            },
            {
              iconLayout: pinLayout,
              iconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 22,
              },
            },
          ),
        )

        map.container.fitToViewport()
        resizeObserver = new ResizeObserver(() => map?.container.fitToViewport())
        resizeObserver.observe(rootRef.current)
      })
      .catch(() => {
        if (!destroyed) setFallback(true)
      })

    return () => {
      destroyed = true
      resizeObserver?.disconnect()
      map?.destroy()
    }
  }, [address, fallback, lat, lon, title])

  if (fallback) {
    return (
      <>
        <iframe
          className="contacts-map__iframe"
          title={`${title} на Яндекс Картах`}
          src={`https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=16&l=map`}
          loading="lazy"
        />
        <div className="contacts-map-pin contacts-map-pin--overlay" aria-hidden>
          <span className="contacts-map-pin__pulse" />
          <span className="contacts-map-pin__dot" />
        </div>
      </>
    )
  }

  return <div ref={rootRef} className="contacts-map__yandex" role="application" aria-label={title} />
}
