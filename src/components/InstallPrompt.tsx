import { X } from "lucide-react";
import { Button } from "../components/ui/button";

interface InstallPromptProps {
  isVisible: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export default function InstallPrompt({
  isVisible,
  onInstall,
  onDismiss,
}: InstallPromptProps) {
  if (!isVisible) return null;

  return (
    <div className="install-prompt show fixed bottom-20 left-4 right-4 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg z-40">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium">Instalar App</h4>
          <p className="text-sm opacity-90">
            Adicione à sua tela inicial para acesso rápido
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/20"
            data-testid="button-dismiss-install"
          >
            Agora não
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onInstall}
            className="bg-white text-primary hover:bg-white/90"
            data-testid="button-install"
          >
            Instalar
          </Button>
        </div>
      </div>
    </div>
  );
}
