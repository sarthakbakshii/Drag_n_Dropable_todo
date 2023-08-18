import React, { useState } from "react";
import "./App.scss";
import InputField from "./components/InputField";
import { Todo } from "./components/interface";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {Heading, TodoStatus } from "./constants/constants";

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [allTodo, setAllTodo] = useState<Todo[]>([]);
  console.log(allTodo);

  const handleAdd = (e: React.FormEvent): void => {
    e.preventDefault();

    if (todo) {
      setAllTodo([...allTodo, { id: Date.now(), todo, isDone: false }]);
    }

    setTodo("");
  };

  const onDragEnd = (results: DropResult) => {
    console.log("result", results);
    const { source, destination } = results;

    if (!destination) return; // if we put the ele in false place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; // if same location. do nothing

    let completedTodo: Todo[] = [];
    let activeTodo: Todo[] = [];

    allTodo.map((ele: Todo): void => {
      if (ele.isDone) completedTodo.push(ele);
      else activeTodo.push(ele);
    });

    let add: Todo;

    if (source.droppableId === "activeTodo") {
      add = activeTodo[source.index];
      activeTodo.splice(source.index, 1);
    } else {
      add = completedTodo[source.index];
      completedTodo.splice(source.index, 1);
    }

    // we are taking out the ele and storing it in add, removing it from presised array

    if (destination.droppableId === "activeTodo") {
      let newAdd = { ...add, isDone: false };
      activeTodo.splice(destination.index, 0, newAdd);
    } else {
      let newAdd = { ...add, isDone: true };
      completedTodo.splice(destination.index, 0, newAdd);
    }

    setAllTodo([...activeTodo, ...completedTodo]);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h2 className=" heading ">{Heading.MAIN}</h2>
        <InputField todo={todo} handleAdd={handleAdd} setTodo={setTodo} />

        <div className="mt-20 flex flex-start ai-start listContainer">
          <TodoList
            allTodo={allTodo}
            setAllTodo={setAllTodo}
            containerClass="bg-green-2 w-500"
            headingClass="bg-green-3"
            heading={Heading.ACTIVE}
            listClass="bg-green-1"
            grabMeOutline="bg-green-2"
            visibleStatus={false}
            droppableId={TodoStatus.ACTIVE}
          />
          <TodoList
            allTodo={allTodo}
            setAllTodo={setAllTodo}
            containerClass="bg-red-2 w-500"
            headingClass="bg-red-3"
            heading={Heading.COMPLETED}
            listClass="bg-red-1"
            grabMeOutline="bg-red-2"
            visibleStatus={true}
            droppableId={TodoStatus.COMPLETED}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
