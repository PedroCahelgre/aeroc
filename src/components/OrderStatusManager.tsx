'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  XCircle,
  Phone,
  MapPin
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  customerName: string
  customerPhone: string
  deliveryType: string
  deliveryAddress?: string
  finalAmount: number
  items: Array<{
    id: string
    quantity: number
    unitPrice: number
    product: {
      name: string
    }
  }>
  user?: {
    name: string
    phone: string
  }
}

const statusConfig = {
  PENDING: { 
    label: 'Pendente', 
    color: 'bg-yellow-500', 
    icon: Clock,
    nextStatus: 'CONFIRMED'
  },
  CONFIRMED: { 
    label: 'Confirmado', 
    color: 'bg-blue-500', 
    icon: CheckCircle,
    nextStatus: 'PREPARING'
  },
  PREPARING: { 
    label: 'Preparando', 
    color: 'bg-orange-500', 
    icon: Package,
    nextStatus: 'READY'
  },
  READY: { 
    label: 'Pronto', 
    color: 'bg-green-500', 
    icon: Package,
    nextStatus: 'OUT_FOR_DELIVERY'
  },
  OUT_FOR_DELIVERY: { 
    label: 'Saiu para Entrega', 
    color: 'bg-purple-500', 
    icon: Truck,
    nextStatus: 'DELIVERED'
  },
  DELIVERED: { 
    label: 'Entregue', 
    color: 'bg-green-600', 
    icon: CheckCircle,
    nextStatus: null
  },
  CANCELLED: { 
    label: 'Cancelado', 
    color: 'bg-red-500', 
    icon: XCircle,
    nextStatus: null
  }
}

export default function OrderStatusManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig]?.color || 'bg-gray-500'
  }

  const getStatusIcon = (status: string) => {
    const Icon = statusConfig[status as keyof typeof statusConfig]?.icon || Clock
    return <Icon className="w-4 h-4" />
  }

  const getStatusLabel = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig]?.label || status
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gerenciar Status dos Pedidos</h2>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-gray-800 border-gray-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span>{getStatusLabel(order.status)}</span>
                    </div>
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>R$ {order.finalAmount.toFixed(2)}</span>
                  {order.deliveryType === 'DELIVERY' ? (
                    <MapPin className="w-4 h-4" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.user?.name || order.customerName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-3 h-3" />
                      <span>{order.user?.phone || order.customerPhone}</span>
                    </div>
                    {order.deliveryAddress && (
                      <div className="flex items-start gap-2 text-sm text-gray-400 mt-1">
                        <MapPin className="w-3 h-3 mt-0.5" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {statusConfig[order.status as keyof typeof statusConfig]?.nextStatus && (
                      <Button
                        onClick={() => updateOrderStatus(order.id, statusConfig[order.status as keyof typeof statusConfig]!.nextStatus!)}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        Próximo Status
                      </Button>
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="font-medium text-gray-300 mb-1">Itens do pedido:</p>
                  {order.items.map((item, index) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span>R$ {(item.quantity * item.unitPrice).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}