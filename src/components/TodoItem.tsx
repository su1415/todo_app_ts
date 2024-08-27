import React from "react";
import { TodoItemProps } from "../types";

function TodoItem({ todo, onDeleteTodo }: TodoItemProps): JSX.Element {
  return (
    <li>
      { todo.text }
      <button onClick={ () => onDeleteTodo(todo.id) }>Delete</button>
    </li>
  );
}

export default TodoItem;
