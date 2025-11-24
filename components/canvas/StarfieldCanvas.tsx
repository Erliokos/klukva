'use client'

import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -10;
`

const STAR_COLOR = '#fff'
const STAR_SIZE = 3
const STAR_MIN_SCALE = 0.2
const OVERFLOW_THRESHOLD = 50

export const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let scale = 1
    let width = 0
    let height = 0

    let stars: { x: number; y: number; z: number }[] = []
    let pointerX: number | null = null
    let pointerY: number | null = null
    let touchInput = false

    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8

    const velocity = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      z: 0.0005
    }

    // ---------------------
    // ⭐ Создание звёзд
    // ---------------------
    function generate() {
      stars = []
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        })
      }
    }

    function placeStar(star: any) {
      star.x = Math.random() * width
      star.y = Math.random() * height
    }

    function recycleStar(star: any) {
      let direction: 'z' | 'l' | 'r' | 't' | 'b' = 'z'

      const vx = Math.abs(velocity.x)
      const vy = Math.abs(velocity.y)

      if (vx > 1 || vy > 1) {
        let axis: 'h' | 'v'
        if (vx > vy) axis = Math.random() < vx / (vx + vy) ? 'h' : 'v'
        else axis = Math.random() < vy / (vx + vy) ? 'v' : 'h'

        if (axis === 'h') direction = velocity.x > 0 ? 'l' : 'r'
        else direction = velocity.y > 0 ? 't' : 'b'
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)

      if (direction === 'z') {
        star.z = 0.1
        star.x = Math.random() * width
        star.y = Math.random() * height
      } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD
        star.y = height * Math.random()
      } else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD
        star.y = height * Math.random()
      } else if (direction === 't') {
        star.x = width * Math.random()
        star.y = -OVERFLOW_THRESHOLD
      } else if (direction === 'b') {
        star.x = width * Math.random()
        star.y = height + OVERFLOW_THRESHOLD
      }
    }

    // ---------------------
    // 📐 Resize
    // ---------------------
    function resize() {
      scale = window.devicePixelRatio || 1
      width = window.innerWidth * scale
      height = window.innerHeight * scale

      //@ts-ignore
      canvas.width = width
      //@ts-ignore
      canvas.height = height

      stars.forEach(placeStar)
    }

    // ---------------------
    // 🎮 Обновление движения
    // ---------------------
    function update() {
      velocity.tx *= 0.96
      velocity.ty *= 0.96

      velocity.x += (velocity.tx - velocity.x) * 0.8
      velocity.y += (velocity.ty - velocity.y) * 0.8

      stars.forEach(star => {
        star.x += velocity.x * star.z
        star.y += velocity.y * star.z

        star.x += (star.x - width / 2) * velocity.z * star.z
        star.y += (star.y - height / 2) * velocity.z * star.z
        star.z += velocity.z

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star)
        }
      })
    }

    // ---------------------
    // 🎨 Рендер звёзд
    // ---------------------
    function render() {
      ctx.clearRect(0, 0, width, height)

      stars.forEach(star => {
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.lineWidth = STAR_SIZE * star.z * scale
        ctx.globalAlpha = 0.5 + Math.random() * 0.5
        ctx.strokeStyle = STAR_COLOR

        ctx.moveTo(star.x, star.y)

        let tailX = velocity.x * 2
        let tailY = velocity.y * 2
        if (Math.abs(tailX) < 0.1) tailX = 0.5
        if (Math.abs(tailY) < 0.1) tailY = 0.5

        ctx.lineTo(star.x + tailX, star.y + tailY)
        ctx.stroke()
      })
    }

    // ---------------------
    // 🎬 Анимация
    // ---------------------
    function step() {
      update()
      render()
      requestAnimationFrame(step)
    }

    // ---------------------
    // 🖱 Управление мышью
    // ---------------------
    function movePointer(x: number | null, y: number | null) {
      if (pointerX !== null && pointerY !== null && x !== null && y !== null) {
        const ox = x - pointerX
        const oy = y - pointerY

        velocity.tx += (ox / (8 * scale)) * (touchInput ? 1 : -1)
        velocity.ty += (oy / (8 * scale)) * (touchInput ? 1 : -1)
      }

      pointerX = x
      pointerY = y
    }

    const onMouseMove = (e: MouseEvent) => {
      touchInput = false
      movePointer(e.clientX * scale, e.clientY * scale)
    }

    const onTouchMove = (e: TouchEvent) => {
      touchInput = true
      movePointer(e.touches[0].clientX * scale, e.touches[0].clientY * scale)
      e.preventDefault()
    }

    const onMouseLeave = () => {
      pointerX = null
      pointerY = null
    }

    // ---------------------
    // 🚀 Запуск
    // ---------------------
    generate()
    resize()
    step()

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('touchmove', onTouchMove)
    canvas.addEventListener('touchend', onMouseLeave)
    document.addEventListener('mouseleave', onMouseLeave)

    // ---------------------
    // 🧹 Cleanup
    // ---------------------
    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onMouseLeave)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <Canvas ref={canvasRef} />
}
