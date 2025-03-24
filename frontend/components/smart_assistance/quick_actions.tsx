import { Compass, Leaf, PieChart, FileText } from 'lucide-react'

const actions = [
  {
    icon: Compass,
    text: 'Where should I plan my to build an solar farm?',
  },
  {
    icon: Leaf,
    text: 'Why my solar panel not working properly?',
  },
  {
    icon: PieChart,
    text: 'How is recent solar energy generation',
  },
  {
    icon: FileText,
    text: 'Is there any subsidy available for solar farm?',
  },
]

export function QuickActions() {
  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.text}
              className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white shadow-md hover:bg-gray-100 transition-colors text-center"
            >
              <Icon className="w-8 h-8 text-gray-500" />
              <span className="text-sm text-gray-600">{action.text}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}