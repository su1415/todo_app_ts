import React, { useState, useEffect } from "react";
import { todos } from "./types";
import TodoList from "./components/TodoList";

function App(): JSX.Element {
  const [todos, setTodos] = useState<todos>(loadTodosFromLocalStorage());

  const [newTodoText, setNewTodoText] = useState<string>("");

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  function handleAddTodo(): void {
    if (newTodoText.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodoText }]);
      setNewTodoText("");
    }
  }

  function handleDeleteTodo(id: number): void {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <input
        type="text"
        value={ newTodoText }
        onChange={ (e) => setNewTodoText(e.target.value) }
      />
      <button onClick={ handleAddTodo }>Add</button>
      <TodoList todos={ todos } onDeleteTodo={ handleDeleteTodo } />
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
