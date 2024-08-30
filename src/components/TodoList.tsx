import React from "react";
import { TodoListProps } from "../types";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onSaveEditTodo, onToggleComplete }: TodoListProps): JSX.Element {
  return (
    <ul className="list-group">
      { todos.map(todo => (
        <TodoItem
          key={ todo.id }
          todo={ todo }
          onDeleteTodo={ onDeleteTodo }
          onSaveEditTodo={ onSaveEditTodo }
          onToggleComplete={ onToggleComplete }
        />
      )) }
    </ul>
  );
}

export default TodoList;
