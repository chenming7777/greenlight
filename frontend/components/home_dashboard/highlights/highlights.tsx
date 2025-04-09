// components/home_dashboard/highlights/highlights.tsx
import styles from './highlights.module.css';
import { Bolt, Mountain, Gauge, Leaf } from 'lucide-react';
import { SolarData } from '@/lib/types';

interface Props {
  data: SolarData[];
}

const HighlightSection = ({ data }: Props) => {
  const totalEnergy = data.reduce((sum, d) => sum + d.energy, 0);
  const average = (totalEnergy / data.length).toFixed(2);
  const peakGeneration = Math.max(...data.map((d) => d.energy));
  const co2Saved = (totalEnergy * 0.0005).toFixed(2);

  return (
    <div className={styles.container}>
      {/* New Title */}
      <h3 className={styles.title}>Performance Highlight</h3>

      {/* Existing Columns */}
      <div className={styles.columns}>
        {/* Column 1 */}
        <div className={styles.column}>
          <div className={styles.metric}>
            <Bolt className="text-yellow-500" size={32} />
            <div className={styles.value}>{average || 0} Wh</div>
            <div className={styles.label}>Average Generation</div>
          </div>

          <div className={styles.metric}>
            <Gauge className="text-green-500" size={32} />
            <div className={styles.value}>{totalEnergy.toFixed(0)} Wh</div>
            <div className={styles.label}>Total Generation</div>
          </div>
        </div>

        {/* Column 2 */}
        <div className={styles.column}>
          <div className={styles.metric}>
            <Mountain className="text-blue-500" size={32} />
            <div className={styles.value}>{peakGeneration} Wh</div>
            <div className={styles.label}>Peak Generation</div>
          </div>

          <div className={styles.metric}>
            <Leaf className="text-teal-500" size={32} />
            <div className={styles.value}>{co2Saved} kg</div>
            <div className={styles.label}>CO₂ Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;