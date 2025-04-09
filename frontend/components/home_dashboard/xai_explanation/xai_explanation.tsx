import { useEffect, useState } from 'react';
import styles from './xai_explanation.module.css';

interface ShapValues {
  [key: string]: number;
}

interface ExplanationResponse {
  shap_values: ShapValues;
  base_value: number;
}

// Default input values (customize these based on your model's requirements)
const DEFAULT_INPUT = {
  GHI: 126.4,
  temp: 21.1,
  pressure: 1017,
  humidity: 70,
  wind_speed: 10.0,
  rain_1h: 10,
  clouds_all: 46,
  Year: 2018,
  Month_num: 6,
  DayOfYear: 154,
  Minute: 45,
  Hour: 8,
  Season: 1,
  Day: 6,
  Week_cos: -0.8610436117673553,
  Energy_lag_1: 1551.0,
  Energy_lag_2: 2430.0
};

const XAIExplanation = ({ predictionInput: propInput }: { predictionInput?: any }) => {
  const [explanationData, setExplanationData] = useState<ShapValues | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputData, setInputData] = useState<any>(propInput || DEFAULT_INPUT);

  useEffect(() => {
    setInputData(propInput || DEFAULT_INPUT);
  }, [propInput]);

  useEffect(() => {
    const fetchExplanation = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:8001/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inputData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ExplanationResponse = await response.json();
        setExplanationData(data.shap_values);
      } catch (error) {
        let errorMessage = 'Unknown error occurred';

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }

        setError(errorMessage);
        console.error('Explanation Error:', error);
      }
    };

    if (inputData) {
      fetchExplanation();
    }
  }, [inputData]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!explanationData) {
    return <div className={styles.loading}>Loading explanation...</div>;
  }

  // Inside the features mapping
  const features = Object.entries(explanationData)
    .map(([name, value]) => ({
      name,
      // Convert to percentage with 1 decimal place
      contribution: parseFloat((Math.abs(value) * 100).toFixed(2)),
      impact: value >= 0 ? 'positive' : 'negative'
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 10);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>XAI Explanation (SHAP)</h3>
      <div className={styles.features}>
        {features.map((f, i) => (
          <div key={i} className={styles.feature}>
            <div className={styles.featureName}>{f.name}</div>
            <div
              className={`${styles.bar} ${styles[f.impact]}`}
              style={{ width: `${f.contribution}%` }}
            >
              {f.contribution}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XAIExplanation;