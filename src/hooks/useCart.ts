'use client'

import { useState, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: {
    name: string
  }
  preparationTime: number
  quantity: number
  notes: string
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Carregar carrinho do localStorage ao montar
  useEffect(() => {
    const savedCart = localStorage.getItem('aeropizza_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
        localStorage.removeItem('aeropizza_cart')
      }
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('aeropizza_cart', JSON.stringify(cart))
    } else {
      localStorage.removeItem('aeropizza_cart')
    }
  }, [cart])

  const addToCart = (product: Omit<CartItem, 'quantity' | 'notes'>) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1, notes: '' }]
    })
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }

  const updateNotes = (productId: string, notes: string) => {
    setCart(prev => 
      prev.map(item =>
        item.id === productId ? { ...item, notes } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = (deliveryType: 'DELIVERY' | 'PICKUP' = 'DELIVERY') => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const deliveryFee = deliveryType === 'DELIVERY' ? 8.00 : 0
    return subtotal + deliveryFee
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    updateQuantity,
    updateNotes,
    clearCart,
    getTotalPrice,
    getCartCount
  }
}