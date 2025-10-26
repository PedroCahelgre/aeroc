'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Save } from 'lucide-react'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    restaurantName: 'AeroPizza',
    phone: '(12) 99251-5171',
    address: 'Rua das Pizzas, 123',
    deliveryFee: 8.00,
    deliveryTime: '30-40'
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulação de salvamento
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Configurações do Sistema</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Informações do Restaurante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="restaurantName">Nome do Restaurante</Label>
            <Input
              id="restaurantName"
              value={settings.restaurantName}
              onChange={(e) => setSettings({...settings, restaurantName: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => setSettings({...settings, phone: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => setSettings({...settings, address: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryFee">Taxa de Entrega</Label>
              <Input
                id="deliveryFee"
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({...settings, deliveryFee: parseFloat(e.target.value)})}
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="deliveryTime">Tempo de Entrega</Label>
              <Input
                id="deliveryTime"
                value={settings.deliveryTime}
                onChange={(e) => setSettings({...settings, deliveryTime: e.target.value})}
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}