import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date?: string;
}

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});

  const getTasks = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditForm(task);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === editingId ? { ...t, ...editForm } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    cancelEditing();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <a href="/tasks/create" className="bg-blue-600 text-white px-4 py-2 rounded">
        + Add Task
      </a>
      <ul className="mt-4 space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-3 rounded">
            {editingId === task.id ? (
              <div className="space-y-2">
                <input
                  className="border p-1 w-full"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
                <textarea
                  className="border p-1 w-full"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <select
                  className="border p-1 w-full"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <input
                  type="date"
                  className="border p-1 w-full"
                  value={editForm.due_date || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm, due_date: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <strong>{task.title}</strong> — {task.status}
                <div className="text-sm text-gray-600">{task.description}</div>
                {task.due_date && (
                  <div className="text-sm text-gray-400">Due: {task.due_date}</div>
                )}
                <button
                  className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
