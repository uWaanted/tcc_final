import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { InsertActivity } from "@shared/schema";

export default function NewTask() {
  const [, setLocation] = useLocation();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [certificate, setCertificate] = useState("");

  const handleSave = () => {
    if (!title || !category || !hours || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const task: InsertActivity & { id: string } = {
      id: Date.now().toString(),
      title,
      category,
      description,
      hours,
      activityDate: new Date(date),
      certificate,
      status: "pending",
    };

    const existingTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );

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
          <div className="space-y-2">
            <Label>Título *</Label>

            <Input
              placeholder="Ex: Participação em palestra"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria *</Label>

            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>

              <option value="Evento">Evento</option>

              <option value="Curso">Curso</option>

              <option value="Palestra">Palestra</option>

              <option value="Workshop">Workshop</option>

              <option value="Projeto de Extensão">Projeto de Extensão</option>

              <option value="Monitoria">Monitoria</option>

              <option value="Pesquisa Científica">Pesquisa Científica</option>

              <option value="Outro">Outro</option>
            </select>
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
            <Label>Carga Horária *</Label>

            <Input
              type="number"
              min="1"
              placeholder="20"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
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
