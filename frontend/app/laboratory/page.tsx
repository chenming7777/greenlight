"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import LineChart from '@/components/ui/chart';
import CSVUploader from "@/components/laboratory/CSVUploader";
import PredictionForm from "@/components/laboratory/PredictionForm";
import Sidebar from '@/components/ui/sidebar';


export default function LaboratoryPage() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCSVUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8001/api/predict_csv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setChartData(data.predictions || []);
      setPrediction(data.average_prediction);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8001/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Prediction failed");
      }
      
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      // Add user-friendly error message display
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV Upload Section */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Batch Prediction</h3>
          </CardHeader>
          <CardContent>
            <CSVUploader onUpload={handleCSVUpload} isLoading={isLoading} />
          </CardContent>
        </Card>

        {/* Single Prediction Form */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Single Prediction</h3>
          </CardHeader>
          <CardContent>
            <PredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {prediction && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Prediction Results</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {prediction.toFixed(2)} kWh
              </p>
            </div>
            {chartData.length > 0 && (
              <LineChart
                data={chartData}
                dataKey="predicted_energy"
                nameKey="timestamp"
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}