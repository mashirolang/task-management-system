import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date?: string;
}

export default function Edit({ id }: { id: number }) {
  const [form, setForm] = useState<Task>({
    id: 0,
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  });

  const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) setForm(task);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tasks = getTasks();
    const updatedTasks = tasks.map((t) => (t.id === form.id ? form : t));
    saveTasks(updatedTasks);
    router.visit('/tasks');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="border p-2 w-full"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          className="border p-2 w-full"
          value={form.due_date || ''}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
