'use client'

import { Track } from '@/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Heart } from 'lucide-react'
import { usePlayerStore } from '@/store/player-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface TrackCardProps {
  track: Track
  tracks?: Track[]
}

export function TrackCard({ track, tracks = [] }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore()
  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay()
    } else {
      playTrack(track, tracks.length > 0 ? tracks : [track])
    }
  }

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="aspect-square relative overflow-hidden">
        {track.thumbnailUrl ? (
          <Image
            src={track.thumbnailUrl}
            alt={track.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-6xl">
            {track.category === 'manifestation' && '✨'}
            {track.category === 'wealth' && '💰'}
            {track.category === 'confidence' && '💪'}
            {track.category === 'sleep' && '😴'}
            {track.category === 'healing' && '💚'}
            {track.category === 'focus' && '🎯'}
            {track.category === 'relationships' && '❤️'}
            {track.category === 'anxiety' && '🌊'}
            {track.category === 'meditation' && '🧘'}
            {!['manifestation', 'wealth', 'confidence', 'sleep', 'healing', 'focus', 'relationships', 'anxiety', 'meditation'].includes(track.category) && '🎵'}
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="icon"
            onClick={handlePlay}
            className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-xl hover:scale-110 transition-transform"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </Button>
        </div>

        {/* Like Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/80 text-white"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Playing Indicator */}
        {isCurrentTrack && isPlaying && (
          <div className="absolute top-2 left-2 flex gap-0.5">
            <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white truncate mb-1">
          {track.title}
        </h3>
        <p className="text-sm text-white/60 truncate">
          {track.creatorName || 'Unknown Artist'}
        </p>
        {track.description && (
          <p className="text-xs text-white/40 mt-2 line-clamp-2">
            {track.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
          <span>{track.plays.toLocaleString()} plays</span>
          <span>•</span>
          <span>{track.likes.toLocaleString()} likes</span>
        </div>
      </div>
    </Card>
  )
}
