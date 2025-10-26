import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const pixConfig = await db.pixConfig.findFirst({
      where: { key: 'aeropizza_pix', active: true }
    })

    if (!pixConfig) {
      return NextResponse.json({ error: 'Configuração PIX não encontrada' }, { status: 404 })
    }

    return NextResponse.json(pixConfig)
  } catch (error) {
    console.error('Erro ao buscar configuração PIX:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { pixKey, pixType, recipient, active } = data

    if (!pixKey || !pixType || !recipient) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const pixConfig = await db.pixConfig.upsert({
      where: { key: 'aeropizza_pix' },
      update: {
        pixKey,
        pixType,
        recipient,
        active: active ?? true
      },
      create: {
        key: 'aeropizza_pix',
        pixKey,
        pixType,
        recipient,
        active: active ?? true
      }
    })

    return NextResponse.json(pixConfig)
  } catch (error) {
    console.error('Erro ao atualizar configuração PIX:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}