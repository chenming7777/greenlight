// lib/types.ts
export interface SolarData {
  Time: Date;
  energy: number; 
  GHI: number;
  temp: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  rain_1h: number;
  clouds_all: number;
  predicted_energy: number;
  
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

