import { Machine, assign, spawn, State } from "xstate";
import { v4 as uuidv4 } from "uuid";

import todoMachine from "./list-item.machine";
import filterMachine from "../filters/filter.machine";

interface TodosStateSchema {
  states: {
    init: {};
    all: {};
    completed: {};
    pending: {};
  }
};

type TodosEvent =
  | { type: '' }
  | { type: 'CHANGE_TO_ALL' }
  | { type: 'CHANGE_TO_PENDING' }
  | { type: 'CHANGE_TO_COMPLETED' }
  | { type: 'NEW_TODO' }
  | { type: 'REMOVE_TODO' };

interface TodosContext {
  todos: Todo[];
  filters: Filter[];
}

interface Todo {
  label: string;
  id: string;
}

interface Filter {
  label: string;
  state: State<any, any>;
 }

const createNewTodo = (label: string) => ({
  label
});

const newFiltersList = [
  { label: "all" },
  { label: "pending" },
  { label: "completed" }
];

export const todosMachine = Machine<TodosContext, TodosStateSchema, TodosEvent>({
    initial: 'init',
    context: {
      todos: [],
      filters: []
    },
    states: {
      init: {
        entry: ["loadFilters"],
        on: {
          "": "all"
        }
      },
      all: {
      },
      completed: {
      },
      pending: {
      },
    },
    on: {
      CHANGE_TO_ALL: {
        target: "all",
        actions: ["unselectAll"]
      },
      CHANGE_TO_PENDING: {
        target: "pending",
        actions: ["unselectAll"]
      },
      CHANGE_TO_COMPLETED: {
        target: "completed",
        actions: ["unselectAll"]
      },
      NEW_TODO: {
        actions: ["newTodo"]
      },
      REMOVE_TODO: {
        actions: ["removeTodo"]
      }
    }
  }, {
    actions: {
      newTodo: assign<TodosContext, TodosEvent>({
        todos: (ctx: any, e: any) => ([
          ...ctx.todos,
          spawn(
            todoMachine.withContext(createNewTodo(e.label)),
            { name: uuidv4(), sync: true }
          )
        ])
      }),
      removeTodo: assign<TodosContext, TodosEvent>({
        todos: (ctx, e: any) => ctx.todos.filter((todo: Todo) =>  todo.id !== e.id)
      }),
      unselectAll: (ctx: TodosContext, e: any) => {
        ctx.filters
        .filter((f: Filter) => f.state.context.label !== e.label)
        .forEach((f: any) => f.send("UNSELECT"))
      },
      loadFilters: assign<TodosContext, TodosEvent>({
        filters: (ctx: any) => ([
          ...ctx.filters,
          ...newFiltersList.map((filter: { label: string}) => (
            spawn(filterMachine.withContext(filter))
          ))
        ])
      })
    }
  }
);
