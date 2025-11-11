'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Music, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
}

export function FileUpload({ onFilesSelected }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.wav')
    )

    if (droppedFiles.length > 0) {
      setFiles(prev => [...prev, ...droppedFiles])
      onFilesSelected(droppedFiles)
    }
  }, [onFilesSelected])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
      onFilesSelected(selectedFiles)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-12 transition-all duration-200",
          dragActive
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/20 hover:border-white/40 bg-white/5"
        )}
      >
        <input
          type="file"
          multiple
          accept="audio/*,.mp3,.wav"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <div>
            <p className="text-lg font-medium text-white mb-1">
              Drop audio files here or click to browse
            </p>
            <p className="text-sm text-white/60">
              Supports MP3, WAV, and other audio formats
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white/80">Selected Files</h3>
          {files.map((file, index) => (
            <Card key={index} className="bg-white/5 border-white/10 p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Music className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-white/60 hover:text-white flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
