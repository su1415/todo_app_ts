import React, { useState, useEffect } from "react";
import { todo, todos } from "./types";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

function App(): JSX.Element {
  const [todos, setTodos] = useState<todos>(loadTodosFromLocalStorage());
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [newTodoDueDate, setNewTodoDueDate] = useState<string>("");
  const [filter, setFilter] = useState<string>(loadFilterFromLocalStorage());
  const [searchTodoText, setSearchTodoText] = useState<string>("");

  const filteredTodos: todos = getFilteredTodos(todos, filter);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  useEffect(() => {
    saveFilterToLocalStorage(filter);
  }, [filter]);

  function handleAddTodo(): void {
    if (newTodoText.trim() !== "" && newTodoDueDate.trim() !== "") {
      const newTodos = [...todos, { id: Date.now(), text: newTodoText, dueDate: newTodoDueDate, completed: false }];
      setTodos(sortTodosByDate(newTodos));
      setNewTodoText("");
      setNewTodoDueDate("");
    }
  }

  function handleDeleteTodo(id: number): void {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(sortTodosByDate(newTodos));
  }

  function handleSaveEditTodo(editTodo: todo): void {
    const newTodos = todos.map((todo: todo) => todo.id === editTodo.id ? editTodo : todo);
    setTodos(sortTodosByDate(newTodos));
  }

  function handleToggleComplete(id: number): void {
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    setTodos(sortTodosByDate(newTodos));
  }

  function getFilteredTodos(todos: todos, filter: string): todos {
    let filterTodos = todos;
    if (filter === "completed") {
      filterTodos = todos.filter(todo => todo.completed);
    }
    if (filter === "incompleted") {
      filterTodos = todos.filter(todo => !todo.completed);
    }
    filterTodos = filterTodos.filter(todo => todo.text.includes(searchTodoText));
    return filterTodos;
  }

  function renderFilterButton(filterType: string, label: string): JSX.Element {
    return (
      <button
        className={ `btn btn-outline-secondary ${filter === filterType ? "active" : ""}` }
        onClick={ () => setFilter(filterType) }>
        { label }
      </button>
    );
  }

  return (
    <div className="App container mt-5">
      <h1 className="text-center">ToDo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New ToDo"
          value={ newTodoText }
          onChange={ (e) => setNewTodoText(e.target.value) }
        />
        <input
          type="date"
          className="form-control"
          placeholder="Due Date"
          value={ newTodoDueDate }
          onChange={(e) => setNewTodoDueDate(e.target.value) }
        />
        <button
          className="btn btn-primary"
          onClick={ handleAddTodo }>
          Add
        </button>
      </div>
      <div className="btn-group mb-3">
        { renderFilterButton("all", "All") }
        { renderFilterButton("completed", "Completed") }
        { renderFilterButton("incompleted", "Incompleted") }
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Todos"
          value={ searchTodoText }
          onChange={ (e) => setSearchTodoText(e.target.value) }
        />
      </div>
      <TodoList
        todos={ filteredTodos }
        onDeleteTodo={ handleDeleteTodo }
        onSaveEditTodo={ handleSaveEditTodo }
        onToggleComplete={ handleToggleComplete }
      />
    </div>
  );
}

function loadTodosFromLocalStorage(): todos {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? sortTodosByDate(JSON.parse(savedTodos)) : [];
}

function saveTodosToLocalStorage(todos: todos): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFilterFromLocalStorage(): string {
  const savedFilter = localStorage.getItem("filter");
  return savedFilter ? savedFilter : "all";
}

function saveFilterToLocalStorage(filter: string): void {
  localStorage.setItem("filter", filter);
}

function sortTodosByDate(todos: todos): todos {
  return todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

export default App;
