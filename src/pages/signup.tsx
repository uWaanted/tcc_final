import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { signupSchema, type SignupData } from "@shared/schema";
import { Eye, EyeOff, BookOpen, CheckCircle } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "student",
    },
  });

  const onSubmit = (data: SignupData) => {
    setError("");

    const users: any[] = JSON.parse(
      localStorage.getItem("facilita-users") || "[]"
    );

    const email = data.email.toLowerCase();

    const emailExists = users.some((u) => u.email.toLowerCase() === email);

    if (emailExists) {
      setError("Erro ao criar conta. Email já cadastrado.");
      return;
    }

    const newUser = {
      email,
      username: data.username,
      password: data.password,
      role: data.role,
    };

    users.push(newUser);

    localStorage.setItem("facilita-users", JSON.stringify(users));

    setSuccess(true);

    setTimeout(() => {
      setLocation("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <BookOpen className="text-primary-foreground" size={32} />
          </div>

          <CardTitle className="text-2xl font-bold text-primary">
            FACILITA HORAS
          </CardTitle>

          <p className="text-muted-foreground">Informe seus dados a seguir:</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de usuário</Label>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={watch("role") === "student" ? "default" : "outline"}
                  onClick={() => setValue("role", "student")}
                >
                  Sou Aluno
                </Button>

                <Button
                  type="button"
                  variant={watch("role") === "teacher" ? "default" : "outline"}
                  onClick={() => setValue("role", "teacher")}
                >
                  Sou Professor
                </Button>
              </div>

              {errors.role && (
                <p className="text-sm text-red-500">{errors.role.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>

              <Input {...register("email")} />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Nome Completo</Label>

              <Input {...register("username")} />

              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Confirmação de senha</Label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>

              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />

                <AlertDescription className="text-green-700">
                  Conta criada com sucesso!
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Registrar-se
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Button
                type="button"
                variant="link"
                onClick={() => setLocation("/login")}
              >
                Fazer login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
