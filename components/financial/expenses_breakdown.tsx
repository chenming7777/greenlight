import { ArrowRight, HardDrive, Code, Database, GraduationCap, PenToolIcon as Tool, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const expenses = [
  {
    icon: HardDrive,
    title: 'Hardware Cost',
    amount: '$250.00',
    trend: '+5%',
  },
  {
    icon: Code,
    title: 'Software Cost',
    amount: '$80.00',
    trend: '+5%',
  },
  {
    icon: Database,
    title: 'Data Storage',
    amount: '$350.00',
    trend: '+24%',
  },
  {
    icon: GraduationCap,
    title: 'Training',
    amount: '$420.00',
    trend: '+24%',
  },
  {
    icon: Tool,
    title: 'Maintenance',
    amount: '$50.00',
    trend: '+2%',
  },
  {
    icon: Zap,
    title: 'Electricity',
    amount: '$650.00',
    trend: '+25%',
  },
]

export function ExpensesBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense, index) => {
            const Icon = expense.icon
            return (
              <div key={expense.title} className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {expense.title}
                    </span>
                    <span className="text-sm text-gray-600">{expense.amount}</span>
                  </div>
                  <div className="text-xs text-gray-500">{expense.trend}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

