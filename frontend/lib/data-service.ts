// lib/data-service.ts
import { SolarData } from './types';

export const fetchSolarData = async (): Promise<SolarData[]> => {
  try {
    const response = await fetch('/data/solar_weather_demo_homepage.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

const parseCSV = (csv: string): SolarData[] => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj = headers.reduce((acc, header, index) => {
      if (header === 'Energy delta[Wh]') {
        acc['energy'] = parseFloat(values[index]) || 0;
      } else if (
        ['GHI', 'temp', 'pressure', 'humidity', 'wind_speed', 'rain_1h', 'clouds_all'].includes(header)
      ) {
        acc[header] = parseFloat(values[index]) || 0;
      } else if (header === 'Time') {
        acc[header] = new Date(values[index]);
      } else {
        acc[header] = values[index];
      }
      return acc;
    }, {} as Record<string, any>);

    return obj as SolarData;
  });
};