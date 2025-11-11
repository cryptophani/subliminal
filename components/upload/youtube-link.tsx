'use client'

import { useState } from 'react'
import { Link as LinkIcon, Search, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface YouTubeLinkProps {
  onLinkAdded: (url: string) => void
}

export function YouTubeLink({ onLinkAdded }: YouTubeLinkProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [addedLinks, setAddedLinks] = useState<string[]>([])
  const [error, setError] = useState('')

  const isValidYouTubeUrl = (url: string) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+/,
    ]
    return patterns.some(pattern => pattern.test(url))
  }

  const handleAdd = async () => {
    setError('')

    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      return
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    setIsLoading(true)

    // Simulate API call to fetch video metadata
    setTimeout(() => {
      setAddedLinks(prev => [...prev, url])
      onLinkAdded(url)
      setUrl('')
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            type="url"
            placeholder="Paste YouTube link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        <Button
          onClick={handleAdd}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
        >
          {isLoading ? (
            <>
              <Search className="h-4 w-4 mr-2 animate-spin" />
              Fetching...
            </>
          ) : (
            'Add Link'
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Added Links */}
      {addedLinks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">Added Videos</h3>
          {addedLinks.map((link, index) => (
            <Card key={index} className="bg-white/5 border-white/10 p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {link}
                  </p>
                  <p className="text-xs text-white/60">
                    YouTube Video
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-blue-300 mb-2 font-medium">
          How to add YouTube videos:
        </p>
        <ul className="text-xs text-blue-200/80 space-y-1 list-disc list-inside">
          <li>Copy the YouTube video URL from your browser</li>
          <li>Paste it in the input field above</li>
          <li>We'll automatically fetch the video metadata</li>
          <li>The audio will be streamed directly from YouTube</li>
        </ul>
      </div>
    </div>
  )
}
