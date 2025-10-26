'use client'

import React, { useState } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const id = Date.now().toString()
    const newToast: Toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, newToast])
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearAllToasts = () => {
    setToasts([])
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration)
  }
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        if (toast.type === 'success') {
          return (
            <div key={toast.id} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{toast.message}</span>
                <button onClick={() => onRemove(toast.id)} className="ml-4 text-white">
                  ×
                </button>
              </div>
            </div>
          )
        } else if (toast.type === 'error') {
          return (
            <div key={toast.id} className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{toast.message}</span>
                <button onClick={() => onRemove(toast.id)} className="ml-4 text-white">
                  ×
                </button>
              </div>
            </div>
          )
        } else {
          return (
            <div key={toast.id} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">{toast.message}</span>
                <button onClick={() => onRemove(toast.id)} className="ml-4 text-white">
                  ×
                </button>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}