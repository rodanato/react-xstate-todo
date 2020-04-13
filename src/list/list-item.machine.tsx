import { Machine, sendParent } from "xstate";

interface TodoStateSchema {
  states: {
    pending: {};
    completed: {};
    removed: {};
  }
};

type TodoEvent =
  | { type: 'TOGGLE' }
  | { type: 'REMOVE' };

interface TodoContext {
  label: string;
}

const todoMachine = Machine<TodoContext, TodoStateSchema, TodoEvent>({
  initial: "pending",
  context: {
    label: ""
  },
  states: {
    pending: {
      on: {
        TOGGLE: "completed",
        REMOVE: "removed"
      }
    },
    completed: {
      on: {
        TOGGLE: "pending",
        REMOVE: "removed"
      }
    },
    removed: {
      entry: ['notifyChange']
    }
  }
}, {
  actions: {
    notifyChange: sendParent((ctx: TodoContext, e: any) => ({
      type: 'REMOVE_TODO',
      id: e.id
    }))  
  }
});

export default todoMachine;
