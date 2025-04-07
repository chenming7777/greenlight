// lib/types.ts
export interface SolarData {
  Time: Date;
  energy: number; // Renamed from 'Energy delta[Wh]'
  GHI: number;
  temp: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  rain_1h: number;
  clouds_all: number;

  // Add an index signature for dynamic access (optional)
  [key: string]: number | Date | string;
}

export type WeatherData = {
  temp: number;
  GHI: number;
  humidity: number;
  wind_speed: number;
  rain_1h: number;
  clouds_all: number;
  Time: Date;
};