import { useState } from "react";
import { TodoList } from "./components/todoList";
import { TodoInput } from "./components/todoInput";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  text: string;
  done: boolean;
  id: string;
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { text: "Buy milk", done: true, id: uuidv4() },
    { text: "Buy bread", done: false, id: uuidv4() },
  ]);

  const addTodo = (text: string) => {
    setTodos((todos) => [{ text, done: false, id: uuidv4() }, ...todos]);
  };

  const deleteTodo = (index: number) => {
    setTodos((todos) => {
      const result = todos.slice();
      result.splice(index, 1);
      return result;
    });
  };

  const toggleTodoDone = (index: number, done: boolean) => {
    setTodos((todos) => {
      const result = todos.slice();
      result[index].done = done;
      return result;
    });
  };

  const setTodoText = (index: number, text: string) => {
    setTodos((todos) => {
      const result = todos.slice();
      result[index].text = text;
      return result;
    });
  };

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodoDone={toggleTodoDone}
        setTodoText={setTodoText}
      />
    </div>
  );
}
