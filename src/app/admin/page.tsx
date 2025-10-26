'use client'

import { useState, useEffect } from 'react'
import '@/styles/admin.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Utensils,
  XCircle,
  Printer,
  Database,
  FileText,
  Bell,
  Shield,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Eye,
  Download,
  Calendar,
  AlertTriangle,
  Zap,
  Target,
  Award,
  Star,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Menu,
  X,
  Home,
  Store,
  HeadphonesIcon,
  ChevronDown,
  UserCircle,
  Sun,
  Moon,
  Monitor,
  Mail,
  CreditCard,
  Wrench,
  HelpCircle,
  Archive,
  Trash2,
  Edit,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  PiggyBank,
  Megaphone,
  TrendingDown,
  Receipt,
  Calculator,
  BarChart
} from 'lucide-react'
import OrderStatusManager from '@/components/OrderStatusManager'
import RealTimeMetrics from '@/components/admin/RealTimeMetrics'
import EnhancedRealTimeMetrics from '@/components/admin/EnhancedRealTimeMetrics'
import SoundControl from '@/components/admin/SoundControl'
import CustomerManagement from '@/components/admin/CustomerManagementEnhanced'
import SystemSettings from '@/components/admin/SystemSettings'
import PrintSystem from '@/components/admin/PrintSystem'
import NotificationCenter from '@/components/admin/NotificationCenter'
import ProductManagement from '@/components/admin/ProductManagementEnhanced'
import GlobalSearch from '@/components/admin/GlobalSearch'
import BackupSystem from '@/components/admin/BackupSystem'
import DashboardOverview from '@/components/admin/DashboardOverview'
import FinancialManagement from '@/components/admin/FinancialManagement'
import AdvancedReports from '@/components/admin/AdvancedReports'
import AdminManagement from '@/components/admin/AdminManagement'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(3)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [user] = useState({
    name: 'Administrador',
    email: 'admin@aeropizza.com',
    role: 'Super Admin',
    avatar: '/images/admin-avatar.jpg'
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-500' },
    { id: 'financial', label: 'Financeiro', icon: PiggyBank, color: 'text-green-500' },
    { id: 'products', label: 'Produtos', icon: Package, color: 'text-green-500' },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart, color: 'text-yellow-500' },
    { id: 'customers', label: 'Clientes', icon: Users, color: 'text-purple-500' },
    { id: 'admins', label: 'Administradores', icon: Shield, color: 'text-red-500' },
    { id: 'reports', label: 'Relatórios', icon: FileText, color: 'text-orange-500' },
    { id: 'print', label: 'Impressão', icon: Printer, color: 'text-red-500' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-green-600' },
    { id: 'backup', label: 'Backup', icon: Database, color: 'text-indigo-500' },
    { id: 'settings', label: 'Configurações', icon: Settings, color: 'text-gray-500' }
  ]

  const quickStats = [
    { label: 'Receita Hoje', value: 'R$ 2.450', change: '+12%', trend: 'up', icon: DollarSign, color: 'text-green-500' },
    { label: 'Pedidos', value: '48', change: '+8%', trend: 'up', icon: ShoppingCart, color: 'text-blue-500' },
    { label: 'Clientes', value: '156', change: '+23', trend: 'up', icon: Users, color: 'text-purple-500' },
    { label: 'Taxa de Conversão', value: '12.5%', change: '+2.1%', trend: 'up', icon: Target, color: 'text-orange-500' }
  ]

  const recentActivities = [
    { id: 1, type: 'order', message: 'Novo pedido #AERO123456', time: '2 min atrás', icon: ShoppingCart, color: 'text-blue-500' },
    { id: 2, type: 'customer', message: 'Novo cliente cadastrado', time: '5 min atrás', icon: Users, color: 'text-green-500' },
    { id: 3, type: 'payment', message: 'Pagamento confirmado', time: '8 min atrás', icon: CreditCard, color: 'text-purple-500' },
    { id: 4, type: 'delivery', message: 'Pedido entregue', time: '15 min atrás', icon: Truck, color: 'text-orange-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Header Superior */}
      <header className="bg-black/90 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo e Menu Toggle */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Store className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AeroPizza Admin</h1>
                  <p className="text-xs text-gray-400">Painel de Controle v3.0</p>
                </div>
              </div>
            </div>

            {/* Barra de Pesquisa e Ações */}
            <div className="flex items-center space-x-4">
              {/* Barra de Pesquisa Global */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar pedidos, clientes, produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-900/80 border-gray-600 text-white placeholder-gray-500 w-80 focus:border-yellow-500/50 focus:ring-yellow-500/20 focus:ring-2 transition-all"
                />
              </div>

              {/* Ações Rápidas */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 relative transition-colors">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </Button>
                
                <SoundControl />
                
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  <RefreshCw className="w-5 h-5" />
                </Button>

                {/* Menu do Usuário */}
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-600">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Lateral */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-black/80 backdrop-blur-xl border-r border-gray-700 min-h-screen sticky top-16 overflow-hidden shadow-xl`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/40 text-yellow-400 shadow-lg shadow-yellow-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60 hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-yellow-400' : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Card de Status do Sistema */}
          <div className="p-4 mt-8">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-green-400 text-sm font-medium">Sistema Online</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Última atualização</span>
                    <span className="text-gray-300">{currentTime.toLocaleTimeString('pt-BR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          {/* Cabeçalho da Página */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-gray-300 text-lg">
                  {activeTab === 'dashboard' && 'Visão geral do desempenho do negócio'}
                  {activeTab === 'financial' && 'Gestão financeira completa e relatórios'}
                  {activeTab === 'products' && 'Gerencie seu catálogo de produtos'}
                  {activeTab === 'orders' && 'Acompanhe e gerencie pedidos'}
                  {activeTab === 'customers' && 'Gestão de clientes e relacionamentos'}
                  {activeTab === 'admins' && 'Gerencie administradores e permissões'}
                  {activeTab === 'reports' && 'Relatórios detalhados e analytics'}
                  {activeTab === 'print' && 'Sistema de impressão de comandas'}
                  {activeTab === 'whatsapp' && 'Comunicação com clientes'}
                  {activeTab === 'backup' && 'Segurança e backup de dados'}
                  {activeTab === 'settings' && 'Configurações do sistema'}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium shadow-lg shadow-yellow-500/20 transition-all">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo
                </Button>
              </div>
            </div>

            {/* Stats Rápidos (Apenas no Dashboard) */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {quickStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <Card key={index} className="bg-gray-900/60 border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {stat.trend === 'up' ? (
                                <ArrowUpRight className="w-3 h-3 text-green-500" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}

            {/* Atividades Recentes (Apenas no Dashboard) */}
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="bg-gray-900/60 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-yellow-500" />
                          <span>Visão Geral</span>
                        </span>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DashboardOverview />
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="bg-gray-900/60 border-gray-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-500" />
                        <span>Atividades Recentes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentActivities.map((activity) => {
                          const Icon = activity.icon
                          return (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color} bg-opacity-20`}>
                                <Icon className={`w-4 h-4 ${activity.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium">{activity.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Conteúdo das Abas */}
          <div className={activeTab !== 'dashboard' ? '' : 'hidden'}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="dashboard" className="space-y-6">
                <DashboardOverview />
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <FinancialManagement />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <ProductManagement />
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <OrderStatusManager />
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <CustomerManagement />
              </TabsContent>

              <TabsContent value="admins" className="space-y-6">
                <AdminManagement />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <AdvancedReports />
              </TabsContent>

              <TabsContent value="print" className="space-y-6">
                <PrintSystem />
              </TabsContent>

              <TabsContent value="whatsapp" className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-800/50 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      Sistema de Mensagens WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-yellow-500">Mensagens Automáticas</h3>
                        
                        <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                              <p className="font-medium text-white">Confirmação de Pedido</p>
                              <p className="text-sm text-gray-400">2 mensagens enviadas automaticamente</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Truck className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                              <p className="font-medium text-white">Saiu para Entrega</p>
                              <p className="text-sm text-gray-400">1 mensagem com informações de rastreamento</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-yellow-500">Recursos do Sistema</h3>
                        
                        <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-white">Personalização com nome do cliente</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-white">Formatação profissional com emojis</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-white">Abertura automática do WhatsApp</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backup" className="space-y-6">
                <BackupSystem />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <SystemSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}