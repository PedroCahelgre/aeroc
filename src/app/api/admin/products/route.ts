import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany({
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transformar os dados para o formato esperado
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category.name.toLowerCase(),
      image: product.image || '',
      available: product.available,
      featured: false, // Adicionar campo featured se necessário no schema
      categoryName: product.category.name,
      categoryId: product.categoryId,
      preparationTime: product.preparationTime,
      ingredients: product.ingredients
    }))

    return NextResponse.json(transformedProducts)

  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar produtos', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validar campos obrigatórios
    if (!data.name || !data.price || !data.categoryId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: name, price, categoryId' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description || '',
        price: parseFloat(data.price),
        categoryId: data.categoryId,
        image: data.image || null,
        available: data.available !== undefined ? data.available : true,
        preparationTime: data.preparationTime ? parseInt(data.preparationTime) : 15,
        ingredients: data.ingredients || null
      },
      include: {
        category: true
      }
    })

    // Transformar para o formato esperado
    const transformedProduct = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category.name.toLowerCase(),
      image: product.image || '',
      available: product.available,
      featured: false,
      categoryName: product.category.name,
      categoryId: product.categoryId,
      preparationTime: product.preparationTime,
      ingredients: product.ingredients
    }

    return NextResponse.json(transformedProduct, { status: 201 })

  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto', details: error.message },
      { status: 500 }
    )
  }
}