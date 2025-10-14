import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'wouter';
import { signupSchema, type SignupData } from '@shared/schema';
import { Eye, EyeOff, BookOpen, CheckCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function Signup() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await apiRequest('POST', '/api/auth/signup', data);
      return response.json();
    },
    onSuccess: () => {
      setLocation('/login');
    },
    onError: (error: any) => {
      console.error('Signup failed:', error);
    }
  });

  const onSubmit = (data: SignupData) => {
    signupMutation.mutate(data);
  };

  const password = watch('password');

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
          <p className="text-muted-foreground">
            Informe seus dados a seguir:
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                data-testid="input-email"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Nome de usuário"
                {...register('username')}
                data-testid="input-username"
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  data-testid="input-password"
                  className={errors.password ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmação de senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  data-testid="input-confirm-password"
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  data-testid="button-toggle-confirm-password"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {signupMutation.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Erro ao criar conta. Email já pode estar em uso.
                </AlertDescription>
              </Alert>
            )}

            {signupMutation.isSuccess && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-300">
                  Conta criada com sucesso! Redirecionando para o login...
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={signupMutation.isPending}
              data-testid="button-signup"
            >
              {signupMutation.isPending ? 'Criando conta...' : 'Registrar-se'}
            </Button>

            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                Já tem uma conta?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-primary"
                  onClick={() => setLocation('/login')}
                  data-testid="link-back-to-login"
                >
                  Fazer login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}