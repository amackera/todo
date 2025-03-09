import React, { useState, Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";

const App = () => {
  // State for todos and new todo input
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a TODO app", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">My TODO App</h1>
      
      {/* Todo List */}
      <div className="mb-6 space-y-2">
        {todos.map(todo => (
          <Disclosure key={todo.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className={todo.completed ? "line-through text-gray-500" : ""}>
                      {todo.text}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    {open ? "▲" : "▼"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-2 pb-2 text-sm text-gray-500 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <p>Created: {new Date(todo.id).toLocaleString()}</p>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Add Todo Form */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-grow px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          disabled={newTodo.trim() === ""}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            newTodo.trim() === "" 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default App;
