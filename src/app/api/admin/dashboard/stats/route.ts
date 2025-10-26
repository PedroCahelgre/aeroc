import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // Buscar estatísticas do banco de dados
    const [
      totalOrdersResult,
      totalProductsResult,
      todayOrdersResult,
      pendingOrdersResult,
      confirmedOrdersResult,
      preparingOrdersResult,
      deliveredOrdersResult
    ] = await Promise.all([
      // Total de pedidos e faturamento
      db.order.aggregate({
        _count: { id: true },
        _sum: { finalAmount: true }
      }),
      // Total de produtos
      db.product.count({
        where: { available: true }
      }),
      // Pedidos de hoje
      db.order.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      // Pedidos pendentes
      db.order.count({
        where: {
          status: 'PENDING'
        }
      }),
      // Pedidos confirmados
      db.order.count({
        where: {
          status: 'CONFIRMED'
        }
      }),
      // Pedidos em preparação
      db.order.count({
        where: {
          status: 'PREPARING'
        }
      }),
      // Pedidos entregues
      db.order.count({
        where: {
          status: 'DELIVERED'
        }
      })
    ])

    // Buscar total de usuários
    const totalUsers = await db.user.count()

    // Buscar faturamento do mês
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)
    
    const monthlyRevenue = await db.order.aggregate({
      where: {
        createdAt: {
          gte: currentMonth
        },
        status: {
          not: 'CANCELLED'
        }
      },
      _sum: { finalAmount: true }
    })

    // Calcular tempo médio de entrega (em minutos)
    const deliveredOrdersHistory = await db.orderStatusHistory.findMany({
      where: {
        status: 'DELIVERED'
      },
      select: {
        order: {
          select: {
            id: true,
            createdAt: true
          }
        },
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 100 // últimos 100 pedidos entregues
    })

    let averageTime = 0
    if (deliveredOrdersHistory.length > 0) {
      const totalTimeInMinutes = deliveredOrdersHistory.reduce((acc, history) => {
        const diff = history.createdAt.getTime() - history.order.createdAt.getTime()
        return acc + (diff / (1000 * 60)) // Converter para minutos
      }, 0)
      averageTime = Math.round(totalTimeInMinutes / deliveredOrdersHistory.length)
    }

    // Calcular avaliação média (fixa em 4.8 por enquanto)
    const rating = 4.8

      // Buscar pedidos cancelados
    const canceledOrders = await db.order.count({
      where: {
        status: 'CANCELLED'
      }
    })

    // Calcular taxa de cancelamento
    const returnRate = totalOrdersResult._count.id > 0 
      ? Math.round((canceledOrders / totalOrdersResult._count.id) * 100) 
      : 0

    // Calcular faturamento semanal
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)
    
    const weeklyRevenue = await db.order.aggregate({
      where: {
        createdAt: {
          gte: weekAgo
        },
        status: {
          not: 'CANCELLED'
        }
      },
      _sum: { finalAmount: true }
    })

    const stats = {
      totalOrders: totalOrdersResult._count.id || 0,
      totalRevenue: totalOrdersResult._sum.finalAmount || 0,
      totalProducts: totalProductsResult || 0,
      totalUsers: totalUsers || 0,
      todayOrders: todayOrdersResult || 0,
      pendingOrders: pendingOrdersResult || 0,
      confirmedOrders: confirmedOrdersResult || 0,
      preparingOrders: preparingOrdersResult || 0,
      deliveredOrders: deliveredOrdersResult || 0,
      monthlyRevenue: monthlyRevenue._sum.finalAmount || 0,
      weeklyRevenue: weeklyRevenue._sum.finalAmount || 0,
      averageTime,
      rating,
      canceledOrders,
      returnRate
    }

    return NextResponse.json(stats)

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas', details: error.message },
      { status: 500 }
    )
  }
}