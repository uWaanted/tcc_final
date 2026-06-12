import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditEvent() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/edit-event/:id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [category, setCategory] = useState("");
  const [group, setGroup] = useState("1");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("upcoming");

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("facilita-events") || "[]");

    const event = events.find((e: any) => e.id === params?.id);

    if (!event) {
      alert("Evento não encontrado.");
      setLocation("/events");
      return;
    }

    setTitle(event.title || "");
    setDescription(event.description || "");
    setLocationEvent(event.location || "");
    setCategory(event.category || "");
    setGroup(String(event.group || 1));
    setStatus(event.status || "upcoming");

    if (event.date) {
      setDate(event.date);
    }
  }, [params?.id, setLocation]);

  const handleSave = () => {
    if (!title || !category || !locationEvent || !date) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const events = JSON.parse(localStorage.getItem("facilita-events") || "[]");

    const updatedEvents = events.map((event: any) =>
      event.id === params?.id
        ? {
            ...event,
            title,
            description,
            location: locationEvent,
            category,
            group: Number(group),
            date,
            status,
          }
        : event
    );

    localStorage.setItem("facilita-events", JSON.stringify(updatedEvents));

    alert("Evento atualizado com sucesso!");
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
          <h1 className="text-2xl font-bold">Editar Evento</h1>
          <p className="text-muted-foreground">Atualize os dados do evento</p>
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
              value={locationEvent}
              onChange={(e) => setLocationEvent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria *</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Grupo *</Label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="1">Grupo 1</option>
              <option value="2">Grupo 2</option>
              <option value="3">Grupo 3</option>
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
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="upcoming">Próximo</option>
              <option value="ongoing">Em andamento</option>
              <option value="completed">Finalizado</option>
            </select>
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
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
