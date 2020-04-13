import { Machine, sendParent } from "xstate";


interface FilterStateSchema {
  states: {
    unselected: {};
    selected: {};
  }
};

type FilterEvent =
  | { type: 'SELECT' }
  | { type: 'UNSELECT' };

interface FilterContext {
  label: string;
}
const filterMachine = Machine<FilterContext, FilterStateSchema, FilterEvent>({
  initial: "unselected",
  context: {
    label: ""
  },
  states: {
    unselected: {
      on: {
        SELECT: "selected",
      }
    },
    selected: {
      entry: ['notifyChange'],
      on: {
        UNSELECT: "unselected"
      }
    }
  }
}, {
  actions: {
    notifyChange: sendParent((ctx: FilterContext, e: any) => ({
      type: `CHANGE_TO_${e.label}`,
      label: e.label.toLowerCase()
    }))
  } 
});

export default filterMachine;
