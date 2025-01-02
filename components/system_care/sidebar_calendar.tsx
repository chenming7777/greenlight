'use client'

import { Clock, CalendarDays, Tag } from 'lucide-react'

const todayEvents = [
  { id: 1, name: 'X Due', time: '08:00' },
  { id: 2, name: 'Maintenance', time: '09:00' },
  { id: 3, name: 'X', time: '10:00' },
  { id: 4, name: 'X', time: '11:00' },
  { id: 5, name: 'X', time: '12:00' },
]

const tomorrowEvents = [
  { id: 6, name: 'Some Installment', time: '13:00' },
  { id: 7, name: 'Maintenance X', time: '14:00' },
  { id: 8, name: 'X', time: '15:00' },
]

const categories = [
  { id: 1, name: 'Category 1', count: 2 },
  { id: 2, name: 'Category 2', count: 10 },
  { id: 3, name: 'Category 3', count: 8 },
  { id: 4, name: 'Category 4', count: 1 },
]

export function Sidebar_calendar() {
  return (
    <div className="w-full lg:w-80 space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Clock className="w-5 h-5" />
          <h2>Today</h2>
        </div>
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div key={event.id} className="flex justify-between text-sm">
              <span className="text-gray-900">{event.name}</span>
              <span className="text-gray-500">{event.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <CalendarDays className="w-5 h-5" />
          <h2>Tomorrow</h2>
        </div>
        <div className="space-y-3">
          {tomorrowEvents.map((event) => (
            <div key={event.id} className="flex justify-between text-sm">
              <span className="text-gray-900">{event.name}</span>
              <span className="text-gray-500">{event.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Tag className="w-5 h-5" />
          <h2>Categories</h2>
        </div>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex justify-between text-sm">
              <span className="text-gray-900">{category.name}</span>
              <span className="text-gray-500">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

