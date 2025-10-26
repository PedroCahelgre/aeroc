'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Database, Download, Upload } from 'lucide-react'

export default function BackupSystem() {
  const [backingUp, setBackingUp] = useState(false)
  const [restoring, setRestoring] = useState(false)

  const handleBackup = () => {
    setBackingUp(true)
    // Simulação de backup
    setTimeout(() => {
      setBackingUp(false)
      alert('Backup realizado com sucesso!')
    }, 2000)
  }

  const handleRestore = () => {
    setRestoring(true)
    // Simulação de restore
    setTimeout(() => {
      setRestoring(false)
      alert('Restore realizado com sucesso!')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Sistema de Backup</h2>
      </div>

      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Backup e Restauração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-300">
            <p>Faça backup regular dos seus dados para evitar perdas.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleBackup}
              disabled={backingUp}
              className="bg-green-600 hover:bg-green-700"
            >
              {backingUp ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Fazer Backup
                </>
              )}
            </Button>

            <Button
              onClick={handleRestore}
              disabled={restoring}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {restoring ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Restaurar
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}