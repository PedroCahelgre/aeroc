'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Novo Pedido',
      message: 'Pedido #AERO123456 recebido',
      type: 'success',
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Atualização de Sistema',
      message: 'Nova funcionalidade adicionada',
      type: 'info',
      read: true,
      createdAt: new Date().toISOString()
    }
  ])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">Central de Notificações</h2>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-red-500 text-white">
            {unreadCount} não lidas
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`bg-gray-800 border-gray-700 text-white ${!notification.read ? 'border-yellow-500' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{notification.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Marcar como lida
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString('pt-BR')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}