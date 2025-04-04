// components/home_dashboard/energy_chart/energy_chart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './energy_chart.module.css';
import { SolarData } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: SolarData[];
}

const EnergyChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((d) =>
      `${d.Time.getHours()}:${d.Time.getMinutes().toString().padStart(2, '0')}`
    ),
    datasets: [
      {
        label: 'Actual Generation',
        data: data.map((d) => d.energy), // Updated
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Predicted Generation',
        data: data.map((d) => d.GHI * 0.85), // Example prediction formula
        borderColor: '#FFA726',
        backgroundColor: 'rgba(255, 167, 38, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              title: { display: true, text: 'Time (15-min intervals)' },
            },
            y: {
              type: 'linear',
              title: { display: true, text: 'Energy (Wh)' },
            },
          },
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index' },
          },
        }}
      />
    </div>
  );
};

export default EnergyChart;