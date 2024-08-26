export type todo = {
  id: number,
  text: string,
};

export type todos = todo[];

export type TodoListProps = {
  todos: todos,
};

export type TodoItemProps = {
  todo: todo,
};
