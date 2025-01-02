'use client'

import { Sun, CloudDrizzle } from 'lucide-react'

export default function WeatherConditions() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Weather Conditions</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-semibold text-gray-900">29.75°C</div>
            <div className="text-sm text-gray-500">Today</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <CloudDrizzle className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <div className="text-xl font-semibold text-gray-900">28°C</div>
            <div className="text-sm text-gray-500">27 Sept 2023</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <CloudDrizzle className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <div className="text-xl font-semibold text-gray-900">26°C</div>
            <div className="text-sm text-gray-500">28 Sept 2023</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-500 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <Sun className="w-6 h-6" />
              <span className="text-sm">↑ 10%</span>
            </div>
            <div className="mt-2">
              <div className="text-sm">Irradiance</div>
              <div className="text-lg font-semibold">1041 W/m²</div>
            </div>
          </div>
          <div className="bg-green-500 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <CloudDrizzle className="w-6 h-6" />
              <span className="text-sm">↓ 40%</span>
            </div>
            <div className="mt-2">
              <div className="text-sm">Humidity</div>
              <div className="text-lg font-semibold">12 kN/h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

