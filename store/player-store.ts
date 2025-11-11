import { create } from 'zustand'
import { Track } from '@/types'

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  repeat: 'none' | 'one' | 'all'
  shuffle: boolean

  setCurrentTrack: (track: Track) => void
  setQueue: (tracks: Track[]) => void
  playTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  nextTrack: () => void
  previousTrack: () => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  toggleRepeat: () => void
  toggleShuffle: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  repeat: 'none',
  shuffle: false,

  setCurrentTrack: (track) => set({ currentTrack: track }),

  setQueue: (tracks) => set({ queue: tracks }),

  playTrack: (track, queue) => set({
    currentTrack: track,
    isPlaying: true,
    ...(queue && { queue })
  }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  nextTrack: () => {
    const { queue, currentTrack, shuffle } = get()
    if (!currentTrack || queue.length === 0) return

    const currentIndex = queue.findIndex(t => t.id === currentTrack.id)
    let nextIndex = currentIndex + 1

    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length)
    } else if (nextIndex >= queue.length) {
      nextIndex = 0
    }

    set({ currentTrack: queue[nextIndex], isPlaying: true })
  },

  previousTrack: () => {
    const { queue, currentTrack } = get()
    if (!currentTrack || queue.length === 0) return

    const currentIndex = queue.findIndex(t => t.id === currentTrack.id)
    const prevIndex = currentIndex - 1 < 0 ? queue.length - 1 : currentIndex - 1

    set({ currentTrack: queue[prevIndex], isPlaying: true })
  },

  setVolume: (volume) => set({ volume }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),

  toggleRepeat: () => set((state) => ({
    repeat: state.repeat === 'none' ? 'all' : state.repeat === 'all' ? 'one' : 'none'
  })),

  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
}))
