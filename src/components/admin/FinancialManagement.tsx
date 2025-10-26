'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Banknote,
  Calendar,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wallet,
  Receipt,
  FileText,
  Calculator,
  PiggyBank,
  ShoppingCart,
  Users,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Zap,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Settings,
  HelpCircle,
  Bell,
  Shield,
  Database,
  Archive,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Minus
} from 'lucide-react'

interface FinancialMetrics {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  averageTicket: number
  dailyRevenue: number
  weeklyRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
}

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending' | 'cancelled'
  paymentMethod: string
  customer?: string
  order?: string
}

interface ExpenseCategory {
  name: string
  amount: number
  percentage: number
  color: string
  trend: 'up' | 'down' | 'stable'
}

export default function FinancialManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('month')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const [metrics, setMetrics] = useState<FinancialMetrics>({
    totalRevenue: 45680,
    totalExpenses: 28450,
    netProfit: 17230,
    profitMargin: 37.7,
    averageTicket: 85.50,
    dailyRevenue: 2450,
    weeklyRevenue: 17150,
    monthlyRevenue: 45680,
    yearlyRevenue: 548160
  })

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'Vendas',
      description: 'Pedido #AERO123456',
      amount: 89.90,
      date: '2024-01-15 14:30',
      status: 'completed',
      paymentMethod: 'PIX',
      customer: 'João Silva',
      order: 'AERO123456'
    },
    {
      id: '2',
      type: 'expense',
      category: 'Ingredientes',
      description: 'Compra de queijo muçarela',
      amount: 450.00,
      date: '2024-01-15 10:00',
      status: 'completed',
      paymentMethod: 'Transferência'
    },
    {
      id: '3',
      type: 'income',
      category: 'Vendas',
      description: 'Pedido #AERO123457',
      amount: 125.50,
      date: '2024-01-15 15:45',
      status: 'completed',
      paymentMethod: 'Cartão',
      customer: 'Maria Santos',
      order: 'AERO123457'
    }
  ])

  const [expenseCategories] = useState<ExpenseCategory[]>([
    { name: 'Ingredientes', amount: 12500, percentage: 44, color: 'bg-blue-500', trend: 'up' },
    { name: 'Salários', amount: 8500, percentage: 30, color: 'bg-green-500', trend: 'stable' },
    { name: 'Aluguel', amount: 3500, percentage: 12, color: 'bg-yellow-500', trend: 'stable' },
    { name: 'Marketing', amount: 2100, percentage: 7, color: 'bg-purple-500', trend: 'down' },
    { name: 'Outros', amount: 1850, percentage: 7, color: 'bg-gray-500', trend: 'up' }
  ])

  const revenueGoals = [
    { month: 'Jan', meta: 40000, atual: 45680, progress: 114 },
    { month: 'Fev', meta: 42000, atual: 38500, progress: 92 },
    { month: 'Mar', meta: 45000, atual: 0, progress: 0 }
  ]

  const cashFlow = [
    { day: 'Seg', entrada: 2800, saida: 1200, saldo: 1600 },
    { day: 'Ter', entrada: 3200, saida: 1500, saldo: 1700 },
    { day: 'Qua', entrada: 2900, saida: 1100, saldo: 1800 },
    { day: 'Qui', entrada: 3500, saida: 1800, saldo: 1700 },
    { day: 'Sex', entrada: 4200, saida: 2200, saldo: 2000 },
    { day: 'Sáb', entrada: 5100, saida: 2500, saldo: 2600 },
    { day: 'Dom', entrada: 4800, saida: 2000, saldo: 2800 }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="w-4 h-4 text-green-500" />
      case 'down': return <ArrowDownRight className="w-4 h-4 text-red-500" />
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho Financeiro */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Gestão Financeira</h2>
          <p className="text-gray-500">Controle completo das finanças do seu negócio</p>
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
          
          <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
          
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm">Receita Total</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRevenue)}</p>
            <div className="flex items-center space-x-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+12.5% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-sm">Despesas Totais</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(metrics.totalExpenses)}</p>
            <div className="flex items-center space-x-1 mt-2">
              <ArrowDownRight className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">-5.2% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">Lucro Líquido</span>
              <PiggyBank className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(metrics.netProfit)}</p>
            <div className="flex items-center space-x-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+18.7% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-400 text-sm">Margem de Lucro</span>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-white">{metrics.profitMargin}%</p>
            <div className="flex items-center space-x-1 mt-2">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500">+2.3% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900/50 border-gray-700">
          <TabsTrigger value="overview" className="text-gray-300 hover:text-white">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions" className="text-gray-300 hover:text-white">Transações</TabsTrigger>
          <TabsTrigger value="expenses" className="text-gray-300 hover:text-white">Despesas</TabsTrigger>
          <TabsTrigger value="cashflow" className="text-gray-300 hover:text-white">Fluxo de Caixa</TabsTrigger>
          <TabsTrigger value="reports" className="text-gray-300 hover:text-white">Relatórios</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Metas vs Realizado */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-yellow-500" />
                  <span>Metas vs Realizado</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{goal.month}</span>
                        <span className="text-white">
                          {formatCurrency(goal.atual)} / {formatCurrency(goal.meta)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            goal.progress >= 100 ? 'bg-green-500' : 
                            goal.progress >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(goal.progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{goal.progress}% da meta</span>
                        {goal.progress >= 100 && (
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                            Meta Atingida
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Desempenho por Categoria */}
            <Card className="bg-gray-900/50 border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-yellow-500" />
                  <span>Despesas por Categoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="text-sm text-gray-300">{category.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(category.trend)}
                          <span className="text-sm text-white">{formatCurrency(category.amount)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${category.color}`}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{category.percentage}% do total</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Indicadores de Desempenho */}
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Activity className="w-5 h-5 text-yellow-500" />
                <span>Indicadores Chave</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-400">{formatCurrency(metrics.averageTicket)}</p>
                  <p className="text-sm text-gray-400 mt-1">Ticket Médio</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-500">+8.5%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-400">R$ {metrics.dailyRevenue}</p>
                  <p className="text-sm text-gray-400 mt-1">Receita Diária Média</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-500">+15.2%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400">89%</p>
                  <p className="text-sm text-gray-400 mt-1">Taxa de Pagamento</p>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-500">+3.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transações */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Receipt className="w-5 h-5 text-yellow-500" />
                  <span>Histórico de Transações</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                      placeholder="Buscar transações..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 w-64"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-800/50 border-gray-700 text-gray-300"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Data</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Descrição</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Categoria</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Valor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-3 px-4 text-sm text-gray-300">{transaction.date}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm text-white">{transaction.description}</p>
                            {transaction.customer && (
                              <p className="text-xs text-gray-500">Cliente: {transaction.customer}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">{transaction.category}</td>
                        <td className="py-3 px-4">
                          <span className={`text-sm font-medium ${
                            transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status === 'completed' && 'Concluído'}
                            {transaction.status === 'pending' && 'Pendente'}
                            {transaction.status === 'cancelled' && 'Cancelado'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fluxo de Caixa */}
        <TabsContent value="cashflow" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-yellow-500" />
                <span>Fluxo de Caixa Semanal</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cashFlow.map((day, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{day.day}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-400">+{formatCurrency(day.entrada)}</span>
                        <span className="text-red-400">-{formatCurrency(day.saida)}</span>
                        <span className="text-white font-medium">{formatCurrency(day.saldo)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 transition-all duration-300"
                          style={{ width: `${(day.entrada / (day.entrada + day.saida)) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500 transition-all duration-300"
                          style={{ width: `${(day.saida / (day.entrada + day.saida)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Relatório de Vendas</h3>
                    <p className="text-gray-500 text-sm">Análise completa de vendas</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-gray-800/50 border-gray-700 text-gray-300">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Relatório Financeiro</h3>
                    <p className="text-gray-500 text-sm">DRE e fluxo de caixa</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-gray-800/50 border-gray-700 text-gray-300">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800/50 hover:border-gray-700/50 transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Relatório de Clientes</h3>
                    <p className="text-gray-500 text-sm">Análise de comportamento</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-gray-800/50 border-gray-700 text-gray-300">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}