import React from 'react'
import { X } from 'lucide-react'

export interface NotificationItemProps {
  notification: {
    id: string
    message: string
    date: string
  }
  onDismiss: (id: string) => void
}

export function NotificationItem({ notification, onDismiss }: NotificationItemProps): React.ReactElement {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1 flex-1">
          <p className="text-gray-900">{notification.message}</p>
          <p className="text-sm text-gray-500">{notification.date}</p>
        </div>
        <button
          onClick={() => onDismiss(notification.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

