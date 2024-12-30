import Image from 'next/image'

export function HotTopics() {
  return (
    <div className="relative h-[300px] rounded-xl overflow-hidden">
      <Image
        src="/media/solar-panels-hero.jpg"
        alt="Solar Panels in Agricultural Field"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Hot Topics</h1>
        <p className="text-white text-lg max-w-2xl">
          Breakthrough in Agrivoltaics: Solar Panels Boost Crop Yields While Powering Communities
        </p>
      </div>
    </div>
  )
}

