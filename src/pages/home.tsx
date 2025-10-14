import { Calendar, BarChart3, HelpCircle, Share2, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Menu items for Facilita Horas
const menuItems = [
  {
    id: 'events',
    title: 'Eventos',
    description: 'Encontre eventos para suas horas complementares',
    icon: Calendar,
    path: '/events',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-300'
  },
  {
    id: 'activities',
    title: 'Minhas Atividades', 
    description: 'Acompanhe suas atividades cadastradas',
    icon: BarChart3,
    path: '/tasks',
    bgColor: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-300'
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Tire suas dúvidas sobre horas complementares',
    icon: HelpCircle,
    path: '/explore',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-300'
  }
];

// FAQ Categories for Facilita Horas
const faqCategories = [
  {
    title: 'Como registrar horas?',
    description: 'Aprenda como registrar suas atividades complementares'
  },
  {
    title: 'Documentos necessários',
    description: 'Quais documentos são aceitos como comprovação'
  },
  {
    title: 'Prazos e limites',
    description: 'Entenda os prazos para entrega das horas'
  },
  {
    title: 'Atividades válidas',
    description: 'Quais tipos de atividades são aceitas'
  }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Get user stats
  const { data: stats } = useQuery<{
    completionRate: string;
    attendanceRate: string;
    eventsCompleted: number;
    totalEvents: number;
  }>({
    queryKey: ['/api/user/stats'],
    enabled: true,
  });

  const openFeature = (path: string) => {
    setLocation(path);
  };

  const logout = () => {
    localStorage.removeItem('facilita-user');
    window.location.reload();
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Facilita Horas',
          text: 'Gerencie suas horas complementares facilmente!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <main className="px-4 py-6 pb-20">
      {/* Header with Logout */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Facilita Horas</h2>
          <p className="text-muted-foreground">Gerencie suas horas complementares</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout}
          data-testid="button-logout"
        >
          <LogOut size={16} />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          placeholder="Buscar eventos, atividades..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-search"
        />
      </div>

      {/* Statistics Cards */}
      {stats && stats.completionRate && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center" data-testid="card-stat-completion">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-primary">{stats.completionRate}</div>
              <div className="text-xs text-muted-foreground">Conclusão</div>
            </CardContent>
          </Card>
          <Card className="text-center" data-testid="card-stat-attendance">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-green-600">{stats.attendanceRate}</div>
              <div className="text-xs text-muted-foreground">Presença</div>
            </CardContent>
          </Card>
          <Card className="text-center" data-testid="card-stat-events">
            <CardContent className="p-3">
              <div className="text-2xl font-bold text-blue-600">{stats.eventsCompleted}/{stats.totalEvents}</div>
              <div className="text-xs text-muted-foreground">Eventos</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Menu Navigation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Menu de Navegação</h3>
        <div className="grid gap-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.id} 
                className="card-hover cursor-pointer transition-transform active:scale-95" 
                onClick={() => openFeature(item.path)}
                data-testid={`card-menu-${item.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={item.iconColor} size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <i className="fas fa-chevron-right text-muted-foreground"></i>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2" size={20} />
            FAQ - Perguntas Frequentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqCategories.map((faq, index) => (
            <div 
              key={index} 
              className="p-3 bg-accent/50 rounded-lg cursor-pointer hover:bg-accent transition-colors"
              data-testid={`faq-item-${index}`}
            >
              <h5 className="font-medium text-sm">{faq.title}</h5>
              <p className="text-xs text-muted-foreground mt-1">{faq.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="bg-primary text-primary-foreground rounded-lg p-4 font-medium text-center active:scale-95 transition-transform h-auto flex-col space-y-2" 
          onClick={shareApp}
          data-testid="button-share"
        >
          <Share2 size={20} />
          <span>Compartilhar App</span>
        </Button>
        <Button 
          variant="outline"
          className="bg-card border border-border rounded-lg p-4 font-medium text-center active:scale-95 transition-transform h-auto flex-col space-y-2" 
          onClick={() => setLocation('/events')}
          data-testid="button-browse-events"
        >
          <Calendar size={20} />
          <span>Ver Eventos</span>
        </Button>
      </div>
    </main>
  );
}
