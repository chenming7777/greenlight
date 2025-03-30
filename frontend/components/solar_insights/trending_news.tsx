import Image from 'next/image'
import { CalendarDays } from 'lucide-react'

const news = [
  {
    title: 'Malaysia Achieves Milestone in Solar Energy Adoption with Net Energy Metering (NEM) Success',
    date: '12 March 2025',
    image: '/solar_insight/trending.jpg',
    description:
      'Malaysia has successfully increased solar energy adoption through its Net Energy Metering (NEM) initiative, allowing households and businesses to export surplus energy back to the grid. The program has led to a significant rise in rooftop solar installations nationwide.',
    link: 'https://www.seda.gov.my/reportal/nem/', // Add the link here
  },
  {
    title: 'SEDA Announces New Solar Incentives Under Budget 2025',
    date: '20 January 2025',
    image: '/solar_insight/trending2.jpg',
    description:
      'The Sustainable Energy Development Authority (SEDA) Malaysia has announced new incentives under Budget 2025, including tax relief programs like GITA and CA, to encourage renewable energy investments. Floating solar farms and smart-grid technologies are also being prioritized.',
    link: 'https://www.seda.gov.my/', // Add the link here
  },
]

export function TrendingNews() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <a
            key={item.title}
            href={item.link} // Use the link property here
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practices
            className="block"
          >
            <div
              className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative w-60 h-45 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {item.date}
                </div>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}