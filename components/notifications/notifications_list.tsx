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
    message: 'Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet.',
    date: 'March 1, 2023'
  },
  {
    id: '2',
    message: 'Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet.',
    date: 'February 28, 2023'
  },
  {
    id: '3',
    message: 'Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet.',
    date: 'April 29, 2022'
  },
  {
    id: '4',
    message: 'Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet.',
    date: 'March 6, 2022'
  },
  {
    id: '5',
    message: 'Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet. Lorem ipsum Dolor Sit Amet.',
    date: 'March 1, 2022'
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

