'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Users, 
  Target,
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  Bell,
  Gift,
  Star,
  Heart,
  ShoppingCart,
  Phone,
  MapPin,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Percent,
  DollarSign,
  UserPlus,
  UserMinus,
  Timer,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Megaphone,
  Bullhorn,
  AtSign,
  Hash,
  Link,
  Image,
  FileText,
  Video,
  Music,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  Share,
  Bookmark,
  Tag,
  Archive,
  Flag,
  Volume2,
  VolumeX
} from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: 'email' | 'whatsapp' | 'sms' | 'push'
  status: 'active' | 'paused' | 'draft' | 'completed'
  audience: string
  sent: number
  opened: number
  clicked: number
  converted: number
  revenue: number
  scheduledDate: string
  createdDate: string
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  status: 'active' | 'paused'
  lastRun: string
  nextRun: string
  executions: number
  successRate: number
}

interface CustomerSegment {
  id: string
  name: string
  description: string
  criteria: string[]
  customerCount: number
  avgOrderValue: number
  lastUpdated: string
}

interface Template {
  id: string
  name: string
  type: 'email' | 'whatsapp' | 'sms'
  category: string
  subject: string
  preview: string
  usageCount: number
  lastUsed: string
}

export default function MarketingAutomation() {
  const [activeTab, setActiveTab] = useState('campaigns')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Promoção de Aniversário',
      type: 'email',
      status: 'active',
      audience: 'Clientes VIP',
      sent: 234,
      opened: 187,
      clicked: 45,
      converted: 12,
      revenue: 1080,
      scheduledDate: '2024-01-15 10:00',
      createdDate: '2024-01-10 15:30'
    },
    {
      id: '2',
      name: 'Novo Cardápio',
      type: 'whatsapp',
      status: 'completed',
      audience: 'Todos os Clientes',
      sent: 1847,
      opened: 1423,
      clicked: 234,
      converted: 89,
      revenue: 7655,
      scheduledDate: '2024-01-12 18:00',
      createdDate: '2024-01-08 09:15'
    },
    {
      id: '3',
      name: 'Desconto de Fim de Semana',
      type: 'email',
      status: 'draft',
      audience: 'Clientes Inativos',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      scheduledDate: '2024-01-20 12:00',
      createdDate: '2024-01-14 16:45'
    }
  ])

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Boas-vindas Novos Clientes',
      trigger: 'Novo cadastro',
      action: 'Enviar email de boas-vindas',
      status: 'active',
      lastRun: '2024-01-15 14:30',
      nextRun: '2024-01-15 15:00',
      executions: 45,
      successRate: 95.5
    },
    {
      id: '2',
      name: 'Recuperação de Carrinho Abandonado',
      trigger: 'Carrinho abandonado há 2h',
      action: 'Enviar WhatsApp com desconto',
      status: 'active',
      lastRun: '2024-01-15 13:15',
      nextRun: '2024-01-15 15:30',
      executions: 23,
      successRate: 67.8
    },
    {
      id: '3',
      name: 'Aniversário do Cliente',
      trigger: 'Data de aniversário',
      action: 'Enviar cupom de desconto',
      status: 'paused',
      lastRun: '2024-01-14 10:00',
      nextRun: '2024-01-16 09:00',
      executions: 12,
      successRate: 89.2
    }
  ])

  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    {
      id: '1',
      name: 'Clientes VIP',
      description: 'Clientes com mais de 10 pedidos',
      criteria: ['Pedidos > 10', 'Gasto total > R$ 500'],
      customerCount: 234,
      avgOrderValue: 120.50,
      lastUpdated: '2024-01-15 10:30'
    },
    {
      id: '2',
      name: 'Clientes Inativos',
      description: 'Sem pedidos nos últimos 30 dias',
      criteria: ['Último pedido > 30 dias'],
      customerCount: 456,
      avgOrderValue: 65.30,
      lastUpdated: '2024-01-14 15:45'
    },
    {
      id: '3',
      name: 'Alto Valor',
      description: 'Ticket médio acima de R$ 100',
      criteria: ['Ticket médio > R$ 100'],
      customerCount: 123,
      avgOrderValue: 145.80,
      lastUpdated: '2024-01-13 09:20'
    }
  ])

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Email de Boas-vindas',
      type: 'email',
      category: 'Boas-vindas',
      subject: 'Bem-vindo à AeroPizza! 🍕',
      preview: 'Olá! Obrigado por se cadastrar...',
      usageCount: 234,
      lastUsed: '2024-01-15 14:30'
    },
    {
      id: '2',
      name: 'Promoção de Aniversário',
      type: 'whatsapp',
      category: 'Promoções',
      subject: 'Feliz Aniversário! 🎉',
      preview: 'Parabéns! Ganhe um desconto especial...',
      usageCount: 89,
      lastUsed: '2024-01-12 10:15'
    },
    {
      id: '3',
      name: 'Recuperação de Carrinho',
      type: 'email',
      category: 'Recuperação',
      subject: 'Seu carrinho está esperando...',
      preview: 'Olá! Notamos que você deixou itens...',
      usageCount: 156,
      lastUsed: '2024-01-14 16:45'
    }
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'paused': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'whatsapp': return <MessageCircle className="w-4 h-4" />
      case 'sms': return <Phone className="w-4 h-4" />
      case 'push': return <Bell className="w-4 h-4" />
      default: return <Send className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-500'
      case 'whatsapp': return 'text-green-500'
      case 'sms': return 'text-purple-500'
      case 'push': return 'text-orange-500'
      default: return 'text-gray-500'
    }
  }

  const calculateMetrics = (campaign: Campaign) => {
    const openRate = campaign.sent > 0 ? (campaign.opened / campaign.sent) * 100 : 0
    const clickRate = campaign.opened > 0 ? (campaign.clicked / campaign.opened) * 100 : 0
    const conversionRate = campaign.clicked > 0 ? (campaign.converted / campaign.clicked) * 100 : 0
    
    return { openRate, clickRate, conversionRate }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Automação de Marketing</h2>
          <p className="text-gray-500">Crie e gerencie campanhas automatizadas</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Buscar campanhas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 w-64"
            />
          </div>
          
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">Campanhas Ativas</span>
              <Send className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-white">8</p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+2 esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm">Taxa de Abertura</span>
              <Mail className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">68.5%</p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+5.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm">Conversões</span>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-white">234</p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+18.7%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-400 text-sm">ROI</span>
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-white">324%</p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+42.1%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/50 border-gray-700">
          <TabsTrigger value="campaigns" className="text-gray-300 hover:text-white">Campanhas</TabsTrigger>
          <TabsTrigger value="automation" className="text-gray-300 hover:text-white">Automação</TabsTrigger>
          <TabsTrigger value="segments" className="text-gray-300 hover:text-white">Segmentos</TabsTrigger>
          <TabsTrigger value="templates" className="text-gray-300 hover:text-white">Templates</TabsTrigger>
          <TabsTrigger value="analytics" className="text-gray-300 hover:text-white">Analytics</TabsTrigger>
        </TabsList>

        {/* Campanhas */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Megaphone className="w-5 h-5 text-yellow-500" />
                  <span>Campanhas Ativas</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => {
                  const metrics = calculateMetrics(campaign)
                  return (
                    <div key={campaign.id} className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(campaign.type)} bg-opacity-20`}>
                            {getTypeIcon(campaign.type)}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{campaign.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status === 'active' && 'Ativa'}
                                {campaign.status === 'paused' && 'Pausada'}
                                {campaign.status === 'draft' && 'Rascunho'}
                                {campaign.status === 'completed' && 'Concluída'}
                              </Badge>
                              <span className="text-xs text-gray-500">{campaign.audience}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Enviados</p>
                          <p className="text-white font-medium">{campaign.sent.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Abertura</p>
                          <p className="text-green-400 font-medium">{formatPercentage(metrics.openRate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Cliques</p>
                          <p className="text-blue-400 font-medium">{formatPercentage(metrics.clickRate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Conversões</p>
                          <p className="text-purple-400 font-medium">{formatPercentage(metrics.conversionRate)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Receita</p>
                          <p className="text-yellow-400 font-medium">{formatCurrency(campaign.revenue)}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automação */}
        <TabsContent value="automation" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Regras de Automação</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{rule.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(rule.status)}>
                              {rule.status === 'active' ? 'Ativa' : 'Pausada'}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {rule.executions} execuções • {formatPercentage(rule.successRate)} sucesso
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          {rule.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Gatilho:</span>
                        <span className="text-white">{rule.trigger}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Ação:</span>
                        <span className="text-white">{rule.action}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Última execução:</span>
                        <span className="text-white">{rule.lastRun}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-white">Próxima: {rule.nextRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segmentos */}
        <TabsContent value="segments" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-500" />
                  <span>Segmentos de Clientes</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Segmento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customerSegments.map((segment) => (
                  <Card key={segment.id} className="bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium">{segment.name}</h3>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {segment.customerCount} clientes
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{segment.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Ticket Médio</span>
                          <span className="text-white">{formatCurrency(segment.avgOrderValue)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Atualizado</span>
                          <span className="text-white">{segment.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <div className="flex flex-wrap gap-1">
                          {segment.criteria.map((criterion, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-gray-800/50 border-gray-600 text-gray-300">
                              {criterion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-yellow-500" />
                  <span>Templates de Mensagem</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(template.type)} bg-opacity-20`}>
                          {getTypeIcon(template.type)}
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{template.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                              {template.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Usado {template.usageCount} vezes
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        <span className="text-gray-500">Assunto:</span> {template.subject}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Preview:</span> {template.preview}
                      </p>
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
                  <span className="text-gray-400 text-sm">Email Marketing</span>
                  <Mail className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-white">68.5%</p>
                <p className="text-xs text-gray-500 mt-1">Taxa de abertura</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">WhatsApp</span>
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-white">45.2%</p>
                <p className="text-xs text-gray-500 mt-1">Taxa de resposta</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Conversão Total</span>
                  <Target className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-white">12.3%</p>
                <p className="text-xs text-gray-500 mt-1">Taxa de conversão</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">ROI</span>
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-white">324%</p>
                <p className="text-xs text-gray-500 mt-1">Retorno sobre investimento</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}