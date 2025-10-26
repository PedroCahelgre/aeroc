import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { id } = params

    // Verificar se o produto existe
    const existingProduct = await db.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar o produto
    const updateData: any = {}
    
    if (data.name !== undefined) updateData.name = data.name
    if (data.description !== undefined) updateData.description = data.description
    if (data.price !== undefined) updateData.price = parseFloat(data.price)
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId
    if (data.image !== undefined) updateData.image = data.image || null
    if (data.available !== undefined) updateData.available = data.available
    if (data.preparationTime !== undefined) updateData.preparationTime = parseInt(data.preparationTime)
    if (data.ingredients !== undefined) updateData.ingredients = data.ingredients || null

    const product = await db.product.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(transformedProduct)

  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Verificar se o produto existe
    const existingProduct = await db.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Excluir o produto
    await db.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Produto excluído com sucesso' })

  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir produto', details: error.message },
      { status: 500 }
    )
  }
}