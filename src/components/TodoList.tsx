import React, { useMemo } from "react";
import { Todo } from "./interface";
import SingleTodo from "./SingleTodo";
// import { Droppable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../util/customDroppableDnd";

interface Props {
  allTodo: Todo[];
  setAllTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  containerClass: string;
  headingClass: string;
  heading: string;
  listClass: string;
  grabMeOutline: string;
  visibleStatus: boolean;
  droppableId : string;
}
const TodoList = ({
  allTodo,
  setAllTodo,
  containerClass,
  headingClass,
  heading,
  listClass,
  grabMeOutline,
  visibleStatus,
  droppableId,
}: Props) => {

  const showableList = useMemo(() => {
    return allTodo.filter((ele) => ele.isDone === visibleStatus);
  }, [allTodo, visibleStatus]);

  return (
    // <Droppable droppableId={droppableId}></Droppable>
    /*
     * earlier we were using given method, but it was giving error
     * by finding the solution on internet
     * i found that we have to remove the strict mode for that
     * 
     * so i created a custom droppable component 
     */
    <StrictModeDroppable droppableId={droppableId}>
      
      {(provided, spanshot) => (
        <div
          className={` w-400   ${containerClass} todos `}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3 className={`m-0  p-20 ${headingClass}`}> {heading}</h3>

          <div className="flex flex-coloum  gap-5 p-5">
            {showableList.map((ele, index) => {
             
                return (
                  <SingleTodo
                    todo={ele}
                    index={index}
                    key={ele.id}
                    allTodo={allTodo}
                    setAllTodo={setAllTodo}
                    containerClass={listClass}
                    visibleStatus={visibleStatus}
                  />
                );
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default TodoList;
