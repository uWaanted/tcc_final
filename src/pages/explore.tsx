import { ArrowLeft, Search, Star, TrendingUp, BookOpen, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLocation } from 'wouter';

const categories = [
  { id: '1', title: 'Tendências', icon: TrendingUp, count: 24 },
  { id: '2', title: 'Favoritos', icon: Star, count: 12 },
  { id: '3', title: 'Artigos', icon: BookOpen, count: 156 },
  { id: '4', title: 'Vídeos', icon: Video, count: 89 }
];

const featuredItems = [
  {
    id: '1',
    title: 'Como criar um PWA',
    description: 'Guia completo para desenvolvimento de Progressive Web Apps',
    category: 'Tutorial',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Mobile-First Design',
    description: 'Melhores práticas para design responsivo',
    category: 'Design',
    readTime: '8 min'
  },
  {
    id: '3',
    title: 'Performance Optimization',
    description: 'Técnicas para otimizar aplicações web',
    category: 'Desenvolvimento',
    readTime: '12 min'
  }
];

export default function Explore() {
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
        <h2 className="text-2xl font-bold ml-2">Explorar</h2>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Input 
          placeholder="Buscar conteúdo..." 
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id} 
              className="card-hover cursor-pointer"
              data-testid={`card-category-${category.id}`}
            >
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="text-primary" size={24} />
                </div>
                <h3 className="font-medium mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.count} itens</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4">Conteúdo em Destaque</h3>
      </div>

      <div className="space-y-4">
        {featuredItems.map((item) => (
          <Card 
            key={item.id} 
            className="card-hover cursor-pointer"
            data-testid={`card-featured-${item.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.readTime}</span>
                  </div>
                  <h4 className="font-medium mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <i className="fas fa-chevron-right text-muted-foreground ml-4"></i>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
