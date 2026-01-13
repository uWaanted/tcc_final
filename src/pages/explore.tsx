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
    title: "Como registrar horas?",
    description: "Aprenda como cadastrar atividades complementares no sistema",
    icon: FileText,
  },
  {
    id: "2",
    title: "Atividades válidas",
    description: "Veja quais tipos de atividades são aceitas pelo curso",
    icon: CheckCircle,
  },
  {
    id: "3",
    title: "Prazos e limites",
    description: "Entenda os prazos para envio e validação das horas",
    icon: Clock,
  },
];

const faqItems = [
  {
    question: "Como registrar uma atividade?",
    answer:
      "Acesse a aba Atividades e clique em Adicionar para cadastrar uma nova atividade.",
  },
  {
    question: "Quantas horas complementares são necessárias?",
    answer:
      "Cada curso define uma carga horária específica. Consulte o regulamento do seu curso.",
  },
  {
    question: "Quais documentos são aceitos?",
    answer:
      "Certificados, declarações e comprovantes oficiais emitidos pela instituição organizadora.",
  },
];

export default function Explore() {
  const [, setLocation] = useLocation();

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

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <HelpCircle size={18} />
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
