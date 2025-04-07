"use client";

import { useEffect, useState } from 'react';
import { fetchSolarData } from '@/lib/data-service';
import Sidebar from '@/components/ui/sidebar';
import HighlightSection from '@/components/home_dashboard/highlights/highlights';
import EnergyChart from '@/components/home_dashboard/energy_chart/energy_chart';
import WeatherConditions from '@/components/home_dashboard/weather_conditions/weather_conditions';
import XAIExplanation from '@/components/home_dashboard/xai_explanation/xai_explanation';
import { WeatherData } from '@/lib/types';


const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolarData()
      .then((fetchedData) => {
        const sortedData = fetchedData.sort((a, b) => a.Time.getTime() - b.Time.getTime());
        setData(sortedData);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  // Calculate average data
  const averageData: WeatherData | null = data.length > 0
  ? {
      temp: parseFloat((data.reduce((acc, d) => acc + d.temp, 0) / data.length).toFixed(1)),
      GHI: Math.round(data.reduce((acc, d) => acc + d.GHI, 0) / data.length),
      humidity: Math.round(data.reduce((acc, d) => acc + d.humidity, 0) / data.length),
      wind_speed: parseFloat((data.reduce((acc, d) => acc + d.wind_speed, 0) / data.length).toFixed(1)),
      rain_1h: parseFloat((data.reduce((acc, d) => acc + d.rain_1h, 0) / data.length).toFixed(1)),
      clouds_all: Math.round(data.reduce((acc, d) => acc + d.clouds_all, 0) / data.length),
      Time: data[data.length - 1].Time // Use latest timestamp
    }
  : null;

  // Set fixed time range (24 hours by default)
  const getTimeRange = () => {
    const startDate = new Date('2018-06-01T00:00:00');
    const endDate = new Date('2018-06-07T23:59:59');
    return { startDate, endDate };
  };

  const { startDate, endDate } = getTimeRange();

  // Filter data within the time window
  const filteredData = data.filter(d => {
    if (!startDate || !endDate) return false;
    return d.Time >= startDate && d.Time <= endDate;
  });

  // Use filtered data without fallback to full dataset
  const displayData = filteredData.length > 0
    ? filteredData
    : data;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 max-w-7xl mx-auto space-y-1">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <HighlightSection data={displayData} />
          </div>
          <div>
            {averageData ? (
              <WeatherConditions data={averageData} />
            ) : (
              <div className="animate-pulse bg-gray-200 h-48 rounded-lg" />
            )}
          </div>
        </div>

        {/* New Row for Chart and XAI */}
        <div className="grid md:grid-cols-[70%_30%] gap-2">
          <div>
            <EnergyChart
              data={displayData}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <XAIExplanation />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;