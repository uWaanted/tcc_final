import { AlertTriangle } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/use-network-status';

export default function OfflineMessage() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-4 right-4 bg-orange-500 text-white rounded-lg p-3 z-40" data-testid="message-offline">
      <div className="flex items-center">
        <AlertTriangle className="mr-2" size={16} />
        <span className="text-sm">Você está offline. Algumas funcionalidades podem estar limitadas.</span>
      </div>
    </div>
  );
}
