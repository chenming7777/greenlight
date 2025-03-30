'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState('March')
  const [currentYear, setCurrentYear] = useState('2025')
  const [events, setEvents] = useState([
    { id: 1, name: 'Solar Panel Maintenance', time: '08:00', date: '2025-03-01', category: 'Maintenance', color: 'bg-red-100 text-red-700' },
    { id: 2, name: 'System Software Update', time: '10:00', date: '2025-03-02', category: 'System Update', color: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Energy Efficiency Inspection', time: '14:00', date: '2025-03-03', category: 'Inspection', color: 'bg-green-100 text-green-700' },
    { id: 4, name: 'Client Meeting: Project Alpha', time: '16:00', date: '2025-03-04', category: 'Client Meeting', color: 'bg-yellow-100 text-yellow-700' },
  ])
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: '', time: '', date: '', category: '', color: '' })

  const handleAddEvent = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: prevEvents.length + 1,
        name: newEvent.name,
        time: newEvent.time,
        date: newEvent.date,
        category: newEvent.category,
        color: newEvent.color || 'bg-gray-100 text-gray-700',
      },
    ])
    setShowModal(false)
    setNewEvent({ name: '', time: '', date: '', category: '', color: '' })
  }

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">{currentMonth} {currentYear}</h2>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Days of the Week */}
        {days.map((day) => (
          <div key={day} className="text-sm font-medium text-gray-500 text-center">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border rounded-lg p-2 text-sm hover:bg-gray-50 cursor-pointer"
          >
            <div className="font-medium text-gray-900">{(i % 31) + 1}</div>
            {/* Events */}
            {events
              .filter((event) => event.date === `2025-03-${String((i % 31) + 1).padStart(2, '0')}`)
              .map((event) => (
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

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-black">Add New Event</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                className="w-full border rounded-lg p-2 text-black"
              />
              <input
                type="time"
                placeholder="Time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full border rounded-lg p-2 text-black"
              />
              <input
                type="date"
                placeholder="Date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full border rounded-lg p-2 text-black"
              />
              <Select
                onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}
                defaultValue=""
              >
                <SelectTrigger className="w-full text-black">
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="bg-red-100 text-red-700" className="text-black bg-red-200">Red</SelectItem>
                  <SelectItem value="bg-blue-100 text-blue-700" className="text-black bg-blue-200">Blue</SelectItem>
                  <SelectItem value="bg-green-100 text-green-700" className="text-black bg-green-200">Green</SelectItem>
                  <SelectItem value="bg-yellow-100 text-yellow-700" className="text-black bg-yellow-200">Yellow</SelectItem>
                  <SelectItem value="bg-gray-100 text-gray-700" className="text-black bg-gray-200">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button className="mr-2 text-black" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddEvent}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}