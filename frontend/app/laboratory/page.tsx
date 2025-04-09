"use client";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import CSVUploader from "@/components/laboratory/CSVUploader";
import PredictionForm from "@/components/laboratory/PredictionForm";
import Sidebar from '@/components/ui/sidebar';


export default function LaboratoryPage() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [shapValues, setShapValues] = useState<Record<string, number> | null>(null);
  const [baseValue, setBaseValue] = useState<number | null>(null);
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

      // Handle CSV download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'predictions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

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
      setShapValues(data.shap_values);
      setBaseValue(data.base_value);

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
          {/* Prediction result */}
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Predicted Energy Generation
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {prediction.toFixed(2)} kWh
              </p>
            </div>

            {/* SHAP values display */}
            {/* SHAP values display */}
            {shapValues && baseValue && (
              <div className="mt-6">
                <h4 className="font-semibold mb-4">SHAP Feature Contributions</h4>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Base value: <span className="font-mono">{baseValue.toFixed(2)}</span>
                  </p>
                  {Object.entries(shapValues)
                    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
                    .map(([feature, value]) => {
                      // Calculate total absolute SHAP values
                      const totalAbsShap = Object.values(shapValues)
                        .reduce((sum, val) => sum + Math.abs(val), 0);
                      // Calculate percentage
                      const percentage = (Math.abs(value) / totalAbsShap) * 100;
                      
                      return (
                        <div key={feature} className="flex justify-between">
                          <span className="font-mono">{feature}</span>
                          <div className="flex gap-4">
                            <span className={
                              `font-semibold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`
                            }>
                              {value.toFixed(2)}
                            </span>
                            <span className="text-gray-500">
                              ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}