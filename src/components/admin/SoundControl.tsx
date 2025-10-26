'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'

export default function SoundControl() {
  const [isMuted, setIsMuted] = useState(false)

  const toggleSound = () => {
    setIsMuted(!isMuted)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSound}
      className="text-gray-400 hover:text-white hover:bg-gray-800"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </Button>
  )
}