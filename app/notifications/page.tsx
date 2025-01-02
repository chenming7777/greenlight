import NotificationList from '@/components/notifications/notifications_list'
import Sidebar from '@/components/ui/sidebar'

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <span>Pages</span>
            <span>/</span>
            <span className="text-gray-900">Notifications</span>
          </div>
          <NotificationList />
        </div>
      </main>
    </div>
  )
}

