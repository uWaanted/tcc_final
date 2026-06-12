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
import { ActivityGroup, GROUPS } from "@/mocks/activityCategories";

type ActivityTask = InsertActivity & {
  id: string;
  group: ActivityGroup;
};

const initialTasks: ActivityTask[] = [
  {
    id: "1",
    group: "group1",
    title: "Participação em palestras, seminários e eventos sociais",
    category: "Participação em palestras, seminários e eventos sociais",
    description: "Palestra sobre inovação tecnológica",
    quantity: "4",
    points: "2",
    maxPoints: "10",
    unit: "evento",
    activityDate: new Date("2024-01-14"),
    certificate: "palestra.pdf",
    status: "registered",
  },

  {
    id: "2",
    group: "group2",
    title: "Doação de sangue",
    category: "Doação de sangue",
    description: "Doação realizada no hemocentro",
    quantity: "1",
    points: "5",
    maxPoints: "20",
    unit: "doação",
    activityDate: new Date("2024-01-20"),
    certificate: "doacao.pdf",
    status: "registered",
  },

  {
    id: "3",
    group: "group3",
    title: "Curso de fundamento técnico, científico ou de gestão",
    category: "Curso de fundamento técnico, científico ou de gestão",
    description: "Curso de fundamentos de React",
    quantity: "6",
    points: "3",
    maxPoints: "20",
    unit: "hora",
    activityDate: new Date("2024-01-25"),
    certificate: "react.pdf",
    status: "registered",
  },
];

export default function Tasks() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<ActivityTask[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup>("group1");

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

  const filteredTasks = tasks.filter((task) => task.group === selectedGroup);

  const totalActivities = filteredTasks.length;

  const totalPoints = filteredTasks.reduce(
    (sum, t) => sum + Number(t.points),
    0
  );

  const progressPercentage =
    GROUPS[selectedGroup].minPoints > 0
      ? Math.min((totalPoints / GROUPS[selectedGroup].minPoints) * 100, 100)
      : 0;

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

      {/* Grupos de Atividades */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={selectedGroup === "group1" ? "default" : "outline"}
          onClick={() => setSelectedGroup("group1")}
        >
          Grupo 1
        </Button>

        <Button
          variant={selectedGroup === "group2" ? "default" : "outline"}
          onClick={() => setSelectedGroup("group2")}
        >
          Grupo 2
        </Button>

        <Button
          variant={selectedGroup === "group3" ? "default" : "outline"}
          onClick={() => setSelectedGroup("group3")}
        >
          Grupo 3
        </Button>
      </div>

      {/* Mini Dashboard */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold">{GROUPS[selectedGroup].title}</h3>

          <div className="mt-3 flex gap-6 text-sm">
            <div>
              <span className="text-muted-foreground">Mínimo</span>
              <p className="font-semibold">
                {GROUPS[selectedGroup].minPoints} pts
              </p>
            </div>

            <div>
              <span className="text-muted-foreground">Máximo</span>
              <p className="font-semibold">
                {GROUPS[selectedGroup].maxPoints} pts
              </p>
            </div>

            <div>
              <span className="text-muted-foreground">Obtidos</span>
              <p className="font-semibold">{totalPoints} pts</p>
            </div>
          </div>
          <p className="mt-3">
            Obtidos: <strong>{totalPoints}</strong> pontos
          </p>

          <div className="w-full bg-muted rounded-full h-3 mt-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            {progressPercentage.toFixed(0)}% do mínimo exigido
          </p>

          {totalPoints >= GROUPS[selectedGroup].minPoints && (
            <p className="text-green-600 font-medium mt-2">
              ✓ Pontuação mínima atingida
            </p>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-1" />

            <p className="text-xl font-bold">{totalActivities}</p>

            <p className="text-xs text-muted-foreground">Atividades</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto text-orange-600 mb-1" />

            <p className="text-xl font-bold">
              {progressPercentage.toFixed(0)}%
            </p>

            <p className="text-xs text-muted-foreground">Meta</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold">{totalPoints}</p>

            <p className="text-xs text-muted-foreground">Pontos obtidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Atividades */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{task.title}</h3>

                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                    <span>{task.points} pontos</span>

                    {task.quantity && (
                      <span>
                        {task.quantity} {task.unit}
                      </span>
                    )}

                    <span>
                      {new Date(task.activityDate).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  {task.certificate && (
                    <p className="text-xs text-blue-600 mt-2">
                      📎 {task.certificate}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">
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

                <Badge variant="secondary" className="h-fit whitespace-nowrap">
                  {task.points}/{task.maxPoints} pts
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vazio */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma atividade cadastrada</p>
          <Button className="mt-4" onClick={() => setLocation("/new-task")}>
            <Plus size={16} className="mr-1" />
            Adicionar atividade
          </Button>
        </div>
      )}
    </main>
  );
}
