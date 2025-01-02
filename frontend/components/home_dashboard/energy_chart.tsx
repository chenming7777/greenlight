'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'March', produced: 200, consumed: 150 },
  { name: 'April', produced: 250, consumed: 180 },
  { name: 'May', produced: 180, consumed: 160 },
  { name: 'June', produced: 220, consumed: 190 },
  { name: 'July', produced: 270, consumed: 220 },
  { name: 'August', produced: 230, consumed: 200 },
]

export default function EnergyChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Energy Produced</h2>
        <div className="flex items-center space-x-4">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="produced"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: '#22c55e' }}
            />
            <Line
              type="monotone"
              dataKey="consumed"
              stroke="#eab308"
              strokeWidth={2}
              dot={{ fill: '#eab308' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

