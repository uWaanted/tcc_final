import { Home, Compass, Bell, User } from 'lucide-react';
import { useLocation } from 'wouter';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Início', icon: Home, path: '/' },
  { id: 'events', label: 'Eventos', icon: Compass, path: '/events' },
  { id: 'activities', label: 'Atividades', icon: Bell, path: '/tasks' },
  { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
];

interface BottomNavigationProps {
  onNavigate: (path: string) => void;
}

export default function BottomNavigation({ onNavigate }: BottomNavigationProps) {
  const [location] = useLocation();

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onNavigate(item.path)}
              data-testid={`nav-${item.id}`}
            >
              <IconComponent size={20} className="mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
