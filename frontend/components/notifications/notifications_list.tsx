'use client'

import React from 'react'
import { NotificationItem } from './notification_item'

export interface Notification {
  id: string
  message: string
  date: string
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    message: 'Solar Panel Malfunction detected. Immediate action required.',
    date: 'April 10, 2025'
  }
]

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)

  const handleDismiss = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  if (notifications.length === 0) {
    return (
      <div className = "bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
        No notifications to display
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  )
}

export default NotificationList

