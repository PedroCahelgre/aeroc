import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Criar categorias padrão
    const categories = [
      { name: 'Pizzas Tradicionais', description: 'As pizzas clássicas que todos amam' },
      { name: 'Pizzas Especiais', description: 'Combinações exclusivas e saborosas' },
      { name: 'Pizzas Doces', description: 'Para quem adora um doce final' },
      { name: 'Bebidas', description: 'Refrigerantes, sucos e mais' },
      { name: 'Sobremesas', description: 'Delícias para completar sua refeição' }
    ]

    const createdCategories = []
    
    for (const categoryData of categories) {
      const category = await db.category.upsert({
        where: { name: categoryData.name },
        update: {},
        create: categoryData
      })
      createdCategories.push(category)
    }

    return NextResponse.json({
      message: 'Categories initialized successfully',
      categories: createdCategories.map(c => ({ name: c.name, id: c.id }))
    })

  } catch (error) {
    console.error('Error initializing categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
