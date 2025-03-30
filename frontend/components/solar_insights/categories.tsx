import Link from 'next/link'
import { Sun, Wrench, Leaf, PieChart } from 'lucide-react'

const categories = [
  {
    title: 'SOLAR TECHNOLOGY',
    icon: Sun,
    description: 'Latest innovations in solar panel technology, what panel you should implement',
    href: 'https://www.tnb.com.my/solar',
  },
  {
    title: 'NET ENERGY METERING (NEM) POLICY',
    icon: Wrench,
    description: 'Understand Malaysia Net Energy Metering scheme, allowing surplus energy to be exported back to the grid.',
    href: 'https://www.mytnb.com.my/renewable-energy/net-energy-metering',
  },
  {
    title: 'RENEWABLE ENERGY TARIFFS',
    icon: Leaf,
    description: 'Explore Sustainable Energy Development Authority (SEDA) Feed-in Tariff (FiT) incentives for renewable energy adoption.',
    href: 'https://www.seda.gov.my/reportal/fit/',
  },
  {
    title: 'ECONOMIC AND FINANCIAL INSIGHTS',
    icon: PieChart,
    description: 'Cost analysis and financial planning',
    href: 'https://ember-energy.org/latest-insights/solar-and-grid-flexibility-critical-for-malaysia/',
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
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practices
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

