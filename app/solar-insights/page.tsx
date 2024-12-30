import Sidebar from '@/components/home_dashboard/sidebar'
import { HotTopics } from '@/components/solar_insights/hot_topics'
import { Categories } from '@/components/solar_insights/categories'
import { TodayHighlight } from '@/components/solar_insights/today_highlight'
import { TrendingNews } from '@/components/solar_insights/trending_news'

export default function SolarInsightsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-900">
              <span>Pages</span>
              <span>/</span>
              <span className="font-medium">Solar Insights</span>
            </div>
          </div>
          <div className="space-y-6">
            <HotTopics />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Categories />
                <div className="mt-6">
                  <TrendingNews />
                </div>
              </div>
              <div>
                <TodayHighlight />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}