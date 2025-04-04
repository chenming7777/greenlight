import styles from './xai_explanation.module.css';

const XAIExplanation = () => {
  const features = [
    { name: 'GHI', contribution: 45, impact: 'positive' },
    { name: 'Temperature', contribution: 30, impact: 'negative' },
    { name: 'Humidity', contribution: 25, impact: 'positive' },
    { name: 'Wind Speed', contribution: 10, impact: 'negative' },
    { name: 'Cloud Cover', contribution: 20, impact: 'positive' },
    { name: 'Rainfall', contribution: 5, impact: 'negative' }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Prediction Explanation</h3>
      <div className={styles.features}>
        {features.map((f, i) => (
          <div key={i} className={styles.feature}>
            <div className={styles.featureName}>{f.name}</div>
            <div className={`${styles.bar} ${styles[f.impact]}`}
                 style={{ width: `${f.contribution}%` }}>
              {f.contribution}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XAIExplanation;