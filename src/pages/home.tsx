import {
  Calendar,
  BarChart3,
  HelpCircle,
  Share2,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";

const menuItems = [
  {
    id: "events",
    title: "Eventos",
    description: "Encontre eventos para suas horas complementares",
    icon: Calendar,
    path: "/events",
    color: "text-blue-600",
  },
  {
    id: "activities",
    title: "Minhas Atividades",
    description: "Acompanhe suas atividades cadastradas",
    icon: BarChart3,
    path: "/tasks",
    color: "text-green-600",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Tire suas dúvidas sobre horas complementares",
    icon: HelpCircle,
    path: "/explore",
    color: "text-purple-600",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const logout = () => {
    localStorage.removeItem("facilita-user");
    window.location.reload();
  };

  const shareApp = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Facilita Horas",
        text: "Gerencie suas horas complementares facilmente!",
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Facilita Horas</h1>
          <p className="text-muted-foreground">
            Gerencie suas horas complementares
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut size={16} />
        </Button>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          placeholder="Buscar eventos ou atividades..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Atalhos */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Atalhos</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:bg-muted transition"
                onClick={() => setLocation(item.path)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon className={item.color} size={22} />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Ajuda rápida */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Ajuda rápida</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Como registrar horas complementares</p>
          <p>• Quais documentos são aceitos</p>
          <p>• Prazos e limites de entrega</p>
        </div>
      </section>
    </main>
  );
}
