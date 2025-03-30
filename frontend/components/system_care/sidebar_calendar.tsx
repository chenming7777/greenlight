'use client'

import { Clock, CalendarDays, Tag } from 'lucide-react'

const todayEvents = [
  { id: 1, name: 'Solar Panel Inspection', time: '08:00' },
  { id: 2, name: 'System Maintenance', time: '09:30' },
  { id: 3, name: 'Energy Audit Meeting', time: '11:00' },
  { id: 4, name: 'Client Presentation', time: '14:00' },
  { id: 5, name: 'Team Briefing', time: '16:00' },
]

const tomorrowEvents = [
  { id: 6, name: 'Solar Installation at Site A', time: '09:00' },
  { id: 7, name: 'Maintenance Follow-up', time: '11:30' },
  { id: 8, name: 'Energy Efficiency Workshop', time: '15:00' },
]

const categories = [
  { id: 1, name: 'Scheduled Maintenance', count: 5 },
  { id: 2, name: 'Client Meetings', count: 3 },
  { id: 3, name: 'Workshops & Training', count: 2 },
  { id: 4, name: 'Installations', count: 4 },
]

export function Sidebar_calendar() {
  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Today's Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Clock className="w-5 h-5 text-black" />
          <h2 className="text-black">Today</h2>
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

      {/* Tomorrow's Events */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <CalendarDays className="w-5 h-5 text-black" />
          <h2 className="text-black">Tomorrow</h2>
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

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Tag className="w-5 h-5 text-black" />
          <h2 className="text-black">Categories</h2>
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