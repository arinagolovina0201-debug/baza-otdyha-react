import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { publicAsset } from './lib/public-asset'
import App from './App.tsx'

document.documentElement.style.setProperty(
  '--gallery-hero-photo',
  'url("' + publicAsset('images/gallery-background.jpeg') + '")',
)
document.documentElement.style.setProperty(
  '--home-hero-photo',
  'url("' + publicAsset('images/home-hero-lake.webp') + '")',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)