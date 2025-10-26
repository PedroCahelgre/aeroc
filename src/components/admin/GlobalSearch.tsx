'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      <Input
        placeholder="Buscar pedidos, clientes, produtos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 bg-gray-900/50 border-gray-700/50 text-white placeholder-gray-500 w-80 focus:border-yellow-500/50 focus:ring-yellow-500/20"
      />
    </div>
  )
}