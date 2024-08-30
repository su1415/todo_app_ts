import React, { useState, useEffect } from "react";
import { todo, todos } from "./types";
import TodoList from "./components/TodoList";

function App(): JSX.Element {
  const [todos, setTodos] = useState<todos>(loadTodosFromLocalStorage());

  const [newTodoText, setNewTodoText] = useState<string>("");
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>("");

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  function handleAddTodo(): void {
    if (newTodoText.trim() !== "" && newTodoDueDate.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodoText, dueDate: newTodoDueDate, completed: false }]);
      setNewTodoText("");
      setNewTodoDueDate("");
    }
  }

  function handleDeleteTodo(id: number): void {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleSaveEditTodo(editTodo: todo): void {
    setTodos(todos.map((todo: todo) => todo.id === editTodo.id ? editTodo : todo));
  }

  function handleToggleComplete(id: number): void {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <input
        type="text"
        value={ newTodoText }
        onChange={ (e) => setNewTodoText(e.target.value) }
      />
      <input
        type="date"
        placeholder="Due Date"
        value={ newTodoDueDate }
        onChange={(e) => setNewTodoDueDate(e.target.value) }
      />
      <button onClick={ handleAddTodo }>Add</button>
      <TodoList
        todos={ todos }
        onDeleteTodo={ handleDeleteTodo }
        onSaveEditTodo={ handleSaveEditTodo }
        onToggleComplete={ handleToggleComplete }
      />
    </div>
  );
}

function loadTodosFromLocalStorage(): todos {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodosToLocalStorage(todos: todos): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export default App;
