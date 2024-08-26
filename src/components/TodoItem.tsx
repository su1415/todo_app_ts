import React from "react";
import { TodoItemProps } from "../types";

function TodoItem({ todo }: TodoItemProps): JSX.Element {
  return <li>{ todo.text }</li>;
}

export default TodoItem;
