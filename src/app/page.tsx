'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Phone, Star, ShoppingCart, Calendar, Plus } from 'lucide-react'
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
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart, getCartCount } = useCart()
  const { toasts, addToast, removeToast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.slice(0, 6)) // Pegar apenas 6 produtos para os destaques
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCartAndRedirect = (product: Product) => {
    addToCart(product)
    addToast(`${product.name} adicionado ao carrinho!`, 'success')
    // Redirecionar para página de agendamento após um breve delay
    setTimeout(() => {
      window.location.href = '/agendar'
    }, 500)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Fixed Background Video for entire site */}
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

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center overflow-hidden pt-14">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-fade-in-up">
              {/* Logo Section */}
              <div className="flex items-center space-x-6">
                <div className="relative w-16 h-16">
                  {/* Golden ring effect matching logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full opacity-30 blur-lg animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-20 blur-md"></div>
                  <div className="relative w-full h-full bg-black/40 backdrop-blur-sm rounded-full border-2 border-yellow-500 flex items-center justify-center">
                    <img
                      src="https://z-cdn-media.chatglm.cn/files/909f4ebd-27a2-4328-a292-36689e519704_ChatGPT%20Image%2020_10_2025%2C%2018_45_39.png?auth_key=1792539550-13c1913589464a22920476a1039b8b9b-0-4ae7be4eab7beb51fbc6ced814ea9d7c"
                      alt="AeroPizza Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-3xl font-black text-yellow-500 tracking-tight">
                    AERO PIZZA
                  </h2>
                  <p className="text-sm font-bold text-yellow-600 tracking-widest">DESDE 2010</p>
                </div>
              </div>
              
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black leading-none drop-shadow-2xl">
                  <span className="block text-white">
                    SABOR QUE
                  </span>
                  <span className="block text-yellow-400 drop-shadow-lg">
                    VOA ATÉ
                  </span>
                  <span className="block text-white">
                    SUA CASA
                  </span>
                </h1>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                  <span className="text-lg font-bold text-yellow-400 drop-shadow-md">A melhor pizza delivery</span>
                  <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg shadow-yellow-500/50"></div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-xl text-white/95 leading-relaxed max-w-lg font-medium drop-shadow-lg bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                Experimente a combinação perfeita de ingredientes premium, massa artesanal e o serviço de delivery mais rápido. Qualidade que voa até você!
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/agendar" className="relative">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-10 py-5 text-xl font-black shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 group border-0 transform hover:scale-105"
                  >
                    <span className="flex items-center">
                      <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      FAZER PEDIDO
                      {getCartCount() > 0 && (
                        <span className="ml-2 bg-black text-yellow-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {getCartCount()}
                        </span>
                      )}
                    </span>
                  </Button>
                </Link>
                
                <Link href="/cardapio">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-black/60 backdrop-blur-sm text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-5 text-xl font-black shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 group transform hover:scale-105"
                  >
                    <span className="flex items-center">
                      <ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      VER CARDÁPIO
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-5 border border-yellow-400/50 hover:bg-black/70 hover:border-yellow-400/70 transition-all duration-300 group shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-400/30">
                      <Clock className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-yellow-400 text-base drop-shadow-md">18:00 - 23:00</p>
                      <p className="text-sm text-yellow-500 font-bold">Horário</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-5 border border-yellow-400/50 hover:bg-black/70 hover:border-yellow-400/70 transition-all duration-300 group shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-400/30">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-yellow-400 text-base drop-shadow-md">(12) 99251-5171</p>
                      <p className="text-sm text-yellow-500 font-bold">Telefone</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-5 border border-yellow-400/50 hover:bg-black/70 hover:border-yellow-400/70 transition-all duration-300 group shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-yellow-400/30">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-black text-yellow-400 text-base drop-shadow-md">ENTREGA</p>
                      <p className="text-sm text-yellow-500 font-bold">Toda região</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator positioned below all content */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 animate-bounce z-20">
          <div className="w-10 h-14 border-2 border-yellow-500 rounded-full flex justify-center bg-black/60 backdrop-blur-sm shadow-lg shadow-yellow-500/30">
            <div className="w-3 h-5 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full mt-4 animate-pulse"></div>
          </div>
          <p className="text-yellow-500 text-xs font-medium mt-2 animate-pulse">Role para baixo</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12 text-white">
              <span className="block text-yellow-500">Por que escolher</span>
              <span className="block text-white">AeroPizza?</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30 hover:bg-black/50 hover:border-yellow-500/50 transition-all duration-300 group text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-black mb-2 text-yellow-500">Qualidade Premium</h3>
                <p className="text-gray-300">Ingredientes selecionados e massa artesanal</p>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30 hover:bg-black/50 hover:border-yellow-500/50 transition-all duration-300 group text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-black mb-2 text-yellow-500">Agendamento Online</h3>
                <p className="text-gray-300">Agende seu pedido com antecedência</p>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30 hover:bg-black/50 hover:border-yellow-500/50 transition-all duration-300 group text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-black mb-2 text-yellow-500">Delivery Rápido</h3>
                <p className="text-gray-300">Entrega em até 40 minutos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-12 text-white">
              <span className="block text-yellow-500">Nossos</span>
              <span className="block text-white">Destaques</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                // Loading placeholders
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-yellow-500/30">
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
                ))
              ) : (
                products.map((product) => (
                  <div key={product.id} className="bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-yellow-500/30 hover:bg-black/50 hover:border-yellow-500/50 transition-all duration-300 group shadow-xl">
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
                    <div className="p-4">
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
                        onClick={() => handleAddToCartAndRedirect(product)}
                        disabled={!product.available}
                        className={`w-full py-3 font-bold transition-all duration-300 ${
                          product.available
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg hover:shadow-yellow-400/40 transform hover:scale-105"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {product.available ? "Pedir" : "Indisponível"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link href="/cardapio">
                <Button variant="outline" size="lg" className="bg-transparent text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg font-black shadow-xl hover:shadow-yellow-500/20 transition-all duration-300">
                  Ver Cardápio Completo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl mb-6 shadow-2xl shadow-yellow-500/30">
                <ShoppingCart className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-5xl font-black mb-4 text-white">
                <span className="block text-yellow-400 drop-shadow-lg">Faça seu pedido</span>
                <span className="block text-white drop-shadow-lg">agora!</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Peça suas pizzas favoritas com facilidade e receba no conforto da sua casa
              </p>
            </div>

            {/* Main CTA Button */}
            <div className="text-center mb-16">
              <Link href="/agendar">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-12 py-6 text-xl font-black shadow-2xl hover:shadow-yellow-400/40 transition-all duration-300 group border-0 transform hover:scale-105"
                >
                  <span className="flex items-center">
                    <ShoppingCart className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    FAZER PEDIDO AGORA
                  </span>
                </Button>
              </Link>
              <p className="mt-4 text-yellow-500 font-medium">
                Entrega em 30-40 minutos • Taxa única de R$ 8,00
              </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30">
                      <Phone className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-yellow-400 mb-3">Telefone</h3>
                    <p className="text-white text-lg font-medium mb-2">(12) 99251-5171</p>
                    <p className="text-gray-400 text-sm">Chame agora mesmo!</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30">
                      <Clock className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-yellow-400 mb-3">Horário</h3>
                    <p className="text-white text-lg font-medium mb-2">18:00 - 23:00</p>
                    <p className="text-gray-400 text-sm">Terça a Domingo</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-2xl"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30">
                      <MapPin className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-2xl font-black text-yellow-400 mb-3">Delivery</h3>
                    <p className="text-white text-lg font-medium mb-2">Prazeres e região</p>
                    <p className="text-gray-400 text-sm">Entrega rápida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-yellow-500/30">
              <h3 className="text-2xl font-black text-center text-yellow-400 mb-8">Formas de Pagamento</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-black/60 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
                    <span className="text-2xl font-black text-yellow-400">💵</span>
                  </div>
                  <p className="text-white font-medium">Dinheiro</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-black/60 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
                    <span className="text-2xl font-black text-yellow-400">💳</span>
                  </div>
                  <p className="text-white font-medium">Cartão</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-black/60 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
                    <span className="text-2xl font-black text-yellow-400">📱</span>
                  </div>
                  <p className="text-white font-medium">Pix</p>
                </div>
                <div className="text-center group">
                  <div className="w-16 h-16 bg-black/60 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
                    <span className="text-2xl font-black text-yellow-400">🏪</span>
                  </div>
                  <p className="text-white font-medium">Retirada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-md border-t border-yellow-500/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-full h-full bg-black/60 backdrop-blur-sm rounded-full border-2 border-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://z-cdn-media.chatglm.cn/files/909f4ebd-27a2-4328-a292-36689e519704_ChatGPT%20Image%2020_10_2025%2C%2018_45_39.png?auth_key=1792539550-13c1913589464a22920476a1039b8b9b-0-4ae7be4eab7beb51fbc6ced814ea9d7c"
                      alt="AeroPizza Logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-black text-yellow-400">AERO PIZZA</h3>
                  <p className="text-xs font-bold text-yellow-600 tracking-widest">DESDE 2010</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300">
                <div className="flex items-center space-x-2 group">
                  <Phone className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="hover:text-yellow-400 transition-colors">(12) 99251-5171</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Clock className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="hover:text-yellow-400 transition-colors">18:00 - 23:00</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <MapPin className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="hover:text-yellow-400 transition-colors">Prazeres e região</span>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
                <a href="#home" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Início</a>
                <span className="text-yellow-600">•</span>
                <a href="#menu" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Cardápio</a>
                <span className="text-yellow-600">•</span>
                <a href="#contact" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Contato</a>
                <span className="text-yellow-600">•</span>
                <a href="/agendar" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">Fazer Pedido</a>
              </div>
              
              {/* CTA Button */}
              <Link href="/agendar">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 font-black shadow-lg hover:shadow-yellow-400/40 transition-all duration-300 group border-0 transform hover:scale-105"
                >
                  <span className="flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    FAZER PEDIDO
                  </span>
                </Button>
              </Link>
              
              {/* Copyright */}
              <div className="pt-6 border-t border-yellow-500/20 w-full">
                <p className="text-gray-500 text-sm">
                  © 2025 AeroPizza. Desde 2010 entregando sabor que voa até você 🍕
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}