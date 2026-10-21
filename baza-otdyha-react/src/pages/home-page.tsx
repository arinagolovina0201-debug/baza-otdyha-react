import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroOne from '@/components/ui/hero-01'

const homeReviews = [
  {
    name: 'Анастасия',
    detail: 'Дом «Уединение»',
    quote: 'В доме уютно, вокруг сосны, а утро на террасе — отдельное удовольствие. Обязательно вернёмся!',
  },
  {
    name: 'Максим',
    detail: 'Отдыхал с семьёй',
    quote: 'Всем хватило места, а вечерами мы собирались в гостиной. Отличный формат для отдыха большой семьёй.',
  },
  {
    name: 'Елена',
    detail: 'Дом «Сосновый»',
    quote: 'Приезжали с детьми на несколько дней. Удобная кухня, своя терраса и много места — всё для спокойного отдыха.',
  },
  {
    name: 'Павел',
    detail: 'Выходные вдвоём',
    quote: 'Искали тишину и нашли её здесь. Утренний кофе на террасе среди сосен стал любимой частью поездки.',
  },
  {
    name: 'Мария',
    detail: 'Дом «Встреча»',
    quote: 'Собрались большой компанией — дом просторный, всем нашлось место. Вечер за общим столом вспоминаем до сих пор.',
  },
  {
    name: 'Дмитрий',
    detail: 'Отдыхал с друзьями',
    quote: 'Понравилась атмосфера: деревянный дом, лес вокруг и никакой спешки. Уже планируем следующую поездку.',
  },
]

export default function HomePage() {
  const reviewsTrackRef = useRef<HTMLDivElement>(null)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)

  const moveReviews = useCallback((direction: -1 | 1) => {
    const track = reviewsTrackRef.current
    if (!track) return

    const lastScrollPosition = track.scrollWidth - track.clientWidth
    if (direction > 0 && track.scrollLeft >= lastScrollPosition - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction < 0 && track.scrollLeft <= 8) {
      track.scrollTo({ left: lastScrollPosition, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (autoplayPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => moveReviews(1), 5200)
    return () => window.clearInterval(timer)
  }, [autoplayPaused, moveReviews])

  const updateActiveReview = () => {
    const track = reviewsTrackRef.current
    const firstCard = track?.firstElementChild as HTMLElement | null
    if (!track || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0
    const cardStep = firstCard.getBoundingClientRect().width + gap
    if (cardStep > 0) {
      setActiveReviewIndex(Math.min(homeReviews.length - 1, Math.round(track.scrollLeft / cardStep)))
    }
  }

  return (
    <div className="home-page">
      <HeroOne />
      <section className="intro-section section-space page-width">
        <div className="section-heading"><p className="eyebrow">Добро пожаловать</p><h2>Пространство для <em>вашего ритма</em></h2></div>
        <div className="intro-copy"><p>Можно приехать вдвоём на выходные, собрать всю семью или устроить встречу большой компанией. Мы придумали три дома, в которых удобно быть вместе — и легко найти минуту для себя.</p><Link className="text-link" to="/houses">Открыть все дома <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className="home-reviews section-space" aria-labelledby="home-reviews-title">
        <div className="page-width">
          <div className="section-topline">
            <div>
              <p className="eyebrow">Говорят наши гости</p>
              <h2 id="home-reviews-title">Тёплые слова <em>после отдыха</em></h2>
            </div>
            <span className="rating-badge">★ <strong>4,9</strong> / 5</span>
          </div>
          <div
            className="reviews-carousel"
            onMouseEnter={() => setAutoplayPaused(true)}
            onMouseLeave={() => setAutoplayPaused(false)}
            onFocusCapture={() => setAutoplayPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setAutoplayPaused(false)
            }}
            onTouchStart={() => setAutoplayPaused(true)}
            onTouchEnd={() => setAutoplayPaused(false)}
          >
            <div
              className="reviews-grid"
              ref={reviewsTrackRef}
              role="region"
              aria-label="Отзывы гостей"
              onScroll={updateActiveReview}
            >
              {homeReviews.map((review, index) => (
                <blockquote className="review-card" key={review.name}>
                  <div className="review-stars" aria-label="5 из 5 звёзд">★★★★★</div>
                  <p>«{review.quote}»</p>
                  <footer>
                    <span className={`review-avatar${index % 2 ? ' review-avatar-ochre' : ''}`}>{review.name[0]}</span>
                    <span><strong>{review.name}</strong><small>{review.detail}</small></span>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="reviews-carousel-controls" role="group" aria-label="Управление отзывами">
              <span className="reviews-carousel-count" aria-live="polite">
                {String(activeReviewIndex + 1).padStart(2, '0')} / {String(homeReviews.length).padStart(2, '0')}
              </span>
              <button type="button" className="review-control" aria-label="Предыдущие отзывы" onClick={() => moveReviews(-1)}>←</button>
              <button type="button" className="review-control" aria-label="Следующие отзывы" onClick={() => moveReviews(1)}>→</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}