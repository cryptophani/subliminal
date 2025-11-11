'use client'

import { useEffect, useRef } from 'react'
import { usePlayerStore } from '@/store/player-store'

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const { isPlaying, volume } = usePlayerStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()

    // Create fake analyzer for demo (since we can't easily tap into ReactPlayer's audio)
    // In production, you'd connect this to the actual audio source
    const barCount = 64
    dataArrayRef.current = new Uint8Array(barCount)

    const draw = () => {
      if (!canvas || !ctx || !dataArrayRef.current) return

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const barWidth = width / barCount

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      if (!isPlaying) {
        // Show static bars when not playing
        for (let i = 0; i < barCount; i++) {
          const x = i * barWidth
          const barHeight = 4
          const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height)
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)')
          gradient.addColorStop(1, 'rgba(236, 72, 153, 0.3)')
          ctx.fillStyle = gradient
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight)
        }
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      // Generate fake frequency data (replace with real audio data in production)
      for (let i = 0; i < barCount; i++) {
        const energy = Math.random() * volume * 255
        const smoothing = 0.8
        dataArrayRef.current[i] = dataArrayRef.current[i] * smoothing + energy * (1 - smoothing)
      }

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        const value = dataArrayRef.current[i]
        const percent = value / 255
        const barHeight = Math.max(4, height * percent * 0.8)
        const x = i * barWidth
        const y = height - barHeight

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, height)

        if (percent > 0.7) {
          gradient.addColorStop(0, '#f97316') // orange
          gradient.addColorStop(0.5, '#ec4899') // pink
          gradient.addColorStop(1, '#a855f7') // purple
        } else if (percent > 0.4) {
          gradient.addColorStop(0, '#ec4899') // pink
          gradient.addColorStop(1, '#a855f7') // purple
        } else {
          gradient.addColorStop(0, '#a855f7') // purple
          gradient.addColorStop(1, '#7c3aed') // darker purple
        }

        ctx.fillStyle = gradient

        // Add rounded corners effect
        ctx.fillRect(x, y, barWidth - 2, barHeight)

        // Add glow effect for high energy bars
        if (percent > 0.6) {
          ctx.shadowBlur = 10
          ctx.shadowColor = percent > 0.8 ? '#f97316' : '#ec4899'
        } else {
          ctx.shadowBlur = 0
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, volume])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
