import React from "react";
import { TodoItemProps } from "../types";

function TodoItem({ todo, onDeleteTodo, onToggleComplete }: TodoItemProps): JSX.Element {
  return (
    <li>
      <input
        type="checkbox"
        checked={ todo.completed }
        onChange={ () => onToggleComplete(todo.id) }
      />
      { todo.text }
      <input
          type="date"
          value={ todo.dueDate }
          disabled={ true }
        />
      <button onClick={ () => onDeleteTodo(todo.id) }>Delete</button>
    </li>
  );
}

export default TodoItem;
