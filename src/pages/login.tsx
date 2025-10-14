import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'wouter';
import { loginSchema, type LoginData } from '@shared/schema';
import { Eye, EyeOff, BookOpen } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      return response.json();
    },
    onSuccess: (user) => {
      // Store user in localStorage for this demo
      localStorage.setItem('facilita-user', JSON.stringify(user));
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      setLocation('/');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    }
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
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
          <p className="text-muted-foreground">
            Faça login para acessar sua conta
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

            {loginMutation.error && (
              <Alert variant="destructive">
                <AlertDescription>
                  Email ou senha incorretos. Tente novamente.
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="text-center space-y-2">
              <Button
                type="button"
                variant="link"
                className="text-sm text-muted-foreground"
                data-testid="link-forgot-password"
              >
                Esqueceu a senha?
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-primary"
                  onClick={() => setLocation('/signup')}
                  data-testid="link-create-account"
                >
                  Criar conta
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}