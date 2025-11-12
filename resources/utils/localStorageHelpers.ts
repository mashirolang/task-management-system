interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date?: string;
  }
  
  
export const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
  export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  