export type BrandList = { name: string; detail: string }
type BrandSliderProps = { brandList: BrandList[] }

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section className="brand-slider page-width" aria-label="Варианты домов">
      <span className="brand-slider-label">Выберите свой формат отдыха</span>
      <div className="brand-slider-items">
        {brandList.map((brand) => <span className="brand-slider-item" key={brand.name}><small>{brand.detail}</small><strong>{brand.name}</strong></span>)}
      </div>
    </section>
  )
}
