import React, { useState, useEffect, Fragment } from "react";
import { Disclosure } from "@headlessui/react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Error loading tasks: ' + err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === "") return;
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: { title: newTask, completed: false } }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      const createdTask = await response.json();
      setTasks([createdTask, ...tasks]);
      setNewTask("");
    } catch (err) {
      setError('Error creating task: ' + err.message);
      console.error('Error creating task:', err);
    }
  };

  // Toggle task completion status
  const toggleTask = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: { completed: !completed } }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      
      const updatedTask = await response.json();
      setTasks(
        tasks.map(task => task.id === id ? updatedTask : task)
      );
    } catch (err) {
      setError('Error updating task: ' + err.message);
      console.error('Error updating task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Error deleting task: ' + err.message);
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">My Task Manager</h1>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
          <button 
            className="ml-2 font-bold"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Add Task Form */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          disabled={newTask.trim() === ""}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            newTask.trim() === "" 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Add
        </button>
      </div>
      
      {/* Loading indicator */}
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading tasks...</p>
        </div>
      ) : (
        /* Task List */
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <Disclosure key={task.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id, task.completed)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className={task.completed ? "line-through text-gray-500" : ""}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {open ? "▲" : "▼"}
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500 bg-gray-50 rounded-b-lg">
                      <div className="flex justify-between items-center">
                        <p>Created: {new Date(task.created_at).toLocaleString()}</p>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
