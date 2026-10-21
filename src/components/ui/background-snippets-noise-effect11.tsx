import { useEffect, useRef } from 'react'

type NoiseProps = {
  patternRefreshInterval?: number
  patternAlpha?: number
}

/** Animated grain and a warm spotlight, positioned inside its parent card. */
export default function NoiseBackground({
  patternRefreshInterval = 4,
  patternAlpha = 7,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = grainRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const canvasSize = 512
    canvas.width = canvasSize
    canvas.height = canvasSize

    let frame = 0
    let animationId = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const drawGrain = () => {
      const imageData = context.createImageData(canvasSize, canvasSize)
      const pixels = imageData.data
      for (let index = 0; index < pixels.length; index += 4) {
        const value = Math.random() * 255
        pixels[index] = value
        pixels[index + 1] = value
        pixels[index + 2] = value
        pixels[index + 3] = patternAlpha
      }
      context.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      if (frame % Math.max(1, patternRefreshInterval) === 0) drawGrain()
      frame += 1
      if (!reduceMotion) animationId = window.requestAnimationFrame(animate)
    }

    drawGrain()
    if (!reduceMotion) animationId = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(animationId)
  }, [patternAlpha, patternRefreshInterval])

  return (
    <div className="noise-background" aria-hidden="true">
      <div className="noise-background-spotlight" />
      <canvas ref={grainRef} />
    </div>
  )
}
