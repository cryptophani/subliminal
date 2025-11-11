'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SessionTracker, ACHIEVEMENT_DATA, type SessionStats } from '@/lib/session-tracker'
import { usePlayerStore } from '@/store/player-store'
import { Flame, Clock, Trophy, TrendingUp } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function StatsWidget() {
  const [stats, setStats] = useState<SessionStats>(SessionTracker.getDefaultStats())
  const [sessionTime, setSessionTime] = useState(0)
  const { isPlaying } = usePlayerStore()

  // Load stats on mount
  useEffect(() => {
    setStats(SessionTracker.getStats())
  }, [])

  // Track session time
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)

      // Save every 10 seconds
      if (sessionTime % 10 === 0) {
        const newStats = SessionTracker.addListeningTime(10)
        setStats(newStats)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, sessionTime])

  // Check for new achievements
  useEffect(() => {
    const newAchievements = SessionTracker.checkAchievements(stats)
    if (newAchievements.length > 0) {
      newAchievements.forEach((achievement) => {
        const data = ACHIEVEMENT_DATA[achievement]
        if (data) {
          toast.success(
            `${data.icon} Achievement Unlocked: ${data.title}!`,
            {
              duration: 5000,
              style: {
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: 'white',
                fontWeight: 'bold',
              },
            }
          )
        }
      })
    }
  }, [stats.totalListeningTime, stats.currentStreak, stats.tracksCompleted])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Session Time */}
      <motion.div
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-white/60">Session Time</p>
            <p className="text-lg font-bold text-white">
              {SessionTracker.formatTime(sessionTime)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Streak */}
      <motion.div
        className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center"
            animate={stats.currentStreak > 0 ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <p className="text-xs text-white/60">Current Streak</p>
            <p className="text-lg font-bold text-white">
              {stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Total Time */}
      <motion.div
        className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-white/60">Total Listening</p>
            <p className="text-lg font-bold text-white">
              {SessionTracker.formatTime(stats.totalListeningTime)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Achievements Preview */}
      {stats.achievements.length > 0 && (
        <motion.div
          className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/60">Achievements</p>
              <p className="text-lg font-bold text-white">{stats.achievements.length}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {stats.achievements.slice(-3).map((achievement) => {
              const data = ACHIEVEMENT_DATA[achievement]
              return (
                <motion.div
                  key={achievement}
                  className="text-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: 'spring' }}
                  title={data?.title}
                >
                  {data?.icon}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
