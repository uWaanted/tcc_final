import {
  ArrowLeft,
  Clock,
  CheckCircle,
  ListChecks,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const stats = [
  {
    title: "Horas Concluídas",
    value: "42h",
    description: "Horas já validadas",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Horas Pendentes",
    value: "18h",
    description: "Aguardando aprovação",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Atividades",
    value: "6",
    description: "Atividades cadastradas",
    icon: ListChecks,
    color: "text-blue-600",
  },
  {
    title: "Eventos",
    value: "4",
    description: "Eventos participados",
    icon: Calendar,
    color: "text-purple-600",
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Dashboard</h1>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 flex items-center gap-4">
                <Icon className={stat.color} size={28} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Geral</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Total exigido pelo curso</span>
            <span className="font-medium">60h</span>
          </div>
          <div className="flex justify-between">
            <span>Horas concluídas</span>
            <span className="font-medium text-green-600">42h</span>
          </div>
          <div className="flex justify-between">
            <span>Horas restantes</span>
            <span className="font-medium text-orange-600">18h</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
