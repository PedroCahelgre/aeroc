'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Phone, Mail, MapPin } from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  orders: number
  totalSpent: number
}

export default function CustomerManagementEnhanced() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      // Simulação de dados de clientes
      const mockCustomers: Customer[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '(12) 99251-5171',
          address: 'Rua das Pizzas, 123',
          orders: 5,
          totalSpent: 250.00
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          phone: '(12) 98765-4321',
          orders: 3,
          totalSpent: 150.00
        }
      ]
      setCustomers(mockCustomers)
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6" />
          Gestão de Clientes
        </h2>
        <Badge className="bg-purple-500 text-white">
          {customers.length} clientes
        </Badge>
      </div>

      <div className="grid gap-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{customer.orders} pedidos</p>
                  <p className="text-lg font-bold text-green-400">R$ {customer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}