import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ActivityGroup,
  GROUPS,
  getCategoriesByGroup,
} from "@/mocks/activityCategories";

export default function EditTask() {
  const [, setLocation] = useLocation();

  const [match, params] = useRoute("/edit-task/:id");

  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup>("group1");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [certificate, setCertificate] = useState("");

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("facilita-tasks") || "[]");

    const task = tasks.find((t: any) => t.id === params?.id);

    if (!task) {
      alert("Atividade não encontrada.");
      setLocation("/tasks");
      return;
    }

    setSelectedGroup(task.group || "group1");
    setCategory(task.category || "");
    setDescription(task.description || "");
    setCertificate(task.certificate || "");
    setQuantity(task.quantity || "1");

    if (task.activityDate) {
      const formattedDate = new Date(task.activityDate)
        .toISOString()
        .split("T")[0];

      setDate(formattedDate);
    }
  }, [params?.id, setLocation]);

  const handleUpdate = () => {
    if (!category || !quantity || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("facilita-tasks") || "[]");

    const updatedTasks = tasks.map((task: any) =>
      task.id === params?.id
        ? {
            ...task,
            title: category,
            group: selectedGroup,
            category,
            quantity,
            points: Math.min(
              (selectedActivity?.points ?? 0) * Number(quantity),
              selectedActivity?.maxPoints ?? 0
            ),
            activityDate: new Date(date),
            description,
            certificate,
          }
        : task
    );

    localStorage.setItem("facilita-tasks", JSON.stringify(updatedTasks));

    alert("Atividade atualizada com sucesso!");

    setLocation("/tasks");
  };

  const categories = getCategoriesByGroup(selectedGroup);

  const selectedActivity = categories.find(
    (activity) => activity.name === category
  );

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/tasks")}>
          <ArrowLeft size={20} />
        </Button>

        <div>
          <h1 className="text-2xl font-bold">Editar Atividade</h1>

          <p className="text-muted-foreground">
            Atualize os dados da atividade.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Grupo *</Label>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={selectedGroup === "group1" ? "default" : "outline"}
                onClick={() => setSelectedGroup("group1")}
              >
                Grupo 1
              </Button>

              <Button
                type="button"
                variant={selectedGroup === "group2" ? "default" : "outline"}
                onClick={() => setSelectedGroup("group2")}
              >
                Grupo 2
              </Button>

              <Button
                type="button"
                variant={selectedGroup === "group3" ? "default" : "outline"}
                onClick={() => setSelectedGroup("group3")}
              >
                Grupo 3
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categoria *</Label>

            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma atividade</option>

              {categories.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>

            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Quantidade de {selectedActivity?.unit || "atividade"} *
            </Label>

            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Data da Atividade *</Label>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Certificado</Label>

            <Input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) =>
                setCertificate(e.target.files?.[0]?.name || certificate)
              }
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setLocation("/tasks")}
            >
              Cancelar
            </Button>

            <Button className="flex-1" onClick={handleUpdate}>
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
