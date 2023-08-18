import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    handleAdd(e);
    inputRef.current?.blur()  // to hide dark background of input on enter press
  };
  
  return (
    <form action="" className="input" onSubmit={submitHandler}>
      <input
        type="text"
        value={todo}
        onChange={changeHandler}
        placeholder="Enter a task"
        className="input__box"
        ref={inputRef}
      />
      <button type="submit" className="input__submit">
        GO
      </button>
    </form>
  );
};


export default InputField;
