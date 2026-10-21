import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-visual" role="img" aria-label="База отдыха среди сосен">
        <div className="hero-stamp"><span>ДЫШИ</span><strong>МЕДЛЕННЕЕ</strong><small>и оставайся подольше</small></div>
      </div>
      <div className="hero-content page-width">
        <p className="eyebrow">Отдых, который начинается с тишины</p>
        <h1>Там, где<br /><em>легче дышать</em></h1>
        <p className="hero-text">«Сосновый берег» — небольшая база отдыха для тех, кто соскучился по запаху хвои, неторопливым утрам и вечерам без спешки.</p>
        <div className="hero-actions">
          <Button asChild className="button"><Link to="/houses">Выбрать дом <span aria-hidden="true">↗</span></Link></Button>
          <Link className="text-link" to="/gallery">Посмотреть галерею <span aria-hidden="true">→</span></Link>
        </div>
        <div className="hero-guests">

          <span>Тёплые встречи среди сосен</span>
        </div>
        <div className="hero-facts" aria-label="Преимущества отдыха">
          <span><strong>3</strong> дома на выбор</span>
          <span><strong>4,9/5</strong> оценка гостей</span>
          <span><strong>365</strong> дней рядом с природой</span>
        </div>
      </div>
      <span className="hero-side-note" aria-hidden="true">54° N&nbsp; · &nbsp;лесная сторона</span>
    </section>
  )
}




