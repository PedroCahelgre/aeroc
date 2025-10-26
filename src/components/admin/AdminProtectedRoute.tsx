'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface AdminProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
}

export default function AdminProtectedRoute({ 
  children, 
  requiredPermission 
}: AdminProtectedRouteProps) {
  const { admin, loading, hasPermission } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!admin) {
        router.push('/login-admin')
        return
      }

      if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/admin')
        return
      }

      setIsChecking(false)
    }
  }, [admin, loading, router, requiredPermission, hasPermission])

  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return <>{children}</>
}