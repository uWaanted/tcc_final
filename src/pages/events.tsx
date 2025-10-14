import { useState } from 'react';
import { ArrowLeft, Search, Filter, Star, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { type Event } from '@shared/schema';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Events() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events', { category: selectedCategory, status: selectedStatus, search: searchQuery }],
    enabled: true,
  });

  const categories = ['Tecnologia', 'Meio Ambiente', 'Saúde', 'Educação', 'Negócios'];
  const statuses = [
    { value: 'ongoing', label: 'Em andamento' },
    { value: 'upcoming', label: 'Próximos' },
    { value: 'completed', label: 'Finalizados' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    const matchesStatus = !selectedStatus || event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const eventsByStatus = {
    ongoing: filteredEvents.filter(e => e.status === 'ongoing'),
    upcoming: filteredEvents.filter(e => e.status === 'upcoming'),
    completed: filteredEvents.filter(e => e.status === 'completed')
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ongoing': return 'Em andamento';
      case 'upcoming': return 'Próximo';
      case 'completed': return 'Finalizado';
      default: return status;
    }
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="card-hover cursor-pointer mb-4" data-testid={`card-event-${event.id}`}>
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover rounded-l-lg"
              data-testid={`img-event-${event.id}`}
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm line-clamp-2">{event.title}</h3>
              <div className="flex items-center ml-2">
                <Star className="text-yellow-500 fill-yellow-500" size={12} />
                <span className="text-xs ml-1">{event.rating}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {event.description}
            </p>
            
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <MapPin size={12} className="mr-1" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar size={12} className="mr-1" />
                <span>{format(new Date(event.date), 'dd/MM', { locale: ptBR })}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                  {getStatusLabel(event.status)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="px-4 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation('/')}
          data-testid="button-back"
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="text-2xl font-bold ml-2">Eventos</h2>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Buscar eventos..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-events"
          />
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('')}
            data-testid="filter-category-all"
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-category-${category}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={selectedStatus === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus('')}
            data-testid="filter-status-all"
          >
            Todos Status
          </Button>
          {statuses.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatus === status.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStatus(status.value)}
              data-testid={`filter-status-${status.value}`}
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Carregando eventos...</p>
        </div>
      )}

      {/* Events Sections */}
      {!isLoading && (
        <div className="space-y-6">
          {/* Eventos em andamento */}
          {eventsByStatus.ongoing.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Eventos em andamento
              </h3>
              {eventsByStatus.ongoing.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {/* Próximos eventos */}
          {eventsByStatus.upcoming.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Próximos
              </h3>
              {eventsByStatus.upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {/* Mais Vistos (mostra os com melhor rating) */}
          {filteredEvents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Star className="text-yellow-500 mr-2" size={20} />
                Mais Vistos
              </h3>
              {filteredEvents
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                .slice(0, 3)
                .map((event) => (
                  <EventCard key={`popular-${event.id}`} event={event} />
                ))}
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Search className="mx-auto text-muted-foreground mb-4" size={48} />
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory || selectedStatus
                  ? 'Nenhum evento encontrado com os filtros aplicados'
                  : 'Nenhum evento disponível'}
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}