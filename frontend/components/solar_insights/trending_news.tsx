import Image from 'next/image'
import { CalendarDays } from 'lucide-react'

const news = [
  {
    title: 'Leading Agrivoltaic UPM Terima Pengiktirafan Malaysia Book of Records',
    date: '19 May 2023',
    image: '/media/news-1.jpg',
    description:
      'UPM Professor Datin Dr Rosenani Anwarul menjadi penerima pengiktirafan dari The Malaysia Book of Records yang berkenaan dengan Teknologi Voltan Selangor...',
  },
  {
    title: 'Global Agrivoltaic Market Surges: Solar Integration in Agriculture Sees Rapid Growth, Projected to Exceed $10 Billion by 2030',
    date: '15 May 2023',
    image: '/media/news-2.jpg',
    description:
      'The global agrivoltaic market is experiencing unprecedented growth as farmers and energy providers collaborate...',
  },
]

export function TrendingNews() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Trending News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative w-32 h-24 flex-shrink-0">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

