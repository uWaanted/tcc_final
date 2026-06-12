import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InsertActivity } from "@shared/schema";
import {
  ActivityGroup,
  GROUPS,
  getCategoriesByGroup,
} from "@/mocks/activityCategories";

export default function NewTask() {
  const [, setLocation] = useLocation();

  const [category, setCategory] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<ActivityGroup>("group1");

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [certificate, setCertificate] = useState("");

  const categories = getCategoriesByGroup(selectedGroup);
  const selectedActivity = categories.find(
    (activity) => activity.name === category
  );

  const handleSave = () => {
    if (!category || !quantity || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const existingTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );

    const currentCategoryPoints = existingTasks
      .filter((t: any) => t.category === category)
      .reduce((sum: number, t: any) => sum + Number(t.points || 0), 0);

    const newPoints = (selectedActivity?.points ?? 0) * Number(quantity);

    const maxPoints = selectedActivity?.maxPoints ?? 0;

    if (currentCategoryPoints + newPoints > maxPoints) {
      alert(
        `Limite excedido.\n\n` +
          `Você já possui ${currentCategoryPoints} ponto(s) nesta atividade.\n` +
          `O limite máximo é ${maxPoints} ponto(s).`
      );

      return;
    }

    const task: InsertActivity & { id: string } = {
      id: Date.now().toString(),
      group: selectedGroup,
      title: category,
      category,
      description,
      quantity,
      points: newPoints.toString(),
      maxPoints: maxPoints.toString(),
      unit: selectedActivity?.unit ?? "",
      activityDate: new Date(date),
      certificate,
      status: "registered",
    };

    existingTasks.push(task);

    localStorage.setItem("facilita-tasks", JSON.stringify(existingTasks));

    alert("Atividade cadastrada com sucesso!");

    setLocation("/tasks");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/tasks")}>
          <ArrowLeft size={20} />
        </Button>

        <div>
          <h1 className="text-2xl font-bold">Nova Atividade</h1>

          <p className="text-muted-foreground">
            Cadastre uma atividade complementar.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-3">
            <Label>Grupo *</Label>

            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={selectedGroup === "group1" ? "default" : "outline"}
                onClick={() => {
                  setSelectedGroup("group1");
                  setCategory("");
                }}
              >
                Grupo 1
              </Button>

              <Button
                type="button"
                variant={selectedGroup === "group2" ? "default" : "outline"}
                onClick={() => {
                  setSelectedGroup("group2");
                  setCategory("");
                }}
              >
                Grupo 2
              </Button>

              <Button
                type="button"
                variant={selectedGroup === "group3" ? "default" : "outline"}
                onClick={() => {
                  setSelectedGroup("group3");
                  setCategory("");
                }}
              >
                Grupo 3
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">{GROUPS[selectedGroup].title}</h3>

                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Mínimo: {GROUPS[selectedGroup].minPoints} pontos</p>

                  <p>Máximo: {GROUPS[selectedGroup].maxPoints} pontos</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label>Tipo de Atividade *</Label>

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
              {selectedActivity && (
                <Card>
                  <CardContent className="p-4">
                    <p className="font-medium">Pontuação da atividade</p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedActivity.points} ponto(s) por{" "}
                      {selectedActivity.unit}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Limite máximo: {selectedActivity.maxPoints} pontos
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>

            <Textarea
              placeholder="Descreva brevemente a atividade realizada"
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
              placeholder="1"
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
              onChange={(e) => setCertificate(e.target.files?.[0]?.name || "")}
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

            <Button className="flex-1" onClick={handleSave}>
              Salvar Atividade
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
