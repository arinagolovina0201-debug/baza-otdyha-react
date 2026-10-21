import { useRef, useState } from 'react'
import NoiseBackground from '@/components/ui/background-snippets-noise-effect11'
import { publicAsset } from '@/lib/public-asset'

const galleryItems = [
  { image: publicAsset('images/gallery-lakeside-houses.webp'), alt: 'Деревянные дома у озера в вечернем свете', caption: 'Дома у озера', detail: 'Вечерние огни отражаются в спокойной воде' },
  { image: publicAsset('images/house-vstrecha.webp'), alt: 'Деревянный дом «Встреча» среди сосен', caption: 'Домик среди сосен', detail: 'Тишина леса и уютный деревянный дом' },
  { image: publicAsset('images/gallery-forest-cabin.jpg'), alt: 'Костровая зона перед уютным домом в хвойном лесу', caption: 'Вечер у костра', detail: 'Огонь, лес и время для долгих разговоров' },
  { image: publicAsset('images/gallery-cabin-couple.webp'), alt: 'Пара на террасе уютного домика с видом на горы', caption: 'Выходные вдвоём', detail: 'Тихое место, чтобы сменить ритм и побыть рядом' },
  { image: publicAsset('images/gallery-hot-tub.webp'), alt: 'Деревянная горячая купель среди хвойного леса', caption: 'Купель среди сосен', detail: 'Тёплая вода и свежий лесной воздух' },
]

export default function GalleryPage() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = (index: number) => {
    const track = trackRef.current
    const slide = track?.children.item(index) as HTMLElement | null
    if (!track || !slide) return

    const offset = slide.getBoundingClientRect().left - track.getBoundingClientRect().left
    track.scrollTo({ left: track.scrollLeft + offset, behavior: 'smooth' })
    setActiveIndex(index)
  }

  const updateActiveSlide = () => {
    const track = trackRef.current
    if (!track) return

    const trackLeft = track.getBoundingClientRect().left
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    Array.from(track.children).forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
  }

  const showPrevious = () => goToSlide((activeIndex - 1 + galleryItems.length) % galleryItems.length)
  const showNext = () => goToSlide((activeIndex + 1) % galleryItems.length)

  return (
    <div className="gallery-page">
      <NoiseBackground patternAlpha={3} patternRefreshInterval={6} />
      <section className="page-hero gallery-page-hero">
        <div className="page-width">
          <p className="eyebrow">Почувствуйте атмосферу</p>
          <h1>Место, куда<br /><em>хочется вернуться</em></h1>
          <p>Дом, лесная тропа, утренний туман и тёплый вечерний свет. Познакомьтесь с домами и атмосферой отдыха среди сосен.</p>
        </div>
      </section>
      <section className="gallery-carousel page-width" aria-label="Фотогалерея базы отдыха">
        <div className="gallery-track" ref={trackRef} onScroll={updateActiveSlide}>
          {galleryItems.map((item, index) => (
            <figure className="gallery-item" key={item.image}>
              <img className="gallery-photo" src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption className="gallery-caption"><strong>{item.caption}</strong><span>{item.detail}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-controls">
          <span className="gallery-counter" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(galleryItems.length).padStart(2, '0')}</span></span>
          <div className="gallery-dots" aria-label="Выбрать фотографию">
            {galleryItems.map((item, index) => (
              <button className={`gallery-dot${activeIndex === index ? ' is-active' : ''}`} key={item.image} type="button" aria-label={`Фото ${index + 1}: ${item.caption}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goToSlide(index)} />
            ))}
          </div>
          <div className="gallery-arrows">
            <button type="button" aria-label="Предыдущее фото" onClick={showPrevious}>←</button>
            <button type="button" aria-label="Следующее фото" onClick={showNext}>→</button>
          </div>
        </div>
      </section>
      <section className="contacts-section" id="contacts"><div className="page-width contacts-layout">
        <div className="contacts-intro"><p className="eyebrow">Будем рады вас встретить</p><h2>Пора устроить<br /><em>маленькое побег</em></h2><p>Напишите или позвоните, чтобы узнать свободные даты и подобрать дом для вашей поездки.</p><a className="button button-light" href="mailto:hello@sosnovy-bereg.example">Написать нам <span aria-hidden="true">↗</span></a></div>
        <div className="contact-table" role="table" aria-label="Контактные данные базы отдыха">
          <div className="contact-row" role="row"><span role="cell">Телефон</span><span role="cell">+7 (___) ___-__-__ <small>укажите ваш номер</small></span></div>
          <div className="contact-row" role="row"><span role="cell">Электронная почта</span><span role="cell">ваш-email@example.ru <small>замените на свою почту</small></span></div>
          <div className="contact-row" role="row"><span role="cell">Адрес</span><span role="cell">Добавьте адрес базы отдыха</span></div>
          <div className="contact-row" role="row"><span role="cell">Заезд / выезд</span><span role="cell">Заезд после 15:00 · выезд до 12:00</span></div>
          <div className="contact-row" role="row"><span role="cell">Соцсети</span><span role="cell">Добавьте ссылки на ваши страницы</span></div>
        </div>
      </div></section>
    </div>
  )
}


