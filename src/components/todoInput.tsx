import { useState } from "react";

type TodoInputProps = {
  addTodo: (text: string) => void;
};

export const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [value, setValue] = useState("");
  return (
    <form className="addTodo">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        data-testid={`add-input`}
      />
      <button
        type="button"
        onClick={() => addTodo(value)}
        data-testid={`add-button`}
      >
        Add
      </button>
    </form>
  );
};
