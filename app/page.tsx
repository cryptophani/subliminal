import { TrackCard } from '@/components/track-card'
import { mockTracks, mockPlaylists } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { TrendingUp, Sparkles, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />
        <div className="relative container mx-auto px-8 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Welcome to Subliminal</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transform Your Mind
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
              Discover powerful subliminal audio tracks to manifest your dreams, boost confidence,
              improve focus, and achieve deep relaxation. Your journey to transformation starts here.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                <Sparkles className="h-4 w-4" />
                Explore Tracks
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5">
                Upload Your Own
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockTracks.slice(0, 5).map((track) => (
            <TrackCard key={track.id} track={track} tracks={mockTracks} />
          ))}
        </div>
      </section>

      {/* Popular Playlists */}
      <section className="container mx-auto px-8 py-12 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-pink-400" />
          <h2 className="text-2xl font-bold">Featured Playlists</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="group p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
            >
              <div className="flex gap-4 mb-4">
                <div className="grid grid-cols-2 gap-1 w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  {playlist.tracks.slice(0, 4).map((track, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center text-2xl"
                    >
                      {['✨', '💰', '💪', '🎯'][idx]}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{playlist.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{playlist.description}</p>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{playlist.tracks.length} tracks</span>
                    <span>•</span>
                    <span>{playlist.likes.toLocaleString()} likes</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-500">
                Play Playlist
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="container mx-auto px-8 py-12 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="h-6 w-6 text-orange-400" />
          <h2 className="text-2xl font-bold">Recent Uploads</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {mockTracks.map((track) => (
            <TrackCard key={track.id} track={track} tracks={mockTracks} />
          ))}
        </div>
      </section>
    </div>
  )
}
