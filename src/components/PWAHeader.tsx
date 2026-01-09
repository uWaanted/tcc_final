import { Smartphone } from "lucide-react";
import { useNetworkStatus } from "../hooks/use-network-status";

export default function PWAHeader() {
  const isOnline = useNetworkStatus();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Smartphone className="text-primary-foreground text-sm" size={16} />
          </div>
          <h1 className="text-lg font-semibold">Facilita Horas</h1>
        </div>

        <div className="flex items-center space-x-2">
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
              isOnline ? "online-indicator" : "offline-indicator"
            }`}
            data-testid="network-status"
          >
            <i
              className={`fas ${
                isOnline ? "fa-wifi" : "fa-exclamation-triangle"
              } text-xs mr-1`}
            ></i>
            <span>{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
