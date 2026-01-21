import {
  ArrowLeft,
  Mail,
  Camera,
  LogOut,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedImage = localStorage.getItem("profile-image");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("facilita-user");
    window.location.reload();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setProfileImage(base64);
      localStorage.setItem("profile-image", base64);
    };
    reader.readAsDataURL(file);
  };

  const initials = user.username
    ? user.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "U";

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Perfil do Aluno</h1>
      </div>

      {/* Perfil */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                {profileImage ? (
                  <AvatarImage src={profileImage} />
                ) : (
                  <AvatarFallback className="text-2xl">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>

              <label className="absolute -bottom-2 -right-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
                <Button size="sm" className="rounded-full w-8 h-8 p-0" asChild>
                  <span>
                    <Camera size={14} />
                  </span>
                </Button>
              </label>
            </div>

            <h3 className="text-xl font-bold">{user.username}</h3>
            <p className="text-muted-foreground">Estudante cadastrado</p>
          </div>
        </CardContent>
      </Card>

      {/* Resumo de Horas */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo das Horas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-center">
          <div>
            <CheckCircle className="mx-auto text-green-600 mb-1" size={22} />
            <p className="text-xl font-bold">42h</p>
            <p className="text-xs text-muted-foreground">Concluídas</p>
          </div>
          <div>
            <Clock className="mx-auto text-orange-600 mb-1" size={22} />
            <p className="text-xl font-bold">18h</p>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </div>
        </CardContent>
      </Card>

      {/* Informações da Conta */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Mail className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card className="cursor-pointer" onClick={handleLogout}>
        <CardContent className="p-4 flex items-center space-x-3 text-red-600">
          <LogOut size={20} />
          <span>Sair da conta</span>
        </CardContent>
      </Card>
    </main>
  );
}
