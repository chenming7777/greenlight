// app/homepage_dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchSolarData } from '@/lib/data-service';
import Sidebar from '@/components/ui/sidebar';
import HighlightSection from '@/components/home_dashboard/highlights/highlights';
import EnergyChart from '@/components/home_dashboard/energy_chart/energy_chart';
import WeatherConditions from '@/components/home_dashboard/weather_conditions/weather_conditions';
import XAIExplanation from '@/components/home_dashboard/xai_explanation/xai_explanation';

const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolarData()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 max-w-7xl mx-auto space-y-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <HighlightSection data={data} />
          </div>
          <div>
            <WeatherConditions data={data[data.length - 1]} />
          </div>
        </div>

        {/* New Row for Chart and XAI */}
        <div className="grid md:grid-cols-[70%_30%] gap-4"> {/* 70% and 30% columns */}
          <div>
            <EnergyChart data={data} />
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