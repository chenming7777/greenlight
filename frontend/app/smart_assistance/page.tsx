import Chatbot from '@/components/smart_assistance/chatbot'
import  Sidebar  from '@/components/ui/sidebar' 


export default function SmartAssistantPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">
        <Chatbot />
      </main>
    </div>
  )
}

