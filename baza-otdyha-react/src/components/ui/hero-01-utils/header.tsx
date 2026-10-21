import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export type NavigationSection = { title: string; href: string; isActive?: boolean }
type HeaderProps = { navigationData: NavigationSection[] }

export default function Header({ navigationData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Сосновый берег — главная" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">СБ</span>
          <span className="brand-copy"><strong>СОСНОВЫЙ БЕРЕГ</strong><small>место выдохнуть</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="main-navigation" onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span><span className="visually-hidden">Открыть меню</span>
        </button>
        <nav className={`main-navigation${isOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="Главная навигация">
          {navigationData.map((item) => (
            <Link key={item.href} to={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={closeMenu}>{item.title}</Link>
          ))}
          <Button asChild size="sm" className="button button-small"><Link to="/gallery#contacts" onClick={closeMenu}>Забронировать</Link></Button>
        </nav>
      </div>
    </header>
  )
}
