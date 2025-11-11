export interface Track {
  id: string
  title: string
  description?: string
  category: Category
  source: 'upload' | 'youtube'
  audioUrl?: string
  youtubeUrl?: string
  thumbnailUrl?: string
  duration?: number
  creatorId: string
  creatorName?: string
  plays: number
  likes: number
  createdAt: string
  updatedAt: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  coverImage?: string
  tracks: Track[]
  creatorId: string
  creatorName?: string
  isPublic: boolean
  likes: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  bio?: string
  createdAt: string
}

export type Category =
  | 'manifestation'
  | 'wealth'
  | 'confidence'
  | 'sleep'
  | 'healing'
  | 'focus'
  | 'relationships'
  | 'anxiety'
  | 'meditation'
  | 'other'

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'manifestation', label: 'Manifestation', emoji: '✨' },
  { value: 'wealth', label: 'Wealth & Abundance', emoji: '💰' },
  { value: 'confidence', label: 'Confidence', emoji: '💪' },
  { value: 'sleep', label: 'Sleep & Relaxation', emoji: '😴' },
  { value: 'healing', label: 'Healing', emoji: '💚' },
  { value: 'focus', label: 'Focus & Productivity', emoji: '🎯' },
  { value: 'relationships', label: 'Relationships', emoji: '❤️' },
  { value: 'anxiety', label: 'Anxiety Relief', emoji: '🌊' },
  { value: 'meditation', label: 'Meditation', emoji: '🧘' },
  { value: 'other', label: 'Other', emoji: '🎵' },
]
