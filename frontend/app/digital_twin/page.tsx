import DigitalTwinModel from '@/components/digital_twin/digitalTwinModel';
import Sidebar from '@/components/ui/sidebar'

export default function DigitalTwinPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <DigitalTwinModel />
      </main>
    </div>
  );
}