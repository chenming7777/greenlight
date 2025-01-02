import { FinancialMetrics } from '@/components/financial/financial_metrics'
import { ExpensesBreakdown } from '@/components/financial/expenses_breakdown'
import { WeeklyComparison } from '@/components/financial/weekly_comparison'
import Sidebar from '@/components/ui/sidebar'


export default function FinancialPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-900">
              <span>Pages</span>
              <span>/</span>
              <span className="font-medium">Financial Overview</span>
            </div>
          </div>
          <FinancialMetrics />
          <div className="grid lg:grid-cols-2 gap-6">
            <ExpensesBreakdown />
            <WeeklyComparison />
          </div>
          <div className="flex justify-center">
            <button className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-800 transition-colors">
              DOWNLOAD REPORT
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

