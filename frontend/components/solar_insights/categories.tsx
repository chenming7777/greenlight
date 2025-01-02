import Link from 'next/link'
import { Sun, Wrench, Leaf, PieChart } from 'lucide-react'

const categories = [
  {
    title: 'SOLAR TECHNOLOGY',
    icon: Sun,
    description: 'Latest innovations in solar panel technology',
    href: '#',
  },
  {
    title: 'SYSTEM DESIGN AND INSTALLATION',
    icon: Wrench,
    description: 'Best practices for solar system implementation',
    href: '#',
  },
  {
    title: 'ENVIRONMENTAL IMPACT',
    icon: Leaf,
    description: 'Environmental benefits and sustainability metrics',
    href: '#',
  },
  {
    title: 'ECONOMIC AND FINANCIAL INSIGHTS',
    icon: PieChart,
    description: 'Cost analysis and financial planning',
    href: '#',
  },
]

export function Categories() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Category</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.title}
              href={category.href}
              className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

