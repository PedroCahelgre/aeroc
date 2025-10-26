import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        items: {
          include: {
            product: true
          }
        },
        statusHistory: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Generate order number
    const orderNumber = `AERO${Date.now()}`
    
    // Calculate totals
    let totalAmount = 0
    const orderItems = data.items.map((item: any) => {
      const totalPrice = item.quantity * item.unitPrice
      totalAmount += totalPrice
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: totalPrice,
        notes: item.notes
      }
    })

    const deliveryFee = data.deliveryType === 'DELIVERY' ? 8.00 : 0
    const finalAmount = totalAmount + deliveryFee - (data.discountAmount || 0)

    const order = await db.order.create({
      data: {
        orderNumber,
        userId: data.userId,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: data.paymentMethod,
        deliveryType: data.deliveryType,
        totalAmount,
        deliveryFee,
        discountAmount: data.discountAmount || 0,
        finalAmount,
        scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
        deliveryAddress: data.deliveryAddress,
        customerPhone: data.customerPhone,
        notes: data.notes,
        items: {
          create: orderItems
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            notes: 'Pedido criado'
          }
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        items: {
          include: {
            product: true
          }
        },
        statusHistory: true
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}