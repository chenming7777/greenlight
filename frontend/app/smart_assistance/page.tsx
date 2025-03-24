import { Chat } from '@/components/smart_assistance/chat'
import  Sidebar  from '@/components/ui/sidebar' 


export default function SmartAssistantPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <Chat />
      </main>
    </div>
  )
}

