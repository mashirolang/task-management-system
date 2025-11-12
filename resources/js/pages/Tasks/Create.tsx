import React, { useState } from 'react';
import { router } from '@inertiajs/react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date?: string;
}

export default function Create() {
  const [form, setForm] = useState({ title: '', description: '', due_date: '' });

  const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tasks = getTasks();
    const newTask: Task = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      ...form,
      status: 'pending',
    };
    saveTasks([...tasks, newTask]);
    router.visit('/tasks');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="border p-2 w-full"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="date"
          className="border p-2 w-full"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
