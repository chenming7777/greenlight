import Chatbot from '@/components/smart_assistance/chatbot'
import  Sidebar  from '@/components/ui/sidebar' 


// app/smart_assistance/page.jsx
export default function SmartAssistantPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar/>
      <main className="flex-1 h-full overflow-y-auto">
        <Chatbot/>
      </main>
    </div>
  )
}

