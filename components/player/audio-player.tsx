'use client'

import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Repeat, Shuffle } from 'lucide-react'
import { usePlayerStore } from '@/store/player-store'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { AudioVisualizer } from './audio-visualizer'
import { SessionTracker } from '@/lib/session-tracker'

export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    repeat,
    shuffle,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    setCurrentTime,
    setDuration,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore()

  const playerRef = useRef<ReactPlayer>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!currentTrack) return
  }, [currentTrack])

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.playedSeconds)
  }

  const handleDuration = (duration: number) => {
    setDuration(duration)
  }

  const handleSeek = (value: number[]) => {
    const time = value[0]
    setCurrentTime(time)
    playerRef.current?.seekTo(time)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEnded = () => {
    // Track completion for achievements
    SessionTracker.trackCompletion()

    if (repeat === 'one') {
      playerRef.current?.seekTo(0)
    } else if (repeat === 'all' || shuffle) {
      nextTrack()
    }
  }

  if (!currentTrack) {
    return null
  }

  const audioUrl = currentTrack.source === 'youtube'
    ? currentTrack.youtubeUrl
    : currentTrack.audioUrl

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/90 to-black/80 backdrop-blur-xl border-t border-white/10 z-50">
      {/* Visualizer */}
      <div className="h-16 w-full">
        <AudioVisualizer />
      </div>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-[200px] max-w-[300px]">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
              {currentTrack.thumbnailUrl ? (
                <Image
                  src={currentTrack.thumbnailUrl}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  🎵
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white truncate text-sm">
                {currentTrack.title}
              </p>
              <p className="text-xs text-white/60 truncate">
                {currentTrack.creatorName || 'Unknown Artist'}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleShuffle}
                className={cn(
                  "h-8 w-8 text-white/60 hover:text-white",
                  shuffle && "text-purple-400 hover:text-purple-300"
                )}
              >
                <Shuffle className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={previousTrack}
                className="h-9 w-9 text-white/80 hover:text-white"
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                size="icon"
                onClick={togglePlay}
                className="h-10 w-10 rounded-full bg-white hover:bg-white/90 text-black hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTrack}
                className="h-9 w-9 text-white/80 hover:text-white"
              >
                <SkipForward className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRepeat}
                className={cn(
                  "h-8 w-8 text-white/60 hover:text-white",
                  repeat !== 'none' && "text-purple-400 hover:text-purple-300"
                )}
              >
                <Repeat className="h-4 w-4" />
                {repeat === 'one' && (
                  <span className="absolute text-[10px] font-bold">1</span>
                )}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl flex items-center gap-2">
              <span className="text-xs text-white/60 min-w-[40px] text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
              />
              <span className="text-xs text-white/60 min-w-[40px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 min-w-[150px] justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsMuted(!isMuted)
                setVolume(isMuted ? 0.7 : 0)
              }}
              className="h-8 w-8 text-white/60 hover:text-white"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Hidden Player */}
      <ReactPlayer
        ref={playerRef}
        url={audioUrl}
        playing={isPlaying}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleEnded}
        width="0"
        height="0"
        config={{
          youtube: {
            playerVars: { showinfo: 0 }
          }
        }}
      />
    </div>
  )
}
