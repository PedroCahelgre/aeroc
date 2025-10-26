'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Printer, FileText } from 'lucide-react'

export default function PrintSystem() {
  const [printing, setPrinting] = useState(false)

  const handlePrint = () => {
    setPrinting(true)
    window.print()
    setTimeout(() => setPrinting(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Printer className="w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Sistema de Impressão</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Impressão de Comandas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-300">
            <p>Sistema de impressão para comandas de cozinha e recibos.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handlePrint}
              disabled={printing}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {printing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir Comanda
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Imprimir Recibo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}