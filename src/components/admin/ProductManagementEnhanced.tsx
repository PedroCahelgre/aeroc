'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye, 
  EyeOff,
  Save,
  X,
  RefreshCw,
  DollarSign,
  Clock,
  ChefHat,
  Image as ImageIcon
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import ImageUpload from '@/components/admin/ImageUpload'

interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  category?: {
    id: string
    name: string
  }
  image?: string
  available: boolean
  preparationTime: number
  ingredients?: string
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  active: boolean
}

export default function ProductManagementEnhanced() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    image: '',
    available: true,
    preparationTime: '15',
    ingredients: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const { hasPermission, isMasterAdmin } = useAuth()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório'
    }

    if (!formData.description.trim()) {
      errors.description = 'Descrição é obrigatória'
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Preço deve ser maior que 0'
    }

    if (!formData.categoryId) {
      errors.categoryId = 'Categoria é obrigatória'
    }

    if (!formData.preparationTime || parseInt(formData.preparationTime) <= 0) {
      errors.preparationTime = 'Tempo de preparo deve ser maior que 0'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          categoryId: formData.categoryId,
          image: formData.image || null,
          available: formData.available,
          preparationTime: parseInt(formData.preparationTime),
          ingredients: formData.ingredients || null
        })
      })

      if (response.ok) {
        fetchProducts()
        setIsCreateModalOpen(false)
        setEditingProduct(null)
        resetForm()
      } else {
        const error = await response.json()
        console.error('Error saving product:', error)
      }
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      image: '',
      available: true,
      preparationTime: '15',
      ingredients: ''
    })
    setFormErrors({})
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      categoryId: product.categoryId,
      image: product.image || '',
      available: product.available,
      preparationTime: product.preparationTime.toString(),
      ingredients: product.ingredients || ''
    })
    setIsCreateModalOpen(true)
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const toggleAvailability = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId)
      if (!product) return

      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !product.available })
      })

      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory
    const matchesAvailability = !showAvailableOnly || product.available
    
    return matchesSearch && matchesCategory && matchesAvailability
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Gestão de Produtos</h2>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
              onClick={() => {
                setEditingProduct(null)
                resetForm()
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-800 border-gray-600"
                    placeholder="Nome do produto"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="price">Preço *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="bg-gray-800 border-gray-600 pl-10"
                      placeholder="0.00"
                    />
                  </div>
                  {formErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-600"
                  placeholder="Descrição detalhada do produto"
                  rows={3}
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => setFormData({...formData, categoryId: value})}>
                    <SelectTrigger className="bg-gray-800 border-gray-600">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formErrors.categoryId && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.categoryId}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="preparationTime">Tempo de Preparo (min) *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="preparationTime"
                      type="number"
                      value={formData.preparationTime}
                      onChange={(e) => setFormData({...formData, preparationTime: e.target.value})}
                      className="bg-gray-800 border-gray-600 pl-10"
                      placeholder="15"
                    />
                  </div>
                  {formErrors.preparationTime && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.preparationTime}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="ingredients">Ingredientes</Label>
                <Textarea
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  className="bg-gray-800 border-gray-600"
                  placeholder="Lista de ingredientes (separados por vírgula)"
                  rows={2}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({...formData, image: value || ''})}
                className="col-span-1 md:col-span-2"
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({...formData, available: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="available">Produto disponível para venda</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
                  className="bg-gray-800 border-gray-600 text-gray-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? 'Atualizar' : 'Criar'} Produto
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-600 pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-gray-800 border-gray-600">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className={`bg-gray-800 border-gray-600 ${
            showAvailableOnly ? 'bg-yellow-500/20 border-yellow-500' : ''
          }`}
        >
          <Eye className="w-4 h-4 mr-2" />
          {showAvailableOnly ? 'Todos' : 'Disponíveis'}
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-gray-900 border-gray-700 overflow-hidden hover:border-gray-600 transition-colors">
            <div className="aspect-video bg-gray-800 relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-600" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge
                  variant={product.available ? "default" : "secondary"}
                  className={`${
                    product.available
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {product.available ? "Disponível" : "Indisponível"}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">{product.name}</h3>
                <span className="text-lg font-bold text-yellow-500">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {product.preparationTime}min
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-3 h-3" />
                  {product.category?.name}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Editar
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleAvailability(product.id)}
                  className={`${
                    product.available
                      ? "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                      : "bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
                  }`}
                >
                  {product.available ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou adicione novos produtos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}