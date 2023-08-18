# Drag and Dropable Todo App ( react + typescript )

<a href="https://drap-droppable-todo-app.netlify.app/" > drap-droppable-todo-app.netlify.app </a>
## Basic Funtionality
User can add a todo by click of `GO` button or with pressing `Enter on keyboard`.\
By default Todo will set in Active Todos List.

3 option provided for user. `EDIT`, `DELETE`, `DONE`.

by clicking `EDIT` , use can edit the list and save it by pressing `Enter on keyboard`.\
by clicking `DONE`, it will shift it to completed list.

Items in Completed Todo List is not editable. to edit, iether click `UNDO` or `drag and drop` to active list.

## Drag n Drop Funtionality

Use can **sort the order of list** by `draging and dropping`  in active list and completed list.\
and User can also change the status of todo too, from active to completed and visa versa.

## Learning and chalenges

Package use for drag and drop functality : <a href="https://www.npmjs.com/package/react-beautiful-dnd">react-beautifull-dnd </a> .\
Documentaion : <a href="https://github.com/atlassian/react-beautiful-dnd">github.com/atlassian/react-beautiful-dnd</a>

**a)** For JS users, instating packages will work, but for ts user, you have to install its type also.\
**b)** A common errror will apear, `dragable id not found`.

**solution a)** Either remove `strict-mode` from `index.js`/`index.ts`.

**best approach )** create a wrapper or custom for `< Droppable />`

code : `customDroppableDnd.ts`
```
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};
```

Insted of using.\
```import { Droppable } from "react-beautiful-dnd";```\
use\
```import { StrictModeDroppable } from "../util/customDroppableDnd";```

