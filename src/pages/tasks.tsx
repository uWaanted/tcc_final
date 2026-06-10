import {
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import type { InsertActivity } from "@shared/schema";

type ActivityTask = InsertActivity & {
  id: string;
};

const initialTasks: ActivityTask[] = [
  {
    id: "1",
    title: "Participação em palestra",
    category: "Palestra",
    description: "Palestra sobre inovação tecnológica",
    hours: "4",
    activityDate: new Date("2024-01-14"),
    certificate: "palestra.pdf",
    status: "approved",
  },
  {
    id: "2",
    title: "Curso online",
    category: "Curso",
    description: "Curso de fundamentos de React",
    hours: "6",
    activityDate: new Date("2024-01-20"),
    certificate: "react.pdf",
    status: "pending",
  },
  {
    id: "3",
    title: "Workshop acadêmico",
    category: "Workshop",
    description: "Workshop sobre pesquisa científica",
    hours: "3",
    activityDate: new Date("2024-01-25"),
    certificate: "workshop_academico.pdf",
    status: "pending",
  },
];

export default function Tasks() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<ActivityTask[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );

    if (savedTasks.length === 0) {
      localStorage.setItem("facilita-tasks", JSON.stringify(initialTasks));

      setTasks(initialTasks);
    } else {
      setTasks(savedTasks);
    }
  }, []);

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);

    localStorage.setItem(
      "facilita-tasks",
      JSON.stringify(
        updatedTasks.filter((task) => !["1", "2", "3"].includes(task.id))
      )
    );
  };

  const approvedTasks = tasks.filter((t) => t.status === "approved");

  const pendingTasks = tasks.filter((t) => t.status === "pending");

  const totalHours = approvedTasks.reduce((sum, t) => sum + Number(t.hours), 0);

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
            <ArrowLeft size={20} />
          </Button>

          <h1 className="text-2xl font-bold ml-2">Minhas Atividades</h1>
        </div>

        <Button size="sm" onClick={() => setLocation("/new-task")}>
          <Plus size={16} className="mr-1" />
          Adicionar
        </Button>
      </div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-1" />
            <p className="text-xl font-bold">{approvedTasks.length}</p>
            <p className="text-xs text-muted-foreground">Aprovadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto text-orange-600 mb-1" />
            <p className="text-xl font-bold">{pendingTasks.length}</p>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">{totalHours}h</p>
            <p className="text-xs text-muted-foreground">Horas validadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Atividades */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{task.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">
                    {task.hours}h •{" "}
                    {new Date(task.activityDate).toLocaleDateString("pt-BR")}
                  </p>

                  {task.certificate && (
                    <p className="text-xs text-blue-600 mt-1">
                      📎 {task.certificate}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLocation(`/edit-task/${task.id}`)}
                    >
                      <Pencil size={14} className="mr-1" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Badge variant="outline">{task.category}</Badge>

                  <Badge>
                    {task.status === "approved"
                      ? "Aprovada"
                      : task.status === "rejected"
                      ? "Rejeitada"
                      : "Em análise"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vazio */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma atividade cadastrada</p>
          <Button className="mt-4">
            <Plus size={16} className="mr-1" />
            Adicionar atividade
          </Button>
        </div>
      )}
    </main>
  );
}
