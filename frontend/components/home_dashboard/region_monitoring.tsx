'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function RegionMonitoring() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm h-[380px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Region Monitoring</h2>
        <div className="flex space-x-2">
          <Select defaultValue="active">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Panels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Panels</SelectItem>
              <SelectItem value="group-a">Group A</SelectItem>
              <SelectItem value="group-b">Group B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16px,1fr))] gap-1.5 aspect-[2/1] mt-2">
        {Array.from({ length: 41 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded ${
              [2, 3, 13, 14, 34, 35].includes(i) ? 'bg-red-400' : 'bg-blue-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

