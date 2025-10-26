import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Criar usuários base
    const user1 = await db.user.upsert({
      where: { email: 'comerciochalegre@gmail.com' },
      update: {},
      create: {
        email: 'comerciochalegre@gmail.com',
        name: 'Admin Master',
        role: 'ADMIN'
      }
    })

    const user2 = await db.user.upsert({
      where: { email: 'aeropizza@admin.com' },
      update: {},
      create: {
        email: 'aeropizza@admin.com',
        name: 'Admin User',
        role: 'ADMIN'
      }
    })

    // Criar admins com senhas hasheadas
    const hashedPassword1 = await bcrypt.hash('87168087', 10)
    const hashedPassword2 = await bcrypt.hash('12345678', 10)

    const admin1 = await db.admin.upsert({
      where: { email: 'comerciochalegre@gmail.com' },
      update: {},
      create: {
        email: 'comerciochalegre@gmail.com',
        password: hashedPassword1,
        name: 'Admin Master',
        role: 'ADMIN',
        userId: user1.id
      }
    })

    const admin2 = await db.admin.upsert({
      where: { email: 'aeropizza@admin.com' },
      update: {},
      create: {
        email: 'aeropizza@admin.com',
        password: hashedPassword2,
        name: 'Admin User',
        role: 'ADMIN',
        userId: user2.id
      }
    })

    return NextResponse.json({
      message: 'Admins initialized successfully',
      admins: [
        { email: admin1.email, role: admin1.role },
        { email: admin2.email, role: admin2.role }
      ]
    })

  } catch (error) {
    console.error('Error initializing admins:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}