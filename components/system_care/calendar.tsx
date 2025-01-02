'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const events = [
  { id: 1, name: 'Maintenance', time: '08:00', category: 'Category 1', color: 'bg-red-100 text-red-700' },
  { id: 2, name: 'System Update', time: '10:00', category: 'Category 2', color: 'bg-blue-100 text-blue-700' },
  { id: 3, name: 'Inspection', time: '14:00', category: 'Category 3', color: 'bg-green-100 text-green-700' },
]

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState('January')
  const [currentYear, setCurrentYear] = useState('2022')

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">January 2022</h2>
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add event
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
          >
            <div className="font-medium text-gray-900">{(i % 31) + 1}</div>
            {events.map((event) => (
              <div
                key={event.id}
                className={`mt-1 px-2 py-1 rounded-md text-xs ${event.color}`}
              >
                {event.time} {event.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

