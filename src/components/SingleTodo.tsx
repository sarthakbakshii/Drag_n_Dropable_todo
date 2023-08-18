import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./interface";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  containerClass: string;
  index: number;
  visibleStatus: boolean;
}
const SingleTodo = ({
  todo,
  allTodo,
  setAllTodo,
  containerClass,
  index,
  visibleStatus,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => () => {
    setAllTodo(
      allTodo.map((ele) => {
        return ele.id === id ? { ...ele, isDone: !ele.isDone } : ele;
      })
    );
  };

  const handleDelete = (id: number) => () => {
    setAllTodo(allTodo.filter((ele) => ele.id !== id));
  };

  const editHandler = () => {
    if (!editMode && !todo.isDone) {
      setEditMode(!editMode);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditTodo(e.target.value);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setAllTodo(
      allTodo.map((ele) => (ele.id === id ? { ...ele, todo: editTodo } : ele))
    );
    setEditMode(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={` zoom-in c-pointer h-40 flex flex-between flex-middle ${containerClass}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {editMode ? (
            <input
              ref={inputRef}
              type="text"
              onChange={changeHandler}
              value={editTodo}
              className="todos__single--text  pl-10 br-25 b-0 ml-10 fs-12"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text pl-10 br-25 b-0 ml-10 fs-12">
              {todo.todo}
            </s>
          ) : (
            <span className="todos__single--text pl-10 br-25 b-0 ml-10 fs-12">
              {todo.todo}
            </span>
          )}

          <div className="flex flex-center flex-middle fs-20">
            <span className="icon" onClick={editHandler}>
              ✏️ <span className="fs-15">edit</span>
            </span>
            <span className="icon" onClick={handleDelete(todo.id)}>
              🗑️ <span className="fs-15">delete</span>
            </span>
            <span className="icon mr-8" onClick={handleDone(todo.id)}>
              {visibleStatus ? (
                <>
                  👊🏼<span className="fs-15"> undo </span>
                </>
              ) : (
                <>
                  👍🏼<span className="fs-15">done</span>
                </>
              )}
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
