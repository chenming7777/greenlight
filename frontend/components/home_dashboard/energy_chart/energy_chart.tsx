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
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import styles from './energy_chart.module.css';
import { SolarData } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface Props {
  data: SolarData[];
  startDate: Date | null;
  endDate: Date | null;
}

const EnergyChart = ({ data, startDate, endDate }: Props) => {
  if (!startDate || !endDate || data.length === 0) {
    return <div className={styles.emptyState}>No data available for this range</div>;
  }

  const timeOptions = {
    unit: 'day' as const,
    stepSize: 1,
    displayFormats: {
      day: 'MMM d',
      hour: 'ha'
    },
    min: startDate.getTime(),
    max: endDate.getTime()
  };

  return (
    <div className={styles.chartContainer}>
      <Line
        data={{
          datasets: [
            {
              label: 'Actual Generation',
              data: data.map(d => ({ x: d.Time, y: d.energy })),
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 2
            },
            {
              label: 'Predicted Generation',
              data: data.map(d => ({ x: d.Time, y: d.predicted_energy })),
              borderColor: '#FFA726',
              backgroundColor: 'rgba(255, 167, 38, 0.2)',
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 2
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: timeOptions,
              ticks: {
                autoSkip: true,
                maxRotation: 0
              },
              title: {
                display: true,
                text: 'Time'
              },
              grid: {
                display: false
              }
            },
            y: {
              type: 'linear',
              title: { display: true, text: 'Energy (Wh)' },
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 4500
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          elements: {
            line: {
              fill: true
            }
          }
        }}
      />
    </div>
  );
};

export default EnergyChart;