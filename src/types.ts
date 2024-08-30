export type todo = {
  id: number,
  text: string,
  dueDate: string,
  completed: boolean,
};

export type todos = todo[];

export type TodoListProps = {
  todos: todos,
  onDeleteTodo: (id: number) => void,
  onSaveEditTodo: (todo: todo) => void,
  onToggleComplete: (id: number) => void,
};

export type TodoItemProps = {
  todo: todo,
  onDeleteTodo: (id: number) => void,
  onSaveEditTodo: (todo: todo) => void,
  onToggleComplete: (id: number) => void,
};
