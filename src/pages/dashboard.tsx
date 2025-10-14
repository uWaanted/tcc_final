import { ArrowLeft, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from 'wouter';

const stats = [
  {
    title: 'Total de Usuários',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Receita',
    value: 'R$ 12,345',
    change: '+8%',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    title: 'Atividade',
    value: '89%',
    change: '+3%',
    icon: Activity,
    color: 'text-purple-600'
  },
  {
    title: 'Crescimento',
    value: '23%',
    change: '+15%',
    icon: TrendingUp,
    color: 'text-orange-600'
  }
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <main className="px-4 py-6 pb-20">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-2xl font-bold ml-2">Dashboard</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} data-testid={`card-stat-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <IconComponent className={stat.color} size={24} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo da Atividade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Novos usuários hoje</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sessions ativas</span>
              <span className="font-medium">1,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Taxa de conversão</span>
              <span className="font-medium">3.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
