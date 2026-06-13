import { mockEvents, Event } from "@/mocks/events";
import {
  ArrowLeft,
  Search,
  Calendar,
  MapPin,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

// Tradução dos status
const statusLabels: Record<Event["status"], string> = {
  ongoing: "Em andamento",
  upcoming: "Próximo",
  completed: "Finalizado",
};

export default function Events() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Event["status"] | "">(
    ""
  );
  const [selectedGroup, setSelectedGroup] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedEvents = JSON.parse(
      localStorage.getItem("facilita-events") || "[]"
    );

    if (savedEvents.length === 0) {
      localStorage.setItem("facilita-events", JSON.stringify(mockEvents));
      setEvents(mockEvents);
    } else {
      setEvents(savedEvents);
    }
  }, []);

  const deleteEvent = (id: string) => {
    if (user?.role !== "teacher") {
      alert("Apenas professores podem excluir eventos.");
      return;
    }

    const updatedEvents = events.filter((event) => event.id !== id);

    setEvents(updatedEvents);
    localStorage.setItem("facilita-events", JSON.stringify(updatedEvents));
  };

  const handleParticipate = (event: Event) => {
    const existingTasks = JSON.parse(
      localStorage.getItem("facilita-tasks") || "[]"
    );

    const alreadyRegistered = existingTasks.some(
      (task: any) =>
        task.category === "Evento" &&
        task.description === `Participação no evento: ${event.title}`
    );

    if (alreadyRegistered) {
      alert("Você já está inscrito neste evento.");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      group: `group${event.group}`,
      title: "Participação em evento",
      category: "Evento",
      description: `Participação no evento: ${event.title}`,
      hours: event.hours.toString(),
      points: event.points.toString(),
      activityDate: new Date(),
      certificate: "",
      status: "registered",
    };

    existingTasks.push(newTask);

    localStorage.setItem("facilita-tasks", JSON.stringify(existingTasks));

    alert("Participação registrada em Atividades!");
  };

  const categories = [
    "Tecnologia",
    "Meio Ambiente",
    "Saúde",
    "Educação",
    "Negócios",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || event.category === selectedCategory;

    const matchesStatus = !selectedStatus || event.status === selectedStatus;

    const matchesGroup = selectedGroup === 0 || event.group === selectedGroup;

    return matchesSearch && matchesCategory && matchesStatus && matchesGroup;
  });

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
            <ArrowLeft size={20} />
          </Button>

          <h1 className="text-2xl font-bold ml-2">Eventos</h1>
        </div>

        {user?.role === "teacher" && (
          <Button size="sm" onClick={() => setLocation("/new-event")}>
            <Plus size={16} className="mr-1" />
            Adicionar
          </Button>
        )}
      </div>

      {/* Busca */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />

        <Input
          placeholder="Buscar eventos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grupo */}
      <div className="grid grid-cols-4 gap-2">
        <Button
          size="sm"
          variant={selectedGroup === 0 ? "default" : "outline"}
          onClick={() => setSelectedGroup(0)}
        >
          Todos
        </Button>

        <Button
          size="sm"
          variant={selectedGroup === 1 ? "default" : "outline"}
          onClick={() => setSelectedGroup(1)}
        >
          Grupo 1
        </Button>

        <Button
          size="sm"
          variant={selectedGroup === 2 ? "default" : "outline"}
          onClick={() => setSelectedGroup(2)}
        >
          Grupo 2
        </Button>

        <Button
          size="sm"
          variant={selectedGroup === 3 ? "default" : "outline"}
          onClick={() => setSelectedGroup(3)}
        >
          Grupo 3
        </Button>
      </div>

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto">
        <Button
          size="sm"
          variant={selectedCategory === "" ? "default" : "outline"}
          onClick={() => setSelectedCategory("")}
        >
          Todas
        </Button>

        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Status */}
      <div className="flex gap-2 overflow-x-auto">
        <Button
          size="sm"
          variant={selectedStatus === "" ? "default" : "outline"}
          onClick={() => setSelectedStatus("")}
        >
          Todos Status
        </Button>

        {Object.entries(statusLabels).map(([value, label]) => (
          <Button
            key={value}
            size="sm"
            variant={selectedStatus === value ? "default" : "outline"}
            onClick={() => setSelectedStatus(value as Event["status"])}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Lista */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-semibold text-lg">{event.title}</h3>

                <Badge>{statusLabels[event.status]}</Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-2" />
                {event.location}
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar size={14} className="mr-2" />
                {new Date(event.date).toLocaleDateString("pt-BR")}
              </div>

              <div className="text-sm text-muted-foreground">
                {event.hours}h • {event.points} pontos
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{event.category}</Badge>
                <Badge variant="secondary">Grupo {event.group}</Badge>
              </div>

              <div className="flex gap-2 pt-2 flex-wrap">
                <Button size="sm" onClick={() => handleParticipate(event)}>
                  Participar
                </Button>

                {user?.role === "teacher" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setLocation(`/edit-event/${event.id}`)}
                    >
                      <Pencil size={14} className="mr-1" />
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Excluir
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-16">
          <Calendar className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">Nenhum evento disponível</p>
        </div>
      )}
    </main>
  );
}
