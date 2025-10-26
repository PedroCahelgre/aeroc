'use client'

import { useState, useEffect } from 'react'

interface Admin {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'MANAGER'
  userId: string
  user?: {
    id: string
    email: string
    name?: string
    role: string
  }
}

export function useAuth() {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if admin is logged in
    const storedAdmin = localStorage.getItem('admin')
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin)
        setAdmin(parsedAdmin)
      } catch (error) {
        console.error('Error parsing admin data:', error)
        localStorage.removeItem('admin')
      }
    }
    setLoading(false)
  }, [])

  const login = (adminData: Admin) => {
    setAdmin(adminData)
    localStorage.setItem('admin', JSON.stringify(adminData))
  }

  const logout = () => {
    setAdmin(null)
    localStorage.removeItem('admin')
  }

  const isMasterAdmin = () => {
    return admin?.email === 'comerciochalegre@gmail.com'
  }

  const hasPermission = (permission: string) => {
    if (isMasterAdmin()) return true
    
    switch (permission) {
      case 'edit_products':
      case 'create_products':
      case 'delete_products':
        return admin?.role === 'ADMIN' || admin?.role === 'MANAGER'
      case 'manage_admins':
      case 'system_settings':
        return isMasterAdmin()
      case 'view_reports':
      case 'manage_orders':
        return admin?.role === 'ADMIN' || admin?.role === 'MANAGER'
      default:
        return false
    }
  }

  return {
    admin,
    loading,
    login,
    logout,
    isMasterAdmin,
    hasPermission
  }
}