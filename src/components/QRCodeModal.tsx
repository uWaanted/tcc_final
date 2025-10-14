import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      const currentUrl = window.location.href;
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        currentUrl
      )}`;
      setQrCodeUrl(qrUrl);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm" data-testid="modal-qr-code">
        <DialogHeader>
          <DialogTitle className="text-center">
            Escaneie para acessar
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <div className="w-48 h-48 mx-auto bg-muted rounded-lg mb-4 qr-container flex items-center justify-center">
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-full h-full object-contain"
                data-testid="img-qr-code"
              />
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Escaneie este QR code com seu dispositivo móvel para acessar o
            aplicativo
          </p>
          <Button
            onClick={onClose}
            className="w-full"
            data-testid="button-close-qr"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
