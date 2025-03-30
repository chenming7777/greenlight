import Image from 'next/image'

export function TodayHighlight() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Today</h2>
      <a
        href="https://www.magnachip.com/magnachip-expands-solar-energy-power-product-lineup-with-the-release-of-1200v-igbt-in-to-247plus-package/#:~:text=Now%2C%20the%20Company%20unveils%20its,to%20the%20TO%2D247%20package." // Replace with the desired URL
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // Security best practices
        className="block"
      >
        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src="/solar_insight/today.jpg"
              alt="Solar Panel Product"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-medium text-gray-900">
            Megachip Expands Solar Energy Power Product Lineup with the Release of 1200V IGBT in TO-247PLUS Package
          </h3>
        </div>
      </a>
    </div>
  )
}