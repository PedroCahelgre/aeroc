'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Clock,
  Target,
  Award,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  BarChart,
  LineChart,
  Activity,
  Zap,
  Database,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Printer,
  Share,
  Save,
  FolderOpen,
  FileSpreadsheet,
  Megaphone
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'financial' | 'sales' | 'customers' | 'products' | 'marketing' | 'operations'
  category: string
  description: string
  createdAt: string
  lastGenerated: string
  status: 'ready' | 'generating' | 'error' | 'scheduled'
  format: 'pdf' | 'excel' | 'csv' | 'json'
  size: string
  downloads: number
  schedule?: string
  author: string
  tags: string[]
}

interface ReportTemplate {
  id: string
  name: string
  category: string
  description: string
  icon: string
  fields: Array<{
    name: string
    type: string
    required: boolean
    options?: string[]
  }>
  preview: string
}

export default function AdvancedReports() {
  const [activeTab, setActiveTab] = useState('reports')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Relatório de Vendas Mensal',
      type: 'sales',
      category: 'Vendas',
      description: 'Análise completa das vendas do mês com métricas detalhadas',
      createdAt: '2024-01-15 10:30',
      lastGenerated: '2024-01-15 14:20',
      status: 'ready',
      format: 'pdf',
      size: '2.4 MB',
      downloads: 45,
      schedule: 'Mensal',
      author: 'João Silva',
      tags: ['vendas', 'mensal', 'pdf']
    },
    {
      id: '2',
      name: 'Análise de Clientes',
      type: 'customers',
      category: 'Clientes',
      description: 'Segmentação e comportamento dos clientes',
      createdAt: '2024-01-14 09:15',
      lastGenerated: '2024-01-14 16:45',
      status: 'ready',
      format: 'excel',
      size: '1.8 MB',
      downloads: 23,
      author: 'Maria Santos',
      tags: ['clientes', 'segmentação', 'excel']
    },
    {
      id: '3',
      name: 'DRE - Demonstrativo de Resultados',
      type: 'financial',
      category: 'Financeiro',
      description: 'Relatório financeiro completo com DRE',
      createdAt: '2024-01-13 14:20',
      lastGenerated: '2024-01-13 18:30',
      status: 'generating',
      format: 'pdf',
      size: '3.1 MB',
      downloads: 67,
      schedule: 'Mensal',
      author: 'Carlos Oliveira',
      tags: ['financeiro', 'DRE', 'pdf']
    }
  ])

  const [templates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'Relatório de Vendas',
      category: 'Vendas',
      description: 'Template padrão para relatórios de vendas',
      icon: 'BarChart3',
      fields: [
        { name: 'Período', type: 'date', required: true },
        { name: 'Categoria', type: 'select', required: false, options: ['Todas', 'Pizzas', 'Bebidas', 'Sobremesas'] },
        { name: 'Formato', type: 'select', required: true, options: ['PDF', 'Excel', 'CSV'] }
      ],
      preview: 'Vendas por período, categoria e produto'
    },
    {
      id: '2',
      name: 'Análise Financeira',
      category: 'Financeiro',
      description: 'Template para relatórios financeiros',
      icon: 'DollarSign',
      fields: [
        { name: 'Período', type: 'date', required: true },
        { name: 'Tipo', type: 'select', required: true, options: ['DRE', 'Fluxo de Caixa', 'Balanço'] },
        { name: 'Detalhes', type: 'checkbox', required: false }
      ],
      preview: 'Métricas financeiras completas'
    },
    {
      id: '3',
      name: 'Relatório de Clientes',
      category: 'Clientes',
      description: 'Template para análise de clientes',
      icon: 'Users',
      fields: [
        { name: 'Segmento', type: 'select', required: false, options: ['Todos', 'VIP', 'Novos', 'Inativos'] },
        { name: 'Período', type: 'date', required: true },
        { name: 'Métricas', type: 'multiselect', required: false, options: ['Frequência', 'Ticket Médio', 'Satisfação'] }
      ],
      preview: 'Análise detalhada de clientes'
    }
  ])

  const categories = [
    { id: 'all', name: 'Todos', color: 'bg-gray-500' },
    { id: 'financial', name: 'Financeiro', color: 'bg-green-500' },
    { id: 'sales', name: 'Vendas', color: 'bg-blue-500' },
    { id: 'customers', name: 'Clientes', color: 'bg-purple-500' },
    { id: 'products', name: 'Produtos', color: 'bg-orange-500' },
    { id: 'marketing', name: 'Marketing', color: 'bg-pink-500' },
    { id: 'operations', name: 'Operações', color: 'bg-yellow-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'generating': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'scheduled': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="w-4 h-4" />
      case 'generating': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />
      case 'excel': return <FileSpreadsheet className="w-4 h-4 text-green-500" />
      case 'csv': return <FileText className="w-4 h-4 text-blue-500" />
      case 'json': return <FileText className="w-4 h-4 text-purple-500" />
      default: return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="w-5 h-5 text-green-500" />
      case 'sales': return <BarChart3 className="w-5 h-5 text-blue-500" />
      case 'customers': return <Users className="w-5 h-5 text-purple-500" />
      case 'products': return <Package className="w-5 h-5 text-orange-500" />
      case 'marketing': return <Megaphone className="w-5 h-5 text-pink-500" />
      case 'operations': return <Settings className="w-5 h-5 text-yellow-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || report.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Relatórios Avançados</h2>
          <p className="text-gray-500">Crie e gerencie relatórios detalhados do seu negócio</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Buscar relatórios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 w-64"
            />
          </div>
          
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/50 border-gray-700">
          <TabsTrigger value="reports" className="text-gray-300 hover:text-white">Meus Relatórios</TabsTrigger>
          <TabsTrigger value="templates" className="text-gray-300 hover:text-white">Templates</TabsTrigger>
          <TabsTrigger value="scheduled" className="text-gray-300 hover:text-white">Agendados</TabsTrigger>
          <TabsTrigger value="analytics" className="text-gray-300 hover:text-white">Analytics</TabsTrigger>
        </TabsList>

        {/* Meus Relatórios */}
        <TabsContent value="reports" className="space-y-6">
          {/* Filtros de Categoria */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filtrar por categoria:</span>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-800/50 border-gray-700 text-gray-300'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Lista de Relatórios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{report.name}</h3>
                        <p className="text-xs text-gray-500">{report.category}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(report.status)}
                        <span className="text-xs">
                          {report.status === 'ready' && 'Pronto'}
                          {report.status === 'generating' && 'Gerando'}
                          {report.status === 'error' && 'Erro'}
                          {report.status === 'scheduled' && 'Agendado'}
                        </span>
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{report.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      {getFormatIcon(report.format)}
                      <span>{report.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-3 h-3" />
                      <span>{report.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <p>Autor: {report.author}</p>
                      <p>Atualizado: {report.lastGenerated}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {report.tags && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-800">
                      {report.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-800/50 border-gray-700 text-gray-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{template.name}</h3>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{template.preview}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-gray-500">Campos necessários:</p>
                    {template.fields.map((field, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{field.name}</span>
                        <span className="text-gray-500">{field.type}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Agendados */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <span>Relatórios Agendados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(report => report.schedule).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                        {getTypeIcon(report.type)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{report.name}</h3>
                        <p className="text-sm text-gray-500">Agendado: {report.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="text-xs ml-1">
                          {report.status === 'ready' && 'Pronto'}
                          {report.status === 'generating' && 'Gerando'}
                          {report.status === 'error' && 'Erro'}
                          {report.status === 'scheduled' && 'Agendado'}
                        </span>
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total de Relatórios</span>
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
                <p className="text-xs text-gray-500 mt-1">Este mês</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Downloads</span>
                  <Download className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {reports.reduce((acc, report) => acc + report.downloads, 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Total</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Agendados</span>
                  <Calendar className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {reports.filter(report => report.schedule).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Ativos</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Taxa de Sucesso</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <p className="text-xs text-gray-500 mt-1">Geração</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}