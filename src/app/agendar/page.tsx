'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Phone, Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'

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

export default function FazerPedidoPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const { cart, addToCart, updateQuantity, updateNotes, clearCart, getTotalPrice, getCartCount } = useCart()
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    deliveryType: 'DELIVERY',
    paymentMethod: 'CASH',
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
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

  const sendOrderToWhatsApp = async () => {
    const phoneNumber = '5512992515171'; // Número com código do país
    const totalPrice = getTotalPrice(orderData.deliveryType);
    
    try {
      // Formatar mensagem do pedido
      let message = `*NOVO PEDIDO - AERO PIZZA*\n\n`;
      message += `*Data:* ${new Date().toLocaleDateString('pt-BR')}\n`;
      message += `*Horário:* ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
      
      message += `*Dados do Cliente:*\n`;
      message += `*Nome:* ${orderData.customerName}\n`;
      message += `*Telefone:* ${orderData.customerPhone}\n`;
      message += `*Email:* ${orderData.customerEmail}\n`;
      
      if (orderData.deliveryType === 'DELIVERY') {
        message += `*Endereço de Entrega:* ${orderData.deliveryAddress}\n`;
        message += `*Tipo:* Delivery (Taxa: R$ 8,00)\n`;
      } else {
        message += `*Tipo:* Retirada no local\n`;
      }
      
      message += `\n*Forma de Pagamento:* ${getPaymentMethodText(orderData.paymentMethod)}\n`;
      
      // Se for PIX, buscar e adicionar informações PIX
      if (orderData.paymentMethod === 'PIX') {
        try {
          const pixResponse = await fetch('/api/admin/pix');
          if (pixResponse.ok) {
            const pixData = await pixResponse.json();
            message += `\n*DADOS PARA PAGAMENTO PIX:*\n`;
            message += `*Chave PIX:* ${pixData.pixKey}\n`;
            message += `*Tipo:* ${pixData.pixType}\n`;
            message += `*Destinatário:* ${pixData.recipient}\n\n`;
            message += `*IMPORTANTE:* Faça o pagamento e envie o comprovante para confirmarmos seu pedido.\n\n`;
          } else {
            message += `\n*DADOS PIX:* Entre em contato para obter as informações.\n\n`;
          }
        } catch (error) {
          console.error('Erro ao buscar dados PIX:', error);
          message += `\n*DADOS PIX:* Entre em contato para obter as informações.\n\n`;
        }
      }
      
      message += `*Itens do Pedido:*\n`;
      cart.forEach((item, index) => {
        message += `\n${index + 1}. *${item.name}* x${item.quantity}\n`;
        message += `   Valor: R$ ${item.price.toFixed(2)} cada = R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        if (item.notes) {
          message += `   Obs: ${item.notes}\n`;
        }
      });
      
      message += `\n*Resumo do Valor:*\n`;
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
      if (orderData.deliveryType === 'DELIVERY') {
        message += `Taxa de Delivery: R$ 8,00\n`;
      }
      message += `*TOTAL: R$ ${totalPrice.toFixed(2)}*\n\n`;
      
      if (orderData.notes) {
        message += `*Observações Gerais:* ${orderData.notes}\n\n`;
      }
      
      message += `*Região de Atendimento:* Prazeres e região\n`;
      message += `*Tempo estimado de entrega:* 30-40 minutos\n\n`;
      message += `*Pedido confirmado! Aguardamos seu contato.*`;
      
      // Codificar mensagem para URL
      const encodedMessage = encodeURIComponent(message);
      
      // Abrir WhatsApp em nova aba
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      console.log('WhatsApp aberto com sucesso:', whatsappUrl);
      
    } catch (error) {
      console.error('Erro ao enviar para WhatsApp:', error);
      
      // Fallback: abrir WhatsApp sem mensagem pré-preenchida
      const fallbackUrl = `https://wa.me/${phoneNumber}`;
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
      
      alert('Ocorreu um erro ao preparar a mensagem. Abrindo WhatsApp para você enviar o pedido manualmente.');
    }
  }

  const getPaymentMethodText = (method: string) => {
    const methods = {
      'CASH': 'Dinheiro',
      'CREDIT_CARD': 'Cartão de Crédito',
      'DEBIT_CARD': 'Cartão de Débito',
      'PIX': 'Pix'
    };
    return methods[method] || method;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (getCartCount() === 0) {
      alert('Adicione itens ao carrinho')
      return
    }

    setSubmitting(true)

    try {
      // First create or get user
      const userResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          address: orderData.deliveryAddress
        })
      })

      if (!userResponse.ok) {
        throw new Error('Failed to create user')
      }

      const user = await userResponse.json()

      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
            notes: item.notes
          })),
          deliveryType: orderData.deliveryType,
          paymentMethod: orderData.paymentMethod,
          deliveryAddress: orderData.deliveryAddress,
          customerPhone: orderData.customerPhone,
          notes: orderData.notes
        })
      })

      if (orderResponse.ok) {
        const order = await orderResponse.json()
        console.log('Pedido criado com sucesso:', order.orderNumber)
        
        // Sempre enviar para o WhatsApp após criar o pedido
        await sendOrderToWhatsApp();
        
        // Limpar formulário após sucesso
        clearCart()
        setOrderData({
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          deliveryAddress: '',
          deliveryType: 'DELIVERY',
          paymentMethod: 'CASH',
          notes: ''
        })

        // Mostrar mensagem de sucesso
        alert(`Pedido #${order.orderNumber} realizado com sucesso! Redirecionando para o WhatsApp...`)
        
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Erro ao fazer pedido. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const categories = Array.from(new Set(products.map(p => p.category.name)))

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category.name === selectedCategory)

  return (
    <div className="min-h-screen">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/40 backdrop-blur-md border-b border-yellow-500/30 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full opacity-30 blur-lg animate-pulse"></div>
                <div className="relative w-full h-full bg-black/40 backdrop-blur-sm rounded-full border-2 border-yellow-500 flex items-center justify-center">
                  <img
                    src="https://z-cdn-media.chatglm.cn/files/909f4ebd-27a2-4328-a292-36689e519704_ChatGPT%20Image%2020_10_2025%2C%2018_45_39.png?auth_key=1792539550-13c1913589464a22920476a1039b8b9b-0-4ae7be4eab7beb51fbc6ced814ea9d7c"
                    alt="AeroPizza Logo"
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black text-yellow-500 tracking-tight">AERO PIZZA</h1>
                <p className="text-xs font-bold text-yellow-600 tracking-widest">DESDE 2010</p>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-yellow-500 transition font-medium">Início</Link>
              <Link href="/admin" className="text-white hover:text-yellow-500 transition font-medium">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-4xl font-black mb-6 text-white drop-shadow-lg">
                <span className="block text-yellow-400">Cardápio</span>
                <span className="block text-white">Completo</span>
              </h2>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                  className={`mb-2 px-6 py-3 text-base font-black ${selectedCategory === 'all' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg shadow-yellow-400/30' : 'bg-black/60 backdrop-blur-sm text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg shadow-yellow-400/20'}`}
                >
                  Todos
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={`mb-2 px-6 py-3 text-base font-black ${selectedCategory === category ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black shadow-lg shadow-yellow-400/30' : 'bg-black/60 backdrop-blur-sm text-yellow-400 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg shadow-yellow-400/20'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12 text-white text-xl font-medium bg-black/60 backdrop-blur-sm rounded-xl border border-yellow-400/30">Carregando...</div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="bg-black/60 backdrop-blur-md border border-yellow-400/40 hover:bg-black/70 hover:border-yellow-400/60 transition-all duration-300 overflow-hidden group shadow-xl">
                      <div className="h-48 bg-gray-900">
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
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-black text-xl text-white drop-shadow-md">{product.name}</h3>
                          <Badge className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 font-black text-sm"> {product.category.name}</Badge>
                        </div>
                        <p className="text-gray-200 text-base mb-4 leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-yellow-400 drop-shadow-md">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black px-4 py-2 shadow-lg hover:shadow-yellow-400/40 transform hover:scale-105 transition-all duration-300"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                        <div className="flex items-center mt-3 text-sm text-yellow-500 font-medium">
                          <Clock className="w-4 h-4 mr-2" />
                          {product.preparationTime} min
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cart and Order Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Cart */}
              <Card className="mb-6 bg-black/40 backdrop-blur-md border border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-500 font-black">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Carrinho ({getCartCount()} itens)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getCartCount() === 0 ? (
                    <p className="text-gray-400 text-center py-4">Carrinho vazio</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="border-b border-yellow-500/20 pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-white">{item.name}</h4>
                            <span className="font-black text-yellow-500">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-transparent text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-white font-black">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-transparent text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Input
                            placeholder="Observações"
                            value={item.notes}
                            onChange={(e) => updateNotes(item.id, e.target.value)}
                            className="text-sm bg-black/40 border-yellow-400/30 text-white placeholder:text-gray-400 hover:bg-black/60 hover:border-yellow-400/50"
                          />
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-yellow-500/20">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Subtotal:</span>
                          <span className="text-white">R$ {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                        </div>
                        {orderData.deliveryType === 'DELIVERY' && (
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-300">Taxa de entrega:</span>
                            <span className="text-white">R$ 8.00</span>
                          </div>
                        )}
                        <div className="flex justify-between font-black text-lg">
                          <span className="text-white">Total:</span>
                          <span className="text-yellow-500">R$ {getTotalPrice().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Form */}
              {cart.length > 0 && (
                <Card className="bg-black/40 backdrop-blur-md border border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-500 font-black">Finalizar Pedido</CardTitle>
                    <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
                      <p className="text-yellow-400 text-sm font-medium flex items-center">
                        <span className="mr-2">📱</span>
                        Ao finalizar, você será redirecionado automaticamente para o WhatsApp para confirmar seu pedido.
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="customerName" className="text-yellow-500 font-black">Nome *</Label>
                        <Input
                          id="customerName"
                          value={orderData.customerName}
                          onChange={(e) => setOrderData({...orderData, customerName: e.target.value})}
                          required
                          className="bg-black/40 border-yellow-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerPhone" className="text-yellow-500 font-black">Telefone *</Label>
                        <Input
                          id="customerPhone"
                          value={orderData.customerPhone}
                          onChange={(e) => setOrderData({...orderData, customerPhone: e.target.value})}
                          required
                          className="bg-black/40 border-yellow-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerEmail" className="text-yellow-500 font-black">E-mail</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={orderData.customerEmail}
                          onChange={(e) => setOrderData({...orderData, customerEmail: e.target.value})}
                          className="bg-black/40 border-yellow-500/30 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <Label className="text-yellow-400 font-black text-base">Tipo de Entrega *</Label>
                        <RadioGroup
                          value={orderData.deliveryType}
                          onValueChange={(value) => setOrderData({...orderData, deliveryType: value})}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-3 p-3 bg-black/40 rounded-lg border border-yellow-400/30 hover:bg-black/60 hover:border-yellow-400/50 transition-all">
                            <RadioGroupItem value="DELIVERY" id="delivery" className="text-yellow-400 border-yellow-400" />
                            <Label htmlFor="delivery" className="text-white font-medium cursor-pointer">Delivery (+R$ 8,00)</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-black/40 rounded-lg border border-yellow-400/30 hover:bg-black/60 hover:border-yellow-400/50 transition-all mt-2">
                            <RadioGroupItem value="PICKUP" id="pickup" className="text-yellow-400 border-yellow-400" />
                            <Label htmlFor="pickup" className="text-white font-medium cursor-pointer">Retirar no local</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {orderData.deliveryType === 'DELIVERY' && (
                        <div>
                          <Label htmlFor="deliveryAddress" className="text-yellow-400 font-black text-base">Endereço de Entrega *</Label>
                          <Textarea
                            id="deliveryAddress"
                            value={orderData.deliveryAddress}
                            onChange={(e) => setOrderData({...orderData, deliveryAddress: e.target.value})}
                            required
                            className="mt-2 bg-black/40 border-yellow-400/30 text-white placeholder:text-gray-400 min-h-[100px]"
                            placeholder="Digite seu endereço completo..."
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="paymentMethod" className="text-yellow-400 font-black text-base">Forma de Pagamento *</Label>
                        <Select
                          value={orderData.paymentMethod}
                          onValueChange={(value) => setOrderData({...orderData, paymentMethod: value})}
                        >
                          <SelectTrigger className="mt-2 bg-black/40 border-yellow-400/30 text-white hover:bg-black/60 hover:border-yellow-400/50">
                            <SelectValue placeholder="Selecione a forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-yellow-400/30">
                            <SelectItem value="CASH" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20 hover:text-yellow-400 focus:text-yellow-400 transition-colors">Dinheiro</SelectItem>
                            <SelectItem value="CREDIT_CARD" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20 hover:text-yellow-400 focus:text-yellow-400 transition-colors">Cartão de Crédito</SelectItem>
                            <SelectItem value="DEBIT_CARD" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20 hover:text-yellow-400 focus:text-yellow-400 transition-colors">Cartão de Débito</SelectItem>
                            <SelectItem value="PIX" className="text-white hover:bg-yellow-400/20 focus:bg-yellow-400/20 hover:text-yellow-400 focus:text-yellow-400 transition-colors">Pix</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-black/40 rounded-lg p-4 border border-yellow-400/30">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-6 h-6 text-yellow-400" />
                          <div>
                            <p className="text-yellow-400 font-black text-base">Tempo de Entrega</p>
                            <p className="text-white font-medium">30 a 40 minutos</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-yellow-400 font-black text-base">Observações</Label>
                        <Textarea
                          id="notes"
                          value={orderData.notes}
                          onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                          className="mt-2 bg-black/40 border-yellow-400/30 text-white placeholder:text-gray-400 min-h-[80px]"
                          placeholder="Alguma observação especial?"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-black text-lg py-4 shadow-2xl hover:shadow-yellow-400/40 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Processando pedido...</span>
                          </>
                        ) : (
                          <>
                            <span>Fazer Pedido</span>
                            <span className="text-sm opacity-75">(abrirá WhatsApp)</span>
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}