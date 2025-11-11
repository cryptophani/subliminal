export interface SessionStats {
  totalListeningTime: number // in seconds
  currentStreak: number // in days
  longestStreak: number
  lastListenDate: string
  tracksCompleted: number
  achievements: string[]
  sessionStartTime: number
}

export class SessionTracker {
  private static STORAGE_KEY = 'subliminal_session_stats'

  static getStats(): SessionStats {
    if (typeof window === 'undefined') {
      return this.getDefaultStats()
    }

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      return this.getDefaultStats()
    }

    try {
      return JSON.parse(stored)
    } catch {
      return this.getDefaultStats()
    }
  }

  static getDefaultStats(): SessionStats {
    return {
      totalListeningTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastListenDate: '',
      tracksCompleted: 0,
      achievements: [],
      sessionStartTime: Date.now(),
    }
  }

  static saveStats(stats: SessionStats) {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats))
  }

  static addListeningTime(seconds: number) {
    const stats = this.getStats()
    stats.totalListeningTime += seconds

    // Update streak
    const today = new Date().toDateString()
    const lastDate = stats.lastListenDate ? new Date(stats.lastListenDate).toDateString() : ''

    if (today !== lastDate) {
      const yesterday = new Date(Date.now() - 86400000).toDateString()

      if (lastDate === yesterday) {
        stats.currentStreak += 1
      } else if (lastDate !== today) {
        stats.currentStreak = 1
      }

      stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak)
      stats.lastListenDate = today
    }

    this.saveStats(stats)
    this.checkAchievements(stats)
    return stats
  }

  static trackCompletion() {
    const stats = this.getStats()
    stats.tracksCompleted += 1
    this.saveStats(stats)
    this.checkAchievements(stats)
    return stats
  }

  static checkAchievements(stats: SessionStats) {
    const newAchievements: string[] = []

    // Time-based achievements
    if (stats.totalListeningTime >= 3600 && !stats.achievements.includes('first_hour')) {
      newAchievements.push('first_hour')
    }
    if (stats.totalListeningTime >= 36000 && !stats.achievements.includes('ten_hours')) {
      newAchievements.push('ten_hours')
    }
    if (stats.totalListeningTime >= 360000 && !stats.achievements.includes('hundred_hours')) {
      newAchievements.push('hundred_hours')
    }

    // Streak achievements
    if (stats.currentStreak >= 3 && !stats.achievements.includes('streak_3')) {
      newAchievements.push('streak_3')
    }
    if (stats.currentStreak >= 7 && !stats.achievements.includes('streak_7')) {
      newAchievements.push('streak_7')
    }
    if (stats.currentStreak >= 30 && !stats.achievements.includes('streak_30')) {
      newAchievements.push('streak_30')
    }

    // Track completion achievements
    if (stats.tracksCompleted >= 10 && !stats.achievements.includes('tracks_10')) {
      newAchievements.push('tracks_10')
    }
    if (stats.tracksCompleted >= 50 && !stats.achievements.includes('tracks_50')) {
      newAchievements.push('tracks_50')
    }
    if (stats.tracksCompleted >= 100 && !stats.achievements.includes('tracks_100')) {
      newAchievements.push('tracks_100')
    }

    if (newAchievements.length > 0) {
      stats.achievements.push(...newAchievements)
      this.saveStats(stats)
    }

    return newAchievements
  }

  static formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }
}

export const ACHIEVEMENT_DATA: Record<string, { title: string; description: string; icon: string }> = {
  first_hour: {
    title: 'First Hour',
    description: 'Listened for 1 hour total',
    icon: '🎧',
  },
  ten_hours: {
    title: 'Dedicated Listener',
    description: 'Listened for 10 hours total',
    icon: '⭐',
  },
  hundred_hours: {
    title: 'Transformation Master',
    description: 'Listened for 100 hours total',
    icon: '🏆',
  },
  streak_3: {
    title: '3-Day Streak',
    description: 'Listened for 3 days in a row',
    icon: '🔥',
  },
  streak_7: {
    title: 'Week Warrior',
    description: 'Listened for 7 days in a row',
    icon: '💪',
  },
  streak_30: {
    title: 'Monthly Master',
    description: 'Listened for 30 days in a row',
    icon: '👑',
  },
  tracks_10: {
    title: 'Explorer',
    description: 'Completed 10 tracks',
    icon: '🎵',
  },
  tracks_50: {
    title: 'Enthusiast',
    description: 'Completed 50 tracks',
    icon: '🌟',
  },
  tracks_100: {
    title: 'Centurion',
    description: 'Completed 100 tracks',
    icon: '💎',
  },
}
