import React from "react";
import { TodoListProps } from "../types";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo }: TodoListProps): JSX.Element {
  return (
    <ul>
      { todos.map(todo => (
        <TodoItem key={ todo.id } todo={ todo } onDeleteTodo={ onDeleteTodo } />
      )) }
    </ul>
  );
}

export default TodoList;
