import { ArrowLeft, Plus, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocation } from 'wouter';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Reunião com equipe',
    description: 'Discutir roadmap do projeto',
    completed: false,
    priority: 'high',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Revisar documentação',
    description: 'Atualizar docs do API',
    completed: true,
    priority: 'medium',
    dueDate: '2024-01-14'
  },
  {
    id: '3',
    title: 'Implementar feature',
    description: 'Nova funcionalidade do PWA',
    completed: false,
    priority: 'high',
    dueDate: '2024-01-16'
  }
];

export default function Tasks() {
  const [, setLocation] = useLocation();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'medium':
        return <Clock className="text-yellow-500" size={16} />;
      default:
        return <Check className="text-green-500" size={16} />;
    }
  };

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
          <h2 className="text-2xl font-bold ml-2">Tarefas</h2>
        </div>
        <Button size="sm" data-testid="button-add-task">
          <Plus size={16} className="mr-1" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card 
            key={task.id} 
            className={`transition-all ${task.completed ? 'opacity-60' : ''}`}
            data-testid={`card-task-${task.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                  data-testid={`checkbox-task-${task.id}`}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-medium ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </h3>
                    {getPriorityIcon(task.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
          <Button className="mt-4" data-testid="button-create-first-task">
            <Plus size={16} className="mr-1" />
            Criar primeira tarefa
          </Button>
        </div>
      )}
    </main>
  );
}
