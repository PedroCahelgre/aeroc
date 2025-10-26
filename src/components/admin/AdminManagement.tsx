'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Shield,
  Key,
  Mail,
  User,
  Save,
  X,
  RefreshCw,
  Crown,
  UserCheck,
  UserX,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Admin {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'MANAGER'
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    email: string
    name?: string
    role: string
  }
}

export default function AdminManagement() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN' as 'ADMIN' | 'MANAGER'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const { isMasterAdmin, admin: currentAdmin } = useAuth()

  useEffect(() => {
    if (isMasterAdmin()) {
      fetchAdmins()
    }
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/admins')
      if (response.ok) {
        const data = await response.json()
        setAdmins(data)
      }
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido'
    }

    if (!editingAdmin && !formData.password.trim()) {
      errors.password = 'Senha é obrigatória'
    } else if (!editingAdmin && formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      const url = editingAdmin 
        ? `/api/admin/admins/${editingAdmin.id}`
        : '/api/admin/admins'
      
      const method = editingAdmin ? 'PUT' : 'POST'
      
      const payload: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      }

      if (!editingAdmin) {
        payload.password = formData.password
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        fetchAdmins()
        setShowCreateModal(false)
        setEditingAdmin(null)
        resetForm()
      } else {
        const error = await response.json()
        console.error('Error saving admin:', error)
        setFormErrors({ email: error.error || 'Erro ao salvar administrador' })
      }
    } catch (error) {
      console.error('Error saving admin:', error)
      setFormErrors({ email: 'Erro de conexão' })
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'ADMIN'
    })
    setFormErrors({})
    setShowPassword(false)
  }

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '',
      role: admin.role
    })
    setShowCreateModal(true)
  }

  const handleDelete = async (adminId: string) => {
    if (!confirm('Tem certeza que deseja remover este administrador?')) return

    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchAdmins()
      }
    } catch (error) {
      console.error('Error deleting admin:', error)
    }
  }

  const toggleAdminStatus = async (adminId: string, activate: boolean) => {
    try {
      const response = await fetch(`/api/admin/admins/${adminId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: activate })
      })

      if (response.ok) {
        fetchAdmins()
      }
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isMasterAdmin()) {
    return (
      <Card className="bg-red-500/10 border-red-500/20">
        <CardContent className="p-6 text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-red-400 text-lg font-semibold mb-2">Acesso Restrito</h3>
          <p className="text-gray-400">
            Apenas o administrador master pode acessar esta área.
          </p>
        </CardContent>
      </Card>
    )
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Gestão de Administradores</h2>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/20">
            Master Admin
          </Badge>
        </div>
        
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
              onClick={() => {
                setEditingAdmin(null)
                resetForm()
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Administrador
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                {editingAdmin ? 'Editar Administrador' : 'Novo Administrador'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-800 border-gray-600 pl-10"
                    placeholder="Nome do administrador"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-gray-800 border-gray-600 pl-10"
                    placeholder="email@exemplo.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              {!editingAdmin && (
                <div>
                  <Label htmlFor="password">Senha *</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-gray-800 border-gray-600 pl-10 pr-10"
                      placeholder="Mínimo 6 caracteres"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {formErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="role">Nível de Acesso *</Label>
                <Select value={formData.role} onValueChange={(value: 'ADMIN' | 'MANAGER') => setFormData({...formData, role: value})}>
                  <SelectTrigger className="bg-gray-800 border-gray-600">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="ADMIN">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Administrador
                      </div>
                    </SelectItem>
                    <SelectItem value="MANAGER">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        Gerente
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Permissões por nível:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-yellow-500" />
                    <span className="text-gray-300">Administrador: Acesso completo ao sistema</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3 h-3 text-blue-500" />
                    <span className="text-gray-300">Gerente: Gestão de produtos e pedidos</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingAdmin(null)
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
                  {editingAdmin ? 'Atualizar' : 'Criar'} Administrador
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <Input
          placeholder="Buscar administradores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-600 pl-10"
        />
      </div>

      {/* Admins List */}
      <div className="grid gap-4">
        {filteredAdmins.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700 text-center py-8">
            <CardContent>
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                {searchQuery ? 'Nenhum administrador encontrado' : 'Nenhum administrador cadastrado'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAdmins.map((admin) => (
            <Card key={admin.id} className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {admin.name}
                        {admin.email === 'comerciochalegre@gmail.com' && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/20">
                            <Crown className="w-3 h-3 mr-1" />
                            Master
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-gray-400 text-sm">{admin.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={
                      admin.role === 'ADMIN' 
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/20'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/20'
                    }>
                      {admin.role === 'ADMIN' ? (
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Administrador
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          Gerente
                        </div>
                      )}
                    </Badge>
                    
                    {admin.email !== 'comerciochalegre@gmail.com' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleEdit(admin)}
                          variant="outline"
                          className="bg-gray-700 border-gray-600 text-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => handleDelete(admin.id)}
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Criado em: {new Date(admin.createdAt).toLocaleDateString('pt-BR')}</span>
                  <span>Atualizado em: {new Date(admin.updatedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-blue-500/10 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h4 className="text-blue-400 font-medium mb-1">Informações Importantes</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Como Master Admin, você tem controle total sobre o sistema</li>
                <li>• Administradores têm acesso a todas as funcionalidades</li>
                <li>• Gerentes podem gerenciar produtos e pedidos</li>
                <li>• A conta Master (comerciochalegre@gmail.com) não pode ser removida</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}