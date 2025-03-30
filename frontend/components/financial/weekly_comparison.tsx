'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { day: '17 Sun', lastWeek: 50, thisWeek: 80 },
  { day: '18 Mon', lastWeek: 60, thisWeek: 90 },
  { day: '19 Tue', lastWeek: 45, thisWeek: 65 },
  { day: '20 Wed', lastWeek: 75, thisWeek: 85 },
  { day: '21 Thu', lastWeek: 70, thisWeek: 80 },
  { day: '22 Fri', lastWeek: 90, thisWeek: 95 },
  { day: '23 Sat', lastWeek: 40, thisWeek: 55 },
]

export function WeeklyComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-black'>Weekly Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="day"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="lastWeek"
                fill="#e2e8f0"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="thisWeek"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

