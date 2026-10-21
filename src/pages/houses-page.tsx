import { Link } from 'react-router-dom'
import NoiseBackground from '@/components/ui/background-snippets-noise-effect11'
import { publicAsset } from '@/lib/public-asset'

const houses = [
  { name: '«Уединение»', image: publicAsset('images/house-uedineniye.webp'), capacity: 2, size: '38 м²', audience: 'Для двоих', description: 'Тихий домик для неспешного утра, долгих разговоров и маленького путешествия вдвоём.', amenities: ['Спальня с большой кроватью', 'Кухня-гостиная и обеденная зона', 'Собственная терраса', 'Душевая, полотенца и фен', 'Чай, кофе и посуда', 'Wi-Fi и парковочное место'], price: 'от 6 900 ₽' },
  { name: '«Сосновый»', image: publicAsset('images/house-sosnovy.webp'), capacity: 6, size: '82 м²', audience: 'Для семьи и друзей', description: 'Вместительный дом, где удобно собраться всей семьёй, приготовить ужин и выйти на террасу.', amenities: ['Две отдельные спальни', 'Общая гостиная с раскладным диваном', 'Кухня с плитой и холодильником', 'Терраса со столом и креслами', 'Ванная комната, фен и полотенца', 'Wi-Fi и два парковочных места'], price: 'от 12 900 ₽' },
  { name: '«Встреча»', image: publicAsset('images/house-vstrecha.webp'), capacity: 16, size: '210 м²', audience: 'Для большой компании', description: 'Большой светлый дом для семейных праздников, дружеских выходных и событий, которые хочется помнить.', amenities: ['Пять спален и места для 16 гостей', 'Просторная гостиная с большим столом', 'Оборудованная кухня и посудомоечная машина', 'Крытая терраса и зона отдыха', 'Три санузла, душ и ванна', 'Wi-Fi и парковка для нескольких машин'], price: 'от 28 000 ₽' },
]

export default function HousesPage() {
  return (
    <div className="houses-page">
      <NoiseBackground patternAlpha={3} patternRefreshInterval={6} />
      <section className="page-hero page-width"><p className="eyebrow">Разместимся с комфортом</p><h1>Выберите свой<br /><em>дом у леса</em></h1><p>У каждого дома свой характер. В каждом — тёплый свет, всё нужное для отдыха и близость природы.</p></section>
      <section className="houses-list page-width section-space" aria-label="Варианты домов">
        {houses.map((house, index) => <article className={`house-card${index === 1 ? ' house-card-reverse' : ''}`} key={house.name}>
          <div className="house-photo"><img src={house.image} alt={`${house.name}, дом на ${house.capacity} гостей`} loading={index === 0 ? 'eager' : 'lazy'} /><span className="house-index">0{index + 1} / 03</span></div>
          <div className="house-info"><div className="house-heading"><div><p className="eyebrow">{house.audience} · {house.size}</p><h2>{house.name}</h2></div><span className="capacity-icon" aria-label={`Максимум ${house.capacity} гостей`}>♧ <strong>{house.capacity}</strong></span></div>
            <p className="house-description">{house.description}</p><h3>В доме есть</h3><ul className="amenities">{house.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="price-row"><div><span>Стоимость за ночь</span><strong>{house.price}</strong></div><Link className="button" to="/gallery#contacts">Узнать даты <span aria-hidden="true">↗</span></Link></div>
          </div>
        </article>)}
        <p className="price-note">Цены указаны как пример для макета и могут меняться в зависимости от сезона и дат.</p>
      </section>
      <section className="houses-benefits section-space" aria-labelledby="houses-benefits-title">
        <div className="page-width">
          <div className="section-heading">
            <p className="eyebrow">Почему выбирают нас</p>
            <h2 id="houses-benefits-title">Отдых, в котором<br /><em>всё на своём месте</em></h2>
          </div>
          <div className="houses-benefits-grid">
            <article className="houses-benefit">
              <span className="benefit-number">01</span>
              <h3>Дом для вашей компании</h3>
              <p>Три варианта размещения — для двоих, семьи или компании до 16 гостей.</p>
            </article>
            <article className="houses-benefit">
              <span className="benefit-number">02</span>
              <h3>Своя терраса</h3>
              <p>В каждом доме есть терраса, чтобы проводить время на свежем воздухе.</p>
            </article>
            <article className="houses-benefit">
              <span className="benefit-number">03</span>
              <h3>Уютные детали</h3>
              <p>Кухня, Wi-Fi и всё необходимое для спокойного отдыха уже в доме.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="closing-cta"><div className="page-width closing-cta-inner"><div><p className="eyebrow">Не уверены, какой дом выбрать?</p><h2>Расскажите, как хотите<br /><em>провести выходные</em></h2></div><Link className="button" to="/gallery#contacts">Связаться с нами <span aria-hidden="true">↗</span></Link></div></section>
    </div>
  )
}

