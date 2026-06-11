export type ActivityGroup = "group1" | "group2" | "group3";

export interface ActivityCategory {
  id: string;
  group: ActivityGroup;
  name: string;
  description?: string;
  points: number;
  maxPoints: number;
  unit: string;
}

export const GROUPS: Record<
  ActivityGroup,
  {
    title: string;
    minPoints: number;
    maxPoints: number;
    color: string;
  }
> = {
  group1: {
    title: "Formação Social, Humana e Cultural",
    minPoints: 20,
    maxPoints: 30,
    color: "blue",
  },

  group2: {
    title: "Cunho Comunitário e Interesse Coletivo",
    minPoints: 20,
    maxPoints: 30,
    color: "green",
  },

  group3: {
    title: "Iniciação Científica, Tecnológica e Formação Profissional",
    minPoints: 20,
    maxPoints: 40,
    color: "purple",
  },
};

export const activityCategories: ActivityCategory[] = [
  // ==========================================
  // GRUPO 1
  // Formação Social, Humana e Cultural
  // ==========================================

  {
    id: "g1-1",
    group: "group1",
    name: "Atividades esportivas",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-2",
    group: "group1",
    name: "Curso de língua estrangeira",
    points: 5,
    maxPoints: 15,
    unit: "50 horas",
  },

  {
    id: "g1-3",
    group: "group1",
    name: "Atividades artísticas e culturais",
    points: 3,
    maxPoints: 12,
    unit: "atividade",
  },

  {
    id: "g1-4",
    group: "group1",
    name: "Organização de eventos culturais",
    points: 5,
    maxPoints: 10,
    unit: "organização",
  },

  {
    id: "g1-5",
    group: "group1",
    name: "Participação em exposição cultural",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-6",
    group: "group1",
    name: "Intercâmbio nacional",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-7",
    group: "group1",
    name: "Intercâmbio internacional",
    points: 10,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-8",
    group: "group1",
    name: "Participação em palestras, seminários e eventos sociais",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  // ==========================================
  // GRUPO 2
  // Atividades de cunho comunitário
  // e de interesse coletivo
  // ==========================================

  {
    id: "g2-1",
    group: "group2",
    name: "Participação em Diretórios e Centros Acadêmicos, Entidades de Classe, Conselhos, Comissões e Colegiados internos à Instituição",
    points: 5,
    maxPoints: 10,
    unit: "semestre",
  },

  {
    id: "g2-2",
    group: "group2",
    name: "Participação em trabalho eleitoral",
    points: 5,
    maxPoints: 10,
    unit: "turno eleitoral",
  },

  {
    id: "g2-3",
    group: "group2",
    name: "Participação em trabalho voluntário, atividades comunitárias, CIPAs, associações de bairros, escoteiros, brigadas de incêndio e associações escolares",
    points: 2,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-4",
    group: "group2",
    name: "Participação na organização de atividades beneficentes",
    points: 2,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-5",
    group: "group2",
    name: "Doação de sangue",
    points: 5,
    maxPoints: 20,
    unit: "doação",
  },

  {
    id: "g2-6",
    group: "group2",
    name: "Atuação como instrutor em palestras técnicas, seminários e cursos não remunerados",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-7",
    group: "group2",
    name: "Atuação como docente não remunerado em cursos preparatórios e reforço escolar",
    points: 0.5,
    maxPoints: 10,
    unit: "hora",
  },

  {
    id: "g2-8",
    group: "group2",
    name: "Participação em projetos de extensão não remunerados",
    points: 5,
    maxPoints: 10,
    unit: "semestre",
  },

  {
    id: "g2-9",
    group: "group2",
    name: "Participação em projetos de extensão (bolsista)",
    points: 4,
    maxPoints: 12,
    unit: "semestre",
  },

  {
    id: "g2-10",
    group: "group2",
    name: "Participação em ações de extensão não remuneradas com participação da comunidade externa",
    points: 2,
    maxPoints: 12,
    unit: "atividade",
  },

  {
    id: "g2-11",
    group: "group2",
    name: "Participação no Projeto Rondon",
    points: 10,
    maxPoints: 20,
    unit: "atividade",
  },

  // ==========================================
  // GRUPO 3
  // Iniciação Científica, Tecnológica
  // e Formação Profissional
  // ==========================================

  {
    id: "g3-1",
    group: "group3",
    name: "Cursos de fundamento técnico, científico ou de gestão",
    points: 0.5,
    maxPoints: 20,
    unit: "hora",
  },

  {
    id: "g3-2",
    group: "group3",
    name: "Participação como ouvinte em palestras técnico-científicas",
    points: 1,
    maxPoints: 10,
    unit: "palestra",
  },

  {
    id: "g3-3-local",
    group: "group3",
    name: "Participação em eventos técnico-científicos (Local)",
    points: 3,
    maxPoints: 10,
    unit: "evento",
  },

  {
    id: "g3-3-regional",
    group: "group3",
    name: "Participação em eventos técnico-científicos (Regional)",
    points: 4,
    maxPoints: 10,
    unit: "evento",
  },

  {
    id: "g3-3-nacional",
    group: "group3",
    name: "Participação em eventos técnico-científicos (Nacional)",
    points: 5,
    maxPoints: 10,
    unit: "evento",
  },

  {
    id: "g3-3-internacional",
    group: "group3",
    name: "Participação em eventos técnico-científicos (Internacional)",
    points: 6,
    maxPoints: 10,
    unit: "evento",
  },

  {
    id: "g3-4-local",
    group: "group3",
    name: "Apresentador em exposições técnico-científicas (Local)",
    points: 3,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-regional",
    group: "group3",
    name: "Apresentador em exposições técnico-científicas (Regional)",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-nacional",
    group: "group3",
    name: "Apresentador em exposições técnico-científicas (Nacional)",
    points: 10,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-internacional",
    group: "group3",
    name: "Apresentador em exposições técnico-científicas (Internacional)",
    points: 15,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-local",
    group: "group3",
    name: "Publicação em anais de eventos (Local)",
    points: 3,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-regional",
    group: "group3",
    name: "Publicação em anais de eventos (Regional)",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-nacional",
    group: "group3",
    name: "Publicação em anais de eventos (Nacional)",
    points: 10,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-internacional",
    group: "group3",
    name: "Publicação em anais de eventos (Internacional)",
    points: 15,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-local",
    group: "group3",
    name: "Organização de exposições e seminários (Local)",
    points: 3,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-regional",
    group: "group3",
    name: "Organização de exposições e seminários (Regional)",
    points: 4,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-nacional",
    group: "group3",
    name: "Organização de exposições e seminários (Nacional)",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-internacional",
    group: "group3",
    name: "Organização de exposições e seminários (Internacional)",
    points: 6,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-7-primeiro-autor",
    group: "group3",
    name: "Publicação em revista técnica (Primeiro autor)",
    points: 20,
    maxPoints: 40,
    unit: "publicação",
  },

  {
    id: "g3-7-coautor",
    group: "group3",
    name: "Publicação em revista técnica (Coautor)",
    points: 15,
    maxPoints: 40,
    unit: "publicação",
  },

  {
    id: "g3-8",
    group: "group3",
    name: "Registro de propriedade intelectual",
    points: 20,
    maxPoints: 40,
    unit: "registro",
  },

  {
    id: "g3-9",
    group: "group3",
    name: "Projeto de iniciação científica e tecnológica",
    points: 5,
    maxPoints: 20,
    unit: "semestre",
  },

  {
    id: "g3-10",
    group: "group3",
    name: "Estágio não obrigatório na área do curso",
    points: 0.1,
    maxPoints: 15,
    unit: "hora",
  },

  {
    id: "g3-11",
    group: "group3",
    name: "Trabalho com vínculo empregatício na área",
    points: 0.1,
    maxPoints: 15,
    unit: "hora",
  },

  {
    id: "g3-12",
    group: "group3",
    name: "Empreendedor na área do curso",
    points: 10,
    maxPoints: 20,
    unit: "atividade",
  },

  {
    id: "g3-13",
    group: "group3",
    name: "Estágio acadêmico UTFPR (inclui monitoria)",
    points: 5,
    maxPoints: 20,
    unit: "semestre",
  },

  {
    id: "g3-14",
    group: "group3",
    name: "Visitas técnicas organizadas pela UTFPR",
    points: 3,
    maxPoints: 15,
    unit: "visita",
  },

  {
    id: "g3-15",
    group: "group3",
    name: "Instrutor em palestras técnicas e cursos",
    points: 5,
    maxPoints: 15,
    unit: "atividade",
  },

  {
    id: "g3-16",
    group: "group3",
    name: "Participação em Empresa Júnior, Hotel Tecnológico, Incubadora Tecnológica ou Escola Piloto",
    points: 10,
    maxPoints: 20,
    unit: "atividade",
  },

  {
    id: "g3-17-area",
    group: "group3",
    name: "Projetos multidisciplinares na área do curso",
    points: 5,
    maxPoints: 15,
    unit: "semestre",
  },

  {
    id: "g3-17-fora-area",
    group: "group3",
    name: "Projetos multidisciplinares fora da área do curso",
    points: 3,
    maxPoints: 15,
    unit: "semestre",
  },

  {
    id: "g3-18-nacional",
    group: "group3",
    name: "Intercâmbio de estudos (Nacional)",
    points: 10,
    maxPoints: 30,
    unit: "atividade",
  },

  {
    id: "g3-18-internacional",
    group: "group3",
    name: "Intercâmbio de estudos (Internacional)",
    points: 20,
    maxPoints: 30,
    unit: "atividade",
  },
];

export const group1Categories = activityCategories.filter(
  (activity) => activity.group === "group1"
);

export const group2Categories = activityCategories.filter(
  (activity) => activity.group === "group2"
);

export const group3Categories = activityCategories.filter(
  (activity) => activity.group === "group3"
);

export const getCategoriesByGroup = (group: ActivityGroup) => {
  return activityCategories.filter((activity) => activity.group === group);
};
