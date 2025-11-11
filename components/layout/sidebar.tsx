'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/types'
import { Card } from '@/components/ui/card'
import { StatsWidget } from '@/components/session/stats-widget'

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-16 bottom-20 overflow-y-auto p-4 border-r border-white/10">
      <div className="space-y-6">
        {/* Stats Widget */}
        <StatsWidget />
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-white/60 mb-3 px-3">
            Categories
          </h3>
          <div className="space-y-1">
            {CATEGORIES.map((category) => (
              <Link
                key={category.value}
                href={`/category/${category.value}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="text-xl">{category.emoji}</span>
                <span className="text-sm">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-white/60 mb-3 px-3">
            Playlists
          </h3>
          <div className="space-y-1">
            <Link
              href="/playlists/liked"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              ❤️ Liked Tracks
            </Link>
            <Link
              href="/playlists/recent"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              🕐 Recently Played
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-white/10 p-4">
          <p className="text-sm text-white/80 mb-2">
            🎵 Welcome to Subliminal
          </p>
          <p className="text-xs text-white/60">
            Upload your subliminal audio files or add YouTube links to create powerful playlists.
          </p>
        </Card>
      </div>
    </aside>
  )
}
