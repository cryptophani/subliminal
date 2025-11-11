'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/upload/file-upload'
import { YouTubeLink } from '@/components/upload/youtube-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CATEGORIES, Category } from '@/types'
import { Upload, Music2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function UploadPage() {
  const [uploadType, setUploadType] = useState<'file' | 'youtube'>('file')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('manifestation')
  const [files, setFiles] = useState<File[]>([])
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleYoutubeLinkAdded = (url: string) => {
    setYoutubeUrls(prev => [...prev, url])
  }

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }

    if (uploadType === 'file' && files.length === 0) {
      toast.error('Please select at least one audio file')
      return
    }

    if (uploadType === 'youtube' && youtubeUrls.length === 0) {
      toast.error('Please add at least one YouTube link')
      return
    }

    setIsSubmitting(true)

    // Simulate upload
    setTimeout(() => {
      toast.success('Track uploaded successfully! 🎉')
      setIsSubmitting(false)

      // Reset form
      setTitle('')
      setDescription('')
      setCategory('manifestation')
      setFiles([])
      setYoutubeUrls([])
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-black">
        <div className="container mx-auto px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Upload Track</h1>
              <p className="text-white/60">Share your subliminal audio with the world</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8 max-w-4xl">
        <div className="grid gap-6">
          {/* Upload Type Selector */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Music2 className="h-5 w-5 text-purple-400" />
              Choose Upload Method
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUploadType('file')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  uploadType === 'file'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <Upload className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <p className="font-medium">Upload Audio File</p>
                <p className="text-xs text-white/60 mt-1">MP3, WAV, etc.</p>
              </button>
              <button
                onClick={() => setUploadType('youtube')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  uploadType === 'youtube'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <Music2 className="h-6 w-6 mx-auto mb-2 text-pink-400" />
                <p className="font-medium">Add YouTube Link</p>
                <p className="text-xs text-white/60 mt-1">Embed from YouTube</p>
              </button>
            </div>
          </Card>

          {/* Upload Section */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4">
              {uploadType === 'file' ? 'Upload Files' : 'Add YouTube Link'}
            </h2>
            {uploadType === 'file' ? (
              <FileUpload onFilesSelected={handleFilesSelected} />
            ) : (
              <YouTubeLink onLinkAdded={handleYoutubeLinkAdded} />
            )}
          </Card>

          {/* Track Details */}
          <Card className="bg-zinc-900 border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Track Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="e.g., Deep Sleep Healing 432Hz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your subliminal track and its benefits..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        category === cat.value
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-lg mr-2">{cat.emoji}</span>
                      <span className="text-sm">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 h-12"
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-pulse" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Publish Track
                </>
              )}
            </Button>
            <Button variant="outline" className="border-white/20 hover:bg-white/5 h-12 px-8">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
