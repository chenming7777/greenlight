import { Compass, Leaf, PieChart, FileText } from 'lucide-react'

const actions = [
  {
    icon: Compass,
    text: 'Where should I plan my to build an agrivoltaic farm?',
  },
  {
    icon: Leaf,
    text: 'What plant should I plant with the solar panel?',
  },
  {
    icon: PieChart,
    text: 'What is my ROI?',
  },
  {
    icon: FileText,
    text: 'Write me the report',
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.text}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <Icon className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">{action.text}</span>
          </button>
        )
      })}
    </div>
  )
}

