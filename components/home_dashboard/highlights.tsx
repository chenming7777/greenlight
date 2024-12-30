'use client'

import { Battery, Gauge, Leaf } from 'lucide-react'

export default function Highlights() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Highlights</h2>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <Gauge className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">301 kWh</div>
                <div className="text-sm text-gray-500">Consumed Energy</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <Battery className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">501 kWh</div>
                <div className="text-sm text-gray-500">Battery Capacity</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <Gauge className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">22.3 %</div>
                <div className="text-sm text-gray-500">Efficiency</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <Leaf className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">0.99 kt</div>
                <div className="text-sm text-gray-500">CO2 Reduced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

