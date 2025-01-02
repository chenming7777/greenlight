import { ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const metrics = [
  {
    title: 'Portfolio Performance',
    value: '1.595%',
    trend: '+7.14% more than last month',
    isPositive: true,
  },
  {
    title: 'Total Profit',
    value: 'RM 279,753',
    trend: '+8.14% more than last month',
    isPositive: true,
  },
  {
    title: 'Solar Energy Generation Revenue',
    value: 'RM 250,000',
    trend: '+$4,124.45 more than last month',
    isPositive: true,
  },
  {
    title: 'Carbon Credits Revenue',
    value: 'RM 11,753',
    trend: '+0.75kg CO2/kWh',
    isPositive: true,
  },
]

export function FinancialMetrics() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-white">
          <CardContent className="pt-6">
            <h3 className="text-sm text-gray-500 font-medium mb-2">{metric.title}</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              {metric.isPositive && (
                <ArrowUpRight className="w-5 h-5 text-green-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">{metric.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

