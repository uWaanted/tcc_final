import { Calendar, BarChart3, HelpCircle, LogOut } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

const allMenuItems = [
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

  const user = JSON.parse(localStorage.getItem("facilita-user") || "{}");

  const tasks = JSON.parse(localStorage.getItem("facilita-tasks") || "[]");

  const totalPoints = tasks.reduce(
    (sum: number, task: any) => sum + Number(task.points || 0),
    0
  );

  const recentTasks = [...tasks].slice(-3).reverse();

  const COURSE_GOAL = 70;
  const progressPercentage = Math.min((totalPoints / COURSE_GOAL) * 100, 100);

  const menuItems = allMenuItems.filter((item) => {
    if (user.role === "teacher" && item.id === "activities") {
      return false;
    }

    return true;
  });

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Olá, {user.username?.split(" ")[0]} 👋
          </h1>

          <p className="text-muted-foreground mt-1">
            Bem-vindo ao Facilita Horas
          </p>
        </div>
      </div>

      {/* Resumo Geral */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Progresso Geral</p>

              <h2 className="text-3xl font-bold">{totalPoints} pts</h2>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Meta do curso</p>

              <p className="font-semibold">{COURSE_GOAL} pts</p>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-3 mt-4">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {progressPercentage.toFixed(0)}% concluído
          </p>

          {totalPoints >= COURSE_GOAL && (
            <p className="text-green-600 font-medium mt-2">
              ✓ Meta do curso atingida
            </p>
          )}
        </CardContent>
      </Card>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{tasks.length}</p>

            <p className="text-sm text-muted-foreground">Atividades</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold">{totalPoints}</p>

            <p className="text-sm text-muted-foreground">Pontos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 text-center">
            <p className="text-lg font-semibold">
              {user.role === "teacher" ? "Professor" : user.course || "-"}
            </p>

            <p className="text-sm text-muted-foreground">
              {user.role === "teacher" ? "Perfil" : "Curso"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Atalhos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Atalhos</h2>

        <div
          className={`grid gap-4 ${
            user.role === "teacher" ? "sm:grid-cols-2" : "sm:grid-cols-3"
          }`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:bg-muted transition"
                onClick={() => setLocation(item.path)}
              >
                <CardContent className="p-5 flex items-center gap-4">
                  <Icon className={item.color} size={24} />

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

      {/* Últimas Atividades */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Últimas atividades</h2>

        {recentTasks.length > 0 ? (
          <div className="space-y-3">
            {recentTasks.map((task: any) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{task.title}</p>

                      {task.description && (
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{task.points} pts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Nenhuma atividade cadastrada.
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
