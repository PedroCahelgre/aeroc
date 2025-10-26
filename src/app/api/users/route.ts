import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Check if user already exists
    let user = await db.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      // Create new user
      user = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          role: 'CLIENT'
        }
      })
    } else {
      // Update existing user
      user = await db.user.update({
        where: { email: data.email },
        data: {
          name: data.name || user.name,
          phone: data.phone || user.phone,
          address: data.address || user.address
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}