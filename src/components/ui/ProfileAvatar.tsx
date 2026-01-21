import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileAvatar() {
  const [image, setImage] = useState<string | null>(null);

  // 🔹 Carrega imagem salva
  useEffect(() => {
    const savedImage = localStorage.getItem("profile-image");
    if (savedImage) setImage(savedImage);
  }, []);

  // 🔹 Quando o usuário escolhe uma imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
      localStorage.setItem("profile-image", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar className="h-24 w-24">
        {image ? (
          <AvatarImage src={image} alt="Foto de perfil" />
        ) : (
          <AvatarFallback>U</AvatarFallback>
        )}
      </Avatar>

      <label>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
        <Button variant="outline" asChild>
          <span>Selecionar imagem</span>
        </Button>
      </label>
    </div>
  );
}
