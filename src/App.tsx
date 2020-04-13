import * as React from "react";
import "./styles.css";

import List from "./list/list";
import ListNew from "./list/list-item-new";
import Filters from "./filters/filters";

import { todosMachine } from "./list/list.machine";
import { useMachine } from "@xstate/react";

export default function App() {
  const [todosState, send] = useMachine(todosMachine);

  function createNewTodo(e: any) {
    if (e.key === "Enter") {
      send("NEW_TODO", { label: e.target.value });
      e.target.value = "";
    }
  }

  return (
    <div className="App">
      <h1>TODO</h1>

      <h2>NEW</h2>
      <ListNew onNewTodo={createNewTodo} />

      <br />
      <br />

      <h2>FILTERS</h2>
      <Filters
        filterList={todosState.context.filters}
        selectedFilter={todosState.value}
      />

      <br />
      <br />

      <h2>LIST</h2>
      <List itemList={todosState.context.todos} filter={todosState.value} />
    </div>
  );
}
