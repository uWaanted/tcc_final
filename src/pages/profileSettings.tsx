import { ArrowLeft, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function ProfileSettings() {
  const [, setLocation] = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCourse(user.course || "");
      setInstitution(user.institution || "");
    }
  }, []);

  const handleSave = () => {
    const savedUser = localStorage.getItem("facilita-user");

    if (!savedUser) return;

    const user = JSON.parse(savedUser);

    const updatedUser = {
      ...user,
      username,
      email,
      phone,
      course,
      institution,
    };

    localStorage.setItem("facilita-user", JSON.stringify(updatedUser));

    alert("Perfil atualizado com sucesso!");

    setLocation("/profile");
  };

  return (
    <main className="px-4 py-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLocation("/profile")}
        >
          <ArrowLeft size={20} />
        </Button>

        <h1 className="text-2xl font-bold ml-2">Configurações</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do perfil</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>

            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Telefone</label>

            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Digite seu telefone"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Curso</label>

            <Input
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Ex: Análise e Desenvolvimento de Sistemas"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Instituição</label>

            <Input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Ex: UNISEP"
            />
          </div>

          <Button className="w-full" onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
