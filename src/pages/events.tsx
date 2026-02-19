import { mockEvents, Event } from "@/mocks/events";
import { useState } from "react";
import { ArrowLeft, Search, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

// 🔹 Tradução dos status (camada de apresentação)
const statusLabels: Record<Event["status"], string> = {
  ongoing: "Em andamento",
  upcoming: "Próximo",
  completed: "Finalizado",
};

export default function Events() {
  const [, setLocation] = useLocation();

  const [events] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<Event["status"] | "">(
    ""
  );

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

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Eventos</h1>
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
          <Card key={event.id} className="cursor-pointer">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">{event.title}</h3>

              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-1" />
                {event.location}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">{event.category}</Badge>
                <Badge>{statusLabels[event.status]}</Badge>
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
