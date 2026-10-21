import { useEffect } from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import Header from '@/components/ui/hero-01-utils/header'
import GalleryPage from '@/pages/gallery-page'
import HomePage from '@/pages/home-page'
import HousesPage from '@/pages/houses-page'

const navigationData = [
  { title: 'Главная', href: '/' },
  { title: 'Дома', href: '/houses' },
  { title: 'Галерея и контакты', href: '/gallery' },
]

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 0)
      return () => window.clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

function SiteLayout() {
  return (
    <>
      <Header navigationData={navigationData} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/houses" element={<HousesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark" aria-hidden="true">СБ</span>
            <span className="brand-copy"><strong>СОСНОВЫЙ БЕРЕГ</strong><small>место выдохнуть</small></span>
          </Link>
          <p>Тишина леса, тепло дома и время для себя.</p>
          <span className="footer-note">© {new Date().getFullYear()} · База отдыха «Сосновый берег»</span>
        </div>
      </footer>
    </>
  )
}

export default function App() {
  return <HashRouter><RouteEffects /><SiteLayout /></HashRouter>
}
