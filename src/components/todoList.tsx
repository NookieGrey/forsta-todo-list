import { Todo } from "../App";
import { FC, useState } from "react";

type TodoHandlers = {
  deleteTodo: (index: number) => void;
  toggleTodoDone: (index: number, done: boolean) => void;
  setTodoText: (index: number, text: string) => void;
};

type TodoListProps = TodoHandlers & {
  todos: Todo[];
};

export const TodoList: FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodoDone,
  setTodoText,
}) => {
  return (
    <ul className="todoList">
      {todos.map((item, index) => (
        <TodoItem
          key={item.id}
          item={item}
          index={index}
          deleteTodo={deleteTodo}
          toggleTodoDone={toggleTodoDone}
          setTodoText={setTodoText}
        />
      ))}
    </ul>
  );
};

type TodoItemProps = TodoHandlers & {
  item: Todo;
  index: number;
};

const TodoItem: FC<TodoItemProps> = ({
  item,
  index,
  deleteTodo,
  toggleTodoDone,
  setTodoText,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(item.text);

  return (
    <li
      key={index}
      className={item.done ? "done" : ""}
      data-testid={`todo${index}`}
    >
      <input
        type="checkbox"
        checked={item.done}
        onChange={(event) => {
          toggleTodoDone(index, event.currentTarget.checked);
        }}
        data-testid={`toggle${index}`}
      />
      {editMode ? (
        <span className="editTodo">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            data-testid={`edit-input${index}`}
          />
        </span>
      ) : (
        <span>{item.text}</span>
      )}
      {editMode ? (
        <button
          onClick={() => {
            setTodoText(index, value);
            setEditMode(false);
          }}
          data-testid={`save${index}`}
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          data-testid={`edit-button${index}`}
        >
          Edit
        </button>
      )}

      <button
        onClick={() => deleteTodo(index)}
        className="danger"
        data-testid={`delete${index}`}
      >
        Delete
      </button>
    </li>
  );
};
