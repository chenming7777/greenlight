// components/ui/LineChart.tsx
import React from 'react';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Props {
  data: any[];
  dataKey: string;
  nameKey: string;
  aspect?: number;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

const LineChart = ({
  data,
  dataKey,
  nameKey,
  aspect = 3/1,
  margin = { top: 20, right: 30, left: 20, bottom: 5 }
}: Props) => {
  return (
    <ResponsiveContainer width="100%" aspect={aspect}>
      <ReLineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={nameKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke="#82ca9d" 
          activeDot={{ r: 8 }}
        />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;