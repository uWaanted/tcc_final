import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewEvent() {
  const [, setLocation] = useLocation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [points, setPoints] = useState("");
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "completed">(
    "upcoming"
  );

  const handleSave = () => {
    if (!title || !locationText || !category || !date || !hours || !points) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      location: locationText,
      category,
      group,
      date,
      status,
      hours: Number(hours),
      points: Number(points),
    };

    const existingEvents = JSON.parse(
      localStorage.getItem("facilita-events") || "[]"
    );

    existingEvents.push(newEvent);

    localStorage.setItem("facilita-events", JSON.stringify(existingEvents));

    alert("Evento cadastrado com sucesso!");
    setLocation("/events");
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/events")}
        >
          <ArrowLeft size={20} />
        </Button>

        <div>
          <h1 className="text-2xl font-bold">Novo Evento</h1>
          <p className="text-muted-foreground">Cadastre um novo evento</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label>Título *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Local *</Label>
            <Input
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria *</Label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Educação">Educação</option>
              <option value="Saúde">Saúde</option>
              <option value="Negócios">Negócios</option>
              <option value="Meio Ambiente">Meio Ambiente</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Grupo *</Label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={group}
              onChange={(e) => setGroup(Number(e.target.value) as 1 | 2 | 3)}
            >
              <option value={1}>Grupo 1</option>
              <option value={2}>Grupo 2</option>
              <option value={3}>Grupo 3</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Data *</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "upcoming" | "ongoing" | "completed"
                )
              }
            >
              <option value="upcoming">Próximo</option>
              <option value="ongoing">Em andamento</option>
              <option value="completed">Finalizado</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Carga Horária *</Label>
            <Input
              type="number"
              min="1"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Pontos *</Label>
            <Input
              type="number"
              min="1"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setLocation("/events")}
            >
              Cancelar
            </Button>

            <Button className="flex-1" onClick={handleSave}>
              Salvar Evento
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
