import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("facilita-user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, []);

  const handleSave = () => {
    const savedUser = localStorage.getItem("facilita-user");
    if (!savedUser) return;

    const user = JSON.parse(savedUser);

    const updatedUser = {
      ...user,
      email,
      phone,
    };

    localStorage.setItem("facilita-user", JSON.stringify(updatedUser));
    alert("Informações atualizadas com sucesso!");
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
          <CardTitle>Alterar Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <Button className="w-full" onClick={handleSave}>
            <Save size={16} className="mr-2" />
            Salvar Alterações
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
