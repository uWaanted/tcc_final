import { ArrowLeft, Bell, Check, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Bem-vindo ao MobileApp PWA!',
    message: 'Explore todos os recursos disponíveis',
    time: '2h atrás',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'App instalado com sucesso',
    message: 'Agora você pode acessar o app da sua tela inicial',
    time: '1d atrás',
    read: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Nova atualização disponível',
    message: 'Versão 1.1.0 com melhorias de performance',
    time: '3d atrás',
    read: false,
    type: 'info'
  }
];

export default function Notifications() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '📱';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <main className="px-4 py-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation('/')}
            data-testid="button-back"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="ml-2">
            <h2 className="text-2xl font-bold">Notificações</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} não lidas</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              data-testid="button-mark-all-read"
            >
              <Check size={16} />
            </Button>
          )}
          <Button variant="outline" size="sm" data-testid="button-notification-settings">
            <Settings size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}
            data-testid={`card-notification-${notification.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      data-testid={`button-read-${notification.id}`}
                    >
                      <Check size={16} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                    data-testid={`button-delete-${notification.id}`}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-muted-foreground">Nenhuma notificação</p>
        </div>
      )}
    </main>
  );
}
