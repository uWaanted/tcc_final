import { ArrowLeft, Mail, Edit, Camera, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("facilita-user");
    setLocation("/login");
  };

  const initials = user.username
    ? user.username
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "U";

  return (
    <main className="px-4 py-6 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-2xl font-bold ml-2">Perfil</h2>
      </div>

      {/* Perfil */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              >
                <Camera size={14} />
              </Button>
            </div>

            <h3 className="text-xl font-bold mb-1">{user.username}</h3>
            <p className="text-muted-foreground mb-3">
              Usuário cadastrado no sistema
            </p>

            {/* Stats simples */}
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground">Projetos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground">Tarefas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-xs text-muted-foreground">Conquistas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Informações da Conta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
      <div className="space-y-2">
        <Card className="cursor-pointer">
          <CardContent className="p-4 flex items-center space-x-3">
            <Edit className="text-muted-foreground" size={20} />
            <span>Editar Perfil</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer">
          <CardContent className="p-4 flex items-center space-x-3">
            <Settings className="text-muted-foreground" size={20} />
            <span>Configurações</span>
          </CardContent>
        </Card>

        <Card className="cursor-pointer" onClick={handleLogout}>
          <CardContent className="p-4 flex items-center space-x-3 text-red-600">
            <LogOut size={20} />
            <span>Sair da conta</span>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
