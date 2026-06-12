import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  ArrowLeft,
  HelpCircle,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const faqCategories = [
  {
    id: "1",
    title: "Cadastro de Atividades",
    description: "Como registrar atividades complementares",
    icon: FileText,
  },

  {
    id: "2",
    title: "Pontuação",
    description: "Regras de cálculo e limites de pontos",
    icon: CheckCircle,
  },

  {
    id: "3",
    title: "Validação",
    description: "Entrega de documentos e análise final",
    icon: Clock,
  },
];

const faqItems = [
  {
    question: "Como cadastrar uma atividade complementar?",
    answer:
      "Acesse 'Minhas Atividades', clique em 'Adicionar' e selecione o grupo e a atividade correspondente. Informe a quantidade realizada e anexe o comprovante.",
  },

  {
    question: "Como a pontuação é calculada?",
    answer:
      "Cada atividade possui uma quantidade de pontos definida pelo regulamento do curso. O sistema calcula automaticamente a pontuação com base na quantidade informada.",
  },

  {
    question: "Posso ultrapassar o limite de pontos de uma atividade?",
    answer:
      "Não. O sistema bloqueia cadastros que excedam a pontuação máxima permitida para cada atividade.",
  },

  {
    question: "Quando minhas horas são validadas?",
    answer:
      "O cadastro serve para acompanhamento durante o curso. A validação oficial ocorre no momento da entrega da documentação para análise da coordenação.",
  },

  {
    question: "Preciso anexar comprovantes?",
    answer:
      "Sim. Recomenda-se anexar certificados, declarações ou comprovantes para facilitar a conferência das atividades realizadas.",
  },

  {
    question: "Como acompanhar meu progresso?",
    answer:
      "Na tela 'Minhas Atividades' existe uma barra de progresso que mostra a quantidade de pontos obtidos em relação ao mínimo exigido para cada grupo.",
  },
  {
    question: "Qual a diferença entre pontos mínimos e máximos?",
    answer:
      "Cada grupo possui uma pontuação mínima obrigatória para conclusão das horas complementares e uma pontuação máxima considerada para contabilização.",
  },
  {
    question: "Posso cadastrar a mesma atividade mais de uma vez?",
    answer:
      "Sim, desde que o limite máximo de pontuação definido para a atividade não seja ultrapassado.",
  },
  {
    question: "O que acontece quando atinjo o limite de uma atividade?",
    answer:
      "O sistema bloqueia novos cadastros para aquela atividade quando o limite máximo de pontos permitido já foi atingido.",
  },
  {
    question: "O que são os grupos de atividades?",
    answer:
      "As atividades complementares são divididas em grupos definidos pelo regulamento do curso. Cada grupo possui pontuação mínima e máxima que deve ser respeitada para integralização das horas complementares.",
  },
];

export default function Explore() {
  const [, setLocation] = useLocation();

  const [search, setSearch] = useState("");

  const filteredFaq = faqItems.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  <Input
    placeholder="Pesquisar dúvida..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />;

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Ajuda e FAQ</h1>
      </div>

      {/* Categorias */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Categorias</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.id}>
                <CardContent className="p-4 flex gap-3">
                  <Icon className="text-primary" size={22} />
                  <div>
                    <p className="font-medium">{cat.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold">Não encontrou sua resposta?</h3>

          <p className="text-sm text-muted-foreground">
            Entre em contato com a coordenação do curso.
          </p>
        </CardContent>
      </Card>
      <div className="space-y-2">
        <Input
          placeholder="Pesquisar dúvida..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible>
          {filteredFaq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>

              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
