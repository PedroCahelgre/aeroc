'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (value: string | null) => void
  className?: string
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido (JPG, PNG, GIF, WebP).')
      setSuccess(null)
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.')
      setSuccess(null)
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      // Criar preview
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
        setSuccess('Imagem carregada com sucesso!')
        
        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => setSuccess(null), 3000)
      }
      reader.readAsDataURL(file)

      // Simular upload (em produção, enviaria para um servidor)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      setError('Erro ao fazer upload da imagem. Tente novamente.')
      setSuccess(null)
    } finally {
      setUploading(false)
    }
  }

  const handleUrlChange = (url: string) => {
    setPreview(url)
    onChange(url || null)
    setError(null)
    setSuccess(null)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    setError(null)
    setSuccess(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label className="text-white font-medium">Imagem do Produto</Label>
        
        {/* Preview da Imagem */}
        {preview && (
          <div className="relative group">
            <div className="relative rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upload de Arquivo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Imagem
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            Formatos: JPG, PNG, GIF, WebP. Tamanho máximo: 5MB
          </p>
        </div>

        {/* URL da Imagem */}
        <div className="space-y-2">
          <Label className="text-sm text-gray-400">Ou digite a URL da imagem:</Label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="url"
              value={preview || ''}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className="bg-gray-800 border-gray-600 text-white pl-10 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Mensagens de Feedback */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-800/50 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-green-400 text-sm">{success}</span>
          </div>
        )}
      </div>
    </div>
  )
}