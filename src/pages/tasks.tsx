import { ArrowLeft, Plus, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  hours: number;
  date: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Participação em palestra",
    description: "Palestra sobre inovação tecnológica",
    completed: true,
    hours: 4,
    date: "2024-01-14",
  },
  {
    id: "2",
    title: "Curso online",
    description: "Curso de fundamentos de React",
    completed: false,
    hours: 6,
    date: "2024-01-20",
  },
  {
    id: "3",
    title: "Workshop acadêmico",
    description: "Workshop sobre pesquisa científica",
    completed: false,
    hours: 3,
    date: "2024-01-25",
  },
];

export default function Tasks() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter((t) => t.completed);
  const pendingTasks = tasks.filter((t) => !t.completed);

  const totalHours = completedTasks.reduce((sum, t) => sum + t.hours, 0);

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold ml-2">Atividades</h1>
        </div>
        <Button size="sm">
          <Plus size={16} className="mr-1" />
          Adicionar
        </Button>
      </div>

      {/* Mini Dashboard */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-1" />
            <p className="text-xl font-bold">{completedTasks.length}</p>
            <p className="text-xs text-muted-foreground">Concluídas</p>
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
          <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
            <CardContent className="p-4 flex gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {task.hours}h •{" "}
                  {new Date(task.date).toLocaleDateString("pt-BR")}
                </p>
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
