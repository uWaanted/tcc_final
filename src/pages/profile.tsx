import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Camera, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation } from 'wouter';

const userProfile = {
  name: 'João Silva',
  email: 'joao@example.com',
  phone: '+55 11 99999-9999',
  location: 'São Paulo, SP',
  avatar: '',
  bio: 'Desenvolvedor apaixonado por tecnologia e inovação.',
  stats: {
    projects: 12,
    tasks: 48,
    achievements: 6
  }
};

const menuItems = [
  { icon: Edit, label: 'Editar Perfil', action: 'edit' },
  { icon: Settings, label: 'Configurações da Conta', action: 'settings' },
  { icon: Camera, label: 'Alterar Foto', action: 'photo' }
];

export default function Profile() {
  const [, setLocation] = useLocation();

  const handleMenuAction = (action: string) => {
    console.log('Menu action:', action);
    // Implement navigation or modal opening based on action
  };

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
        <h2 className="text-2xl font-bold ml-2">Perfil</h2>
      </div>

      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-2xl">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                data-testid="button-change-photo"
              >
                <Camera size={14} />
              </Button>
            </div>
            <h3 className="text-xl font-bold mb-1">{userProfile.name}</h3>
            <p className="text-muted-foreground mb-3">{userProfile.bio}</p>
            
            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userProfile.stats.projects}</p>
                <p className="text-xs text-muted-foreground">Projetos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userProfile.stats.tasks}</p>
                <p className="text-xs text-muted-foreground">Tarefas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userProfile.stats.achievements}</p>
                <p className="text-xs text-muted-foreground">Conquistas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Telefone</p>
              <p className="text-sm text-muted-foreground">{userProfile.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="text-muted-foreground" size={20} />
            <div>
              <p className="font-medium">Localização</p>
              <p className="text-sm text-muted-foreground">{userProfile.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={index} 
              className="card-hover cursor-pointer"
              onClick={() => handleMenuAction(item.action)}
              data-testid={`card-menu-${item.action}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="text-muted-foreground" size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <i className="fas fa-chevron-right text-muted-foreground"></i>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
