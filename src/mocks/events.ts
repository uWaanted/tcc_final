export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: "ongoing" | "upcoming" | "completed";
  group: 1 | 2 | 3;
  date: string;
  time: string;
  points: number;
  maxPoints: number;
  unit: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Semana Acadêmica de Tecnologia",
    description:
      "Palestras e oficinas sobre desenvolvimento web, IA e segurança da informação.",
    location: "Auditório Principal - Campus",
    category: "Participação em Evento",
    status: "upcoming",
    group: 1,
    date: "2026-11-15",
    time: "19:30",
    points: 2,
    maxPoints: 10,
    unit: "evento",
  },

  {
    id: "2",
    title: "Projeto de Inclusão Digital",
    description:
      "Atividade extensionista com oficinas de informática para a comunidade.",
    location: "Laboratório de Informática",
    category: "Projeto de Extensão",
    status: "ongoing",
    group: 2,
    date: "2026-10-20",
    time: "18:00",
    points: 5,
    maxPoints: 20,
    unit: "projeto",
  },

  {
    id: "3",
    title: "Palestra sobre LGPD e Segurança",
    description:
      "Discussão sobre proteção de dados e ética na área da tecnologia.",
    location: "Sala 204 - Bloco B",
    category: "Palestra",
    status: "completed",
    group: 1,
    date: "2026-08-10",
    time: "19:00",
    points: 1,
    maxPoints: 10,
    unit: "palestra",
  },
];
