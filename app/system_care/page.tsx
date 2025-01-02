import { Calendar } from '@/components/system_care/calendar'
import { Sidebar_calendar } from '@/components/system_care/sidebar_calendar'
import  Sidebar  from '@/components/ui/sidebar'


export default function SystemCarePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main className="flex-1 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-900">
            <span>Pages</span>
            <span>/</span>
            <span className="font-medium">System Care</span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar_calendar />
          <Calendar />
        </div>
      </div>
    </main>
    </div>
  )
}

