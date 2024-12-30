import Image from 'next/image'

export function TodayHighlight() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today</h2>
      <div className="space-y-4">
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src="/media/solar-panel-product.jpg"
            alt="Solar Panel Product"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-medium text-gray-900">
          Megachip Expands Solar Energy Power Product Lineup with the Release of 1200V IGBT in TO-247PLUS Package
        </h3>
      </div>
    </div>
  )
}

