
import { Interpreter } from "xstate";

export type ListNewProps = {
  onNewTodo: Function
}

export type Filters = {
  selectedFilter: string,
  filterList: Filter[]
}

export type Filter = {
  selectedFilter: string,
  data: Interpreter<any, any, any>
}
