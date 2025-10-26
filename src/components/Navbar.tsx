'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Calendar, Menu, X, Phone, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cartCount, setCartCount] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isOpen = currentTime.getHours() >= 18 && currentTime.getHours() <= 23

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-black/30 backdrop-blur-3xl border-b border-yellow-500/30 shadow-2xl shadow-black/20' 
        : 'bg-black/15 backdrop-blur-2xl border-b border-yellow-500/15'
    }`}>
      {/* Multi-layer glass effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-yellow-500/10 to-black/10 backdrop-blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent backdrop-blur-lg"></div>
      
      {/* Golden shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <nav className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 transition-all duration-500 group-hover:scale-110">
              {/* Golden ring effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
              <img
                src="https://z-cdn-media.chatglm.cn/files/909f4ebd-27a2-4328-a292-36689e519704_ChatGPT%20Image%2020_10_2025%2C%2018_45_39.png?auth_key=1792539550-13c1913589464a22920476a1039b8b9b-0-4ae7be4eab7beb51fbc6ced814ea9d7c"
                alt="AeroPizza Logo"
                className="w-full h-full object-contain rounded-full relative z-10"
              />
            </div>
          </Link>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-9">
            {[
              { href: "#menu", label: "Cardápio" },
              { href: "#about", label: "Sobre" },
              { href: "#contact", label: "Contato" }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="relative text-sm font-bold text-yellow-600/90 hover:text-yellow-500 transition-all duration-300 group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-500 ease-out"></span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-yellow-600 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out blur-sm"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Admin Button - Only visible on desktop */}
            <Link href="/admin" className="hidden md:flex">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0 hover:bg-yellow-500/10 transition-all duration-300 group"
                title="Painel Administrativo"
              >
                <Settings className="w-4 h-4 text-yellow-600/80 group-hover:text-yellow-500 transition-colors" />
              </Button>
            </Link>
            
            {/* Status Badge - Desktop */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-full border border-yellow-500/30 backdrop-blur-sm">
              <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50' : 'bg-red-600'} shadow-sm`}></div>
              <span className="text-[11px] font-black text-yellow-600">
                {isOpen ? 'ABERTO' : 'FECHADO'}
              </span>
            </div>
            
            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative h-9 w-9 p-0 hover:bg-yellow-500/10 transition-all duration-300 group"
            >
              <ShoppingCart className="w-4 h-4 text-yellow-600/80 group-hover:text-yellow-500 transition-colors" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-[9px] min-w-[16px] h-4 flex items-center justify-center px-0.5 group-hover:from-red-700 group-hover:to-red-800 transition-all duration-300 shadow-lg">
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            {/* Schedule Button */}
            <Link href="/agendar">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-red-600/50 transition-all duration-300 h-9 px-4 text-[11px] font-black tracking-wider group"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                FAZER PEDIDO
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden h-9 w-9 p-0 hover:bg-yellow-500/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-yellow-600" />
              ) : (
                <Menu className="w-4 h-4 text-yellow-600" />
              )}
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-3 border-t border-yellow-500/20">
            <nav className="flex flex-col space-y-1">
              {[
                { href: "#menu", label: "Cardápio" },
                { href: "#about", label: "Sobre" },
                { href: "#contact", label: "Contato" }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="text-xs font-black text-yellow-600/90 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 py-2 px-3 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Status & Contact */}
              <div className="pt-2 mt-2 border-t border-yellow-500/20 space-y-1">
                {/* Mobile Admin Button */}
                <Link 
                  href="/admin" 
                  className="flex items-center space-x-2 px-3 py-1.5 hover:bg-yellow-500/10 rounded-md transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-black text-yellow-600">Admin</span>
                </Link>
                
                <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-yellow-500/5 to-yellow-600/5 rounded-md backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-red-600'}`}></div>
                    <span className="text-[10px] font-black text-yellow-600">
                      {isOpen ? 'ABERTO AGORA' : 'FECHADO'}
                    </span>
                  </div>
                  <span className="text-[9px] text-yellow-600/60 font-bold">18:00-23:00</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-1.5 hover:bg-yellow-500/10 rounded-md transition-all duration-300">
                  <Phone className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-black text-yellow-600">(12) 99251-5171</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}