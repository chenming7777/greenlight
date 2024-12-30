import Sidebar from '@/components/home_dashboard/sidebar'
import RegionMonitoring from '@/components/home_dashboard/region_monitoring'
import WeatherConditions from '@/components/home_dashboard/weather_conditions'
import EnergyChart from '@/components/home_dashboard/energy_chart'
import Highlights from '@/components/home_dashboard/highlights'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-500">
              <span>Pages</span>
              <span>/</span>
              <span className="text-gray-900">Dashboard</span>
            </div>
            <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm flex items-center space-x-1">
              <span className="font-bold">!</span>
              <span>Caution</span>
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RegionMonitoring />
            </div>
            <div>
              <WeatherConditions />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <EnergyChart />
            </div>
            <div>
              <Highlights />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

