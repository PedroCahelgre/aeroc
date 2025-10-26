'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ShoppingCart, 
  Clock, 
  Search, 
  Filter,
  Plus,
  Star,
  MapPin,
  Phone,
  ChevronLeft,
  Home
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useCart } from '@/hooks/useCart'
import { useToast, ToastContainer } from '@/hooks/useToast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: {
    name: string
  }
  preparationTime: number
  available: boolean
  ingredients?: string
}

interface Category {
  id: string
  name: string
  active: boolean
}

export default function CardapioPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)
  const { addToCart, getCartCount } = useCart()
  const { toasts, addToast, removeToast } = useToast()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    addToast(`${product.name} adicionado ao carrinho!`, 'success')
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category?.id === selectedCategory || product.categoryId === selectedCategory
    const matchesAvailability = !showAvailableOnly || product.available
    
    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Fixed Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105"
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000000'/%3E%3C/svg%3E"
        >
          <source src="https://www.pexels.com/pt-br/download/video/6176588/" type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Link href="/" className="mr-4">
                <Button variant="outline" size="sm" className="bg-black/60 backdrop-blur-sm text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <ShoppingCart className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-yellow-500">CARDÁPIO</h1>
                  <p className="text-sm text-yellow-600 font-bold">AERO PIZZA</p>
                </div>
              </div>
              <Link href="/agendar" className="ml-4">
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrinho ({getCartCount()})
                </Button>
              </Link>
            </div>
            <p className="text-white/80 text-lg">Escolha os melhores sabores para seu pedido</p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/60 backdrop-blur-sm border-yellow-400/30 text-white placeholder-gray-400 pl-10 focus:border-yellow-400/60"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-black/60 backdrop-blur-sm border-yellow-400/30 text-white">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-yellow-400/30">
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowAvailableOnly(!showAvailableOnly)}
                className={`bg-black/60 backdrop-blur-sm border-yellow-400/30 text-white hover:bg-yellow-400/20 ${
                  showAvailableOnly ? 'bg-yellow-400/20 border-yellow-400' : ''
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {showAvailableOnly ? 'Disponíveis' : 'Todos'}
              </Button>
            </div>
          </div>

          {/* Products Grid - 1:1 aspect ratio cards */}
          {loading ? (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-yellow-400/30">
                    <div className="aspect-square bg-gray-800 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-10 w-20 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-yellow-400/30 hover:bg-black/70 hover:border-yellow-400/50 transition-all duration-300 group shadow-xl">
                    {/* Product Image - 1:1 aspect ratio */}
                    <div className="aspect-square bg-gray-900 relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black/60">
                          <div className="text-6xl">🍕</div>
                        </div>
                      )}
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge
                          variant={product.available ? "default" : "secondary"}
                          className={`${
                            product.available
                              ? "bg-green-500/90 text-white border-green-400/50 font-bold text-xs"
                              : "bg-red-500/90 text-white border-red-400/50 font-bold text-xs"
                          }`}
                        >
                          {product.available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-yellow-500/90 text-black border-yellow-400/50 font-bold text-xs">
                          {product.category?.name}
                        </Badge>
                      </div>

                      {/* Price Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <div className="text-center">
                          <p className="text-2xl font-black text-yellow-400 drop-shadow-lg">
                            R$ {product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-yellow-500" />
                          <span>{product.preparationTime}min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>4.8</span>
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.available}
                        className={`w-full py-3 font-bold transition-all duration-300 ${
                          product.available
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg hover:shadow-yellow-400/40 transform hover:scale-105"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {product.available ? "Adicionar" : "Indisponível"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-black/60 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-400/30">
                    <ShoppingCart className="w-12 h-12 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-400">Tente ajustar os filtros ou buscar por outro termo</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}