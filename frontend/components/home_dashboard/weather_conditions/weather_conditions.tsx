// components/home_dashboard/weather_conditions/weather_conditions.tsx
import styles from './weather_conditions.module.css';
import {
  Thermometer,
  Sun,
  Droplets,
  Wind,
  CloudRain,
  Cloud,
} from 'lucide-react';
import { WeatherData } from '@/lib/types';

interface Props {
  data: WeatherData;
}

const WeatherConditions = ({ data }: Props) => {
  const conditions = [
    {
      icon: <Thermometer className="text-red-500" size={24} />,
      text: `Temperature: ${data.temp}°C`,
    },
    {
      icon: <Sun className="text-amber-500" size={24} />,
      text: `Irradiance: ${data.GHI} W/m²`,
    },
    {
      icon: <Droplets className="text-blue-500" size={24} />,
      text: `Humidity: ${data.humidity}%`,
    },
    {
      icon: <Wind className="text-cyan-500" size={24} />,
      text: `Wind Speed: ${data.wind_speed} km/h`,
    },
    {
      icon: <CloudRain className="text-gray-500" size={24} />,
      text: `Rainfall: ${data.rain_1h} mm`,
    },
    {
      icon: <Cloud className="text-gray-400" size={24} />,
      text: `Cloud Cover: ${data.clouds_all}%`,
    },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Weather Conditions</h3>
      <div className={styles.list}>
        {conditions.map(({ icon, text }, index) => (
          <div key={index} className={styles.condition}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherConditions;