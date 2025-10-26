'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart,
  Clock,
  MapPin,
  Star,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  DollarSign,
  Package,
  Truck,
  Heart,
  MessageCircle,
  ThumbsUp,
  UserPlus,
  UserMinus,
  Timer,
  TrendingUp as TrendIcon,
  Hash,
  Percent,
  Globe,
  Smartphone,
  Laptop,
  Monitor
} from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  newUsers: number
  returningUsers: number
  conversionRate: number
  averageOrderValue: number
  totalOrders: number
  completedOrders: number
  cancelledOrders: number
  averageDeliveryTime: number
  customerSatisfaction: number
  popularProducts: Array<{
    name: string
    orders: number
    revenue: number
    rating: number
  }>
  peakHours: Array<{
    hour: number
    orders: number
    revenue: number
  }>
  customerSegments: Array<{
    segment: string
    count: number
    percentage: number
    avgOrderValue: number
  }>
  deviceStats: Array<{
    device: string
    count: number
    percentage: number
  }>
  locationStats: Array<{
    neighborhood: string
    orders: number
    revenue: number
    avgDeliveryTime: number
  }>
}

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [isLoading, setIsLoading] = useState(false)

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 2847,
    activeUsers: 1823,
    newUsers: 342,
    returningUsers: 1481,
    conversionRate: 12.5,
    averageOrderValue: 85.50,
    totalOrders: 1234,
    completedOrders: 1156,
    cancelledOrders: 78,
    averageDeliveryTime: 32,
    customerSatisfaction: 4.7,
    popularProducts: [
      { name: 'Pizza Suprema', orders: 234, revenue: 5850, rating: 4.8 },
      { name: 'Pizza Calabresa', orders: 198, revenue: 4356, rating: 4.6 },
      { name: 'Pizza Margherita', orders: 167, revenue: 3674, rating: 4.7 },
      { name: 'Pizza Portuguesa', orders: 145, revenue: 3190, rating: 4.5 },
      { name: 'Pizza Frango', orders: 132, revenue: 2904, rating: 4.6 }
    ],
    peakHours: [
      { hour: 12, orders: 45, revenue: 3847 },
      { hour: 13, orders: 67, revenue: 5729 },
      { hour: 18, orders: 89, revenue: 7616 },
      { hour: 19, orders: 124, revenue: 10604 },
      { hour: 20, orders: 98, revenue: 8372 },
      { hour: 21, orders: 76, revenue: 6496 }
    ],
    customerSegments: [
      { segment: 'Clientes VIP', count: 234, percentage: 28, avgOrderValue: 120.50 },
      { segment: 'Clientes Regulares', count: 456, percentage: 55, avgOrderValue: 85.00 },
      { segment: 'Novos Clientes', count: 142, percentage: 17, avgOrderValue: 65.30 }
    ],
    deviceStats: [
      { device: 'Mobile', count: 1823, percentage: 64 },
      { device: 'Desktop', count: 712, percentage: 25 },
      { device: 'Tablet', count: 312, percentage: 11 }
    ],
    locationStats: [
      { neighborhood: 'Centro', orders: 423, revenue: 36155, avgDeliveryTime: 25 },
      { neighborhood: 'Jardins', orders: 312, revenue: 26676, avgDeliveryTime: 30 },
      { neighborhood: 'Vila Nova', orders: 287, revenue: 24561, avgDeliveryTime: 35 },
      { neighborhood: 'Boa Vista', orders: 212, revenue: 18128, avgDeliveryTime: 40 }
    ]
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', value: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center space-x-1 text-green-500">
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-sm">+{value}%</span>
        </div>
      )
    } else if (trend === 'down') {
      return (
        <div className="flex items-center space-x-1 text-red-500">
          <ArrowDownRight className="w-4 h-4" />
          <span className="text-sm">-{value}%</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center space-x-1 text-gray-500">
          <Minus className="w-4 h-4" />
          <span className="text-sm">0%</span>
        </div>
      )
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="w-4 h-4" />
      case 'Desktop': return <Monitor className="w-4 h-4" />
      case 'Tablet': return <Laptop className="w-4 h-4" />
      default: return <Globe className="w-4 h-4" />
    }
  }

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Clientes VIP': return 'bg-purple-500/20 text-purple-400 border-purple-500/20'
      case 'Clientes Regulares': return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
      case 'Novos Clientes': return 'bg-green-500/20 text-green-400 border-green-500/20'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Analytics Avançado</h2>
          <p className="text-gray-500">Insights detalhados para tomada de decisão</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg p-1">
            {['day', 'week', 'month', 'year'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={`${
                  timeRange === range 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range === 'day' && 'Dia'}
                {range === 'week' && 'Semana'}
                {range === 'month' && 'Mês'}
                {range === 'year' && 'Ano'}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-gray-800/50 border-gray-700 text-gray-300"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">Usuários Ativos</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-white">{analyticsData.activeUsers.toLocaleString()}</p>
            {getTrendIcon('up', 12.5)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm">Taxa de Conversão</span>
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatPercentage(analyticsData.conversionRate)}</p>
            {getTrendIcon('up', 2.3)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm">Ticket Médio</span>
              <DollarSign className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(analyticsData.averageOrderValue)}</p>
            {getTrendIcon('up', 8.7)}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-400 text-sm">Satisfação</span>
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-white">{analyticsData.customerSatisfaction.toFixed(1)}</p>
            {getTrendIcon('up', 0.3)}
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Análise */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/50 border-gray-700">
          <TabsTrigger value="overview" className="text-gray-300 hover:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="products" className="text-gray-300 hover:text-white">Produtos</TabsTrigger>
          <TabsTrigger value="customers" className="text-gray-300 hover:text-white">Clientes</TabsTrigger>
          <TabsTrigger value="behavior" className="text-gray-300 hover:text-white">Comportamento</TabsTrigger>
          <TabsTrigger value="location" className="text-gray-300 hover:text-white">Localização</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Horários de Pico */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span>Horários de Pico</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.peakHours.map((hour, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{hour.hour}:00</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{hour.orders} pedidos</span>
                          <span className="text-green-400">{formatCurrency(hour.revenue)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(hour.orders / Math.max(...analyticsData.peakHours.map(h => h.orders))) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dispositivos */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-yellow-500" />
                  <span>Acesso por Dispositivo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.deviceStats.map((device, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getDeviceIcon(device.device)}
                          <span className="text-sm text-gray-300">{device.device}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white">{device.count.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">{formatPercentage(device.percentage)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* KPIs Avançados */}
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-yellow-500" />
                <span>Indicadores Chave de Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">{analyticsData.totalOrders}</p>
                  <p className="text-sm text-gray-400 mt-1">Total de Pedidos</p>
                  {getTrendIcon('up', 15.2)}
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">{formatPercentage((analyticsData.completedOrders / analyticsData.totalOrders) * 100)}</p>
                  <p className="text-sm text-gray-400 mt-1">Taxa de Conclusão</p>
                  {getTrendIcon('up', 3.8)}
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-400">{analyticsData.averageDeliveryTime} min</p>
                  <p className="text-sm text-gray-400 mt-1">Tempo Médio de Entrega</p>
                  {getTrendIcon('down', 5.2)}
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-400">{analyticsData.newUsers}</p>
                  <p className="text-sm text-gray-400 mt-1">Novos Clientes</p>
                  {getTrendIcon('up', 22.1)}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Produtos */}
        <TabsContent value="products" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Package className="w-5 h-5 text-yellow-500" />
                <span>Produtos Mais Populares</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.popularProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{product.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-gray-400">{product.rating}</span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{product.orders} pedidos</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(product.revenue)}</p>
                      <p className="text-xs text-gray-400">receita total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clientes */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Segmentos de Clientes */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-yellow-500" />
                  <span>Segmentos de Clientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.customerSegments.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSegmentColor(segment.segment)}>
                            {segment.segment}
                          </Badge>
                          <span className="text-sm text-gray-400">{segment.count} clientes</span>
                        </div>
                        <span className="text-sm text-white">{formatPercentage(segment.percentage)}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Ticket médio: {formatCurrency(segment.avgOrderValue)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métricas de Clientes */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-yellow-500" />
                  <span>Métricas de Clientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total de Clientes</span>
                    <span className="text-white font-medium">{analyticsData.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Clientes Ativos</span>
                    <span className="text-green-400 font-medium">{analyticsData.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Novos Clientes</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400 font-medium">{analyticsData.newUsers}</span>
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        +{formatPercentage((analyticsData.newUsers / analyticsData.totalUsers) * 100)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Clientes Recorrentes</span>
                    <span className="text-purple-400 font-medium">{analyticsData.returningUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Taxa de Retenção</span>
                    <span className="text-green-400 font-medium">
                      {formatPercentage((analyticsData.returningUsers / analyticsData.activeUsers) * 100)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comportamento */}
        <TabsContent value="behavior" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-yellow-500" />
                <span>Análise de Comportamento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">4m 32s</p>
                  <p className="text-sm text-gray-400 mt-1">Tempo Médio no Site</p>
                </div>
                
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">68%</p>
                  <p className="text-sm text-gray-400 mt-1">Taxa de Carrinho</p>
                </div>
                
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">234</p>
                  <p className="text-sm text-gray-400 mt-1">Interações WhatsApp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localização */}
        <TabsContent value="location" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-yellow-500" />
                <span>Análise por Localização</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.locationStats.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{location.neighborhood}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">{location.orders} pedidos</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{location.avgDeliveryTime} min entrega</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{formatCurrency(location.revenue)}</p>
                      <p className="text-xs text-gray-400">receita total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}