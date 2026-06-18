'use client'

import { useEffect, useState } from 'react'
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
} from 'lucide-react'

interface Notification {
  id: number
  title: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export default function UserNotificationsPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const user = localStorage.getItem('insta_user')
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      
      let userNotifications = JSON.parse(
        localStorage.getItem(`user_${userData.id}_notifications`) || '[]'
      )
      
      // Add some demo notifications if none
      if (userNotifications.length === 0) {
        userNotifications = [
          {
            id: 1,
            title: 'Welcome to InstaMoney!',
            message: 'Your account has been created successfully. Start applying for loans!',
            type: 'success',
            read: false,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 2,
            title: 'New Feature Alert',
            message: 'Track your application status in real-time from your dashboard!',
            type: 'info',
            read: false,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
        localStorage.setItem(`user_${userData.id}_notifications`, JSON.stringify(userNotifications))
      }
      
      setNotifications(userNotifications)
    }
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const markAsRead = (id: number) => {
    if (!currentUser) return
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
    setNotifications(updated)
    localStorage.setItem(`user_${currentUser.id}_notifications`, JSON.stringify(updated))
  }

  const deleteNotification = (id: number) => {
    if (!currentUser) return
    const updated = notifications.filter(n => n.id !== id)
    setNotifications(updated)
    localStorage.setItem(`user_${currentUser.id}_notifications`, JSON.stringify(updated))
  }

  const markAllAsRead = () => {
    if (!currentUser) return
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifications(updated)
    localStorage.setItem(`user_${currentUser.id}_notifications`, JSON.stringify(updated))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-[#0052ff] hover:text-[#003ecf] font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-start gap-4 transition-colors ${
                !notification.read ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {notification.title}
                </h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNotification(notification.id)
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Notifications
          </h3>
          <p className="text-gray-600">
            You don't have any notifications yet
          </p>
        </div>
      )}
    </div>
  )
}