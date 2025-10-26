import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, role, password } = await request.json()
    const { id } = params

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      )
    }

    // Check if admin exists
    const existingAdmin = await db.admin.findUnique({
      where: { id }
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    // Check if email is being changed and if it's already taken
    if (email !== existingAdmin.email) {
      const emailTaken = await db.admin.findFirst({
        where: { 
          email,
          id: { not: id }
        }
      })

      if (emailTaken) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      role
    }

    // Add password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Update admin
    const updatedAdmin = await db.admin.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true
          }
        }
      }
    })

    // Update associated user if email changed
    if (email !== existingAdmin.email) {
      await db.user.update({
        where: { id: updatedAdmin.userId },
        data: {
          email,
          name
        }
      })
    }

    // Remove password from response
    const { password: _, ...adminData } = updatedAdmin

    return NextResponse.json({
      admin: adminData,
      message: 'Admin updated successfully'
    })

  } catch (error) {
    console.error('Error updating admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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

    // Check if admin exists
    const existingAdmin = await db.admin.findUnique({
      where: { id }
    })

    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      )
    }

    // Prevent deletion of master admin
    if (existingAdmin.email === 'comerciochalegre@gmail.com') {
      return NextResponse.json(
        { error: 'Cannot delete master admin' },
        { status: 403 }
      )
    }

    // Delete admin (this will cascade delete the user due to the relation)
    await db.admin.delete({
      where: { id }
    })

    return NextResponse.json({
      message: 'Admin deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}