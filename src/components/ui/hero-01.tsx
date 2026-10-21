import HeroSection from '@/components/ui/hero-01-utils/hero'
import BrandSlider, { type BrandList } from '@/components/ui/hero-01-utils/brand-slider'

export default function HeroOne() {
  const brandList: BrandList[] = [
    { detail: 'Для двоих', name: '«Уединение»' },
    { detail: 'Для семьи и друзей', name: '«Сосновый»' },
    { detail: 'Для большой компании', name: '«Встреча»' },
  ]

  return <><HeroSection /><BrandSlider brandList={brandList} /></>
}


