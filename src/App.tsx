import React, { useState } from "react";
import { todos } from "./types";
import TodoList from "./components/TodoList";

function App(): JSX.Element {
  const [todos, setTodos] = useState<todos>([
    { id: 1, text: "sample1" },
    { id: 2, text: "sample2" },
  ]);

  const [newTodoText, setNewTodoText] = useState<string>("");

  function handleAddTodo(): void {
    if (newTodoText.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodoText }]);
      setNewTodoText("");
    }
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
      <TodoList todos={ todos } />
    </div>
  );
}

export default App;
