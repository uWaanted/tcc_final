import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  type: 'toggle' | 'action';
  value?: boolean;
}

export default function Settings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState<Record<string, boolean>>({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
    analytics: false
  });

  const settingsItems: SettingItem[] = [
    {
      id: 'notifications',
      title: 'Notificações',
      description: 'Receber notificações push',
      icon: Bell,
      type: 'toggle',
      value: settings.notifications
    },
    {
      id: 'darkMode',
      title: 'Modo escuro',
      description: 'Usar tema escuro',
      icon: Moon,
      type: 'toggle',
      value: settings.darkMode
    },
    {
      id: 'language',
      title: 'Idioma',
      description: 'Português (Brasil)',
      icon: Globe,
      type: 'action'
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      description: 'Configurações de privacidade',
      icon: Shield,
      type: 'action'
    },
    {
      id: 'help',
      title: 'Ajuda e suporte',
      description: 'Central de ajuda',
      icon: HelpCircle,
      type: 'action'
    }
  ];

  const toggleSetting = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId]
    }));
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
        <h2 className="text-2xl font-bold ml-2">Configurações</h2>
      </div>

      <div className="space-y-4">
        {settingsItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.id} 
              className="card-hover cursor-pointer"
              data-testid={`card-setting-${item.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <IconComponent className="text-accent-foreground" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {item.type === 'toggle' ? (
                    <Switch
                      checked={item.value || false}
                      onCheckedChange={() => toggleSetting(item.id)}
                      data-testid={`switch-${item.id}`}
                    />
                  ) : (
                    <i className="fas fa-chevron-right text-muted-foreground"></i>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          MobileApp PWA v1.0.0
        </p>
      </div>
    </main>
  );
}
