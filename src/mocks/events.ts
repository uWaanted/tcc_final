export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: "ongoing" | "upcoming" | "completed";
  group: 1 | 2 | 3;
  date: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Semana Acadêmica de Tecnologia",
    description:
      "Palestras e oficinas sobre desenvolvimento web, IA e segurança da informação.",
    location: "Auditório Principal - Campus",
    category: "Tecnologia",
    status: "upcoming",
    group: 1,
    date: "2024-11-15",
  },
  {
    id: "2",
    title: "Projeto de Inclusão Digital",
    description:
      "Atividade extensionista com oficinas de informática para a comunidade.",
    location: "Laboratório de Informática",
    category: "Educação",
    status: "ongoing",
    group: 2,
    date: "2024-10-20",
  },
  {
    id: "3",
    title: "Palestra sobre LGPD e Segurança",
    description:
      "Discussão sobre proteção de dados e ética na área da tecnologia.",
    location: "Sala 204 - Bloco B",
    category: "Negócios",
    status: "completed",
    group: 1,
    date: "2024-08-10",
  },
];
