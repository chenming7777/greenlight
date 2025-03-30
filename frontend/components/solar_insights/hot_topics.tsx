import Image from 'next/image'

export function HotTopics() {
  return (
    <div className="relative h-[300px] rounded-xl overflow-hidden">
      <Image
        src="/solar_insight/hot_topic.jpg"
        alt="Solar Panels in Various Applications"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Hot Topics</h1>
        <p className="text-white text-lg max-w-2xl">
          Breakthrough Innovations in Solar Energy: Next-gen solar panel, AI-powered monitoring and floating solar farm are empowering resident and business alike, making clean energy more accessible and efficient than ever before.
        </p>
      </div>
    </div>
  )
}