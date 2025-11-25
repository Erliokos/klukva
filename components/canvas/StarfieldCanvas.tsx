'use client'

import { useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components'

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -10;
`

interface Particle {
  x: number
  y: number
  radius: number
  alpha: number
  vx: number
  vy: number
  depth: number
}

const STAR_COUNT = 1000

export const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let width = window.innerWidth
    let height = window.innerHeight

    let particles: Particle[] = []
    let scrollOffset = 0

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    function initParticles() {
      particles = []

      const isDark = theme.mode === 'dark'

      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = random(0.3, 1)

        const vx = isDark ? random(0.08, 0.1) * depth : random(-0.1, 0.1)

        const vy = isDark ? random(0.08, 0.1) * depth : random(-0.1, 0.1)

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isDark ? random(0.1, 1.3) * depth : random(0.1, 1.3),
          alpha: random(0.3, 1),
          vx,
          vy,
          depth
        })
      }
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      //@ts-ignore
      canvas.width = width
      //@ts-ignore
      canvas.height = height
      initParticles()
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      const isDark = theme.mode === 'dark'

      if (isDark) {
        gradient.addColorStop(0, '#000000')
        gradient.addColorStop(0.5, '#110111')
        gradient.addColorStop(1, '#150026')
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = `rgb(250, 250, 250)`
      }

      ctx.fillRect(0, 0, width, height)
    }

    function drawParticles() {
      const isDark = theme.mode === 'dark'

      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(
          p.x,
          p.y + (isDark ? scrollOffset * 0.05 * p.depth : 0),
          p.radius,
          0,
          Math.PI * 2
        )

        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${p.alpha})`
          : `rgba(139,92,255,${p.alpha})`

        ctx.fill()
      })
    }

    function updateParticles() {
      const isDark = theme.mode === 'dark'

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // дыхание частиц
        p.alpha += random(-0.01, 0.01)
        if (p.alpha < 0.2) p.alpha = 0.2
        if (p.alpha > 1) p.alpha = 1

        // границы
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      })
    }

    function animate() {
      drawBackground()
      drawParticles()
      updateParticles()
      requestAnimationFrame(animate)
    }

    const onScroll = () => {
      scrollOffset = window.scrollY
    }

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll)

    resize()
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [theme.mode]) // ← важно: перерисовывать при смене темы

  return <Canvas ref={canvasRef} />
}
