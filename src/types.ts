export type todo = {
  id: number,
  text: string,
};

export type todos = todo[];

export type TodoListProps = {
  todos: todos,
  onDeleteTodo: (id: number) => void,
};

export type TodoItemProps = {
  todo: todo,
  onDeleteTodo: (id: number) => void,
};
