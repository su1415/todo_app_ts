import React, { useState } from "react";
import { TodoItemProps, todo } from "../types";

function TodoItem({ todo, onDeleteTodo, onSaveEditTodo, onToggleComplete }: TodoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<todo>(todo);

  function handleEditToggle(): void {
    setIsEditing(!isEditing);
    setEditTodo(todo);
  };

  function handleSaveClick(): void {
    onSaveEditTodo(editTodo);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={ todo.completed }
        onChange={ () => onToggleComplete(todo.id) }
        disabled={ isEditing }
      />
      { isEditing ? (
        <input
          type="text"
          value={ editTodo.text }
          onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
        />
      ) : (
        <>
          { todo.text }
        </>
      )}
      <input
        type="date"
        value={ editTodo.dueDate }
        onChange={(e) => setEditTodo({ ...editTodo, dueDate: e.target.value })}
        style={{ width: "150px" }}
        disabled={ !isEditing }
      />
      { isEditing ? (
        <>
          <button onClick={ handleSaveClick }>Save</button>
          <button onClick={ handleEditToggle }>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={ handleEditToggle }>Edit</button>
          <button onClick={ () => onDeleteTodo(todo.id) }>Delete</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
