
import { Interpreter } from "xstate";

export type ListNewProps = {
  onNewTodo: Function
}

export type ListItem = {
  data: Interpreter<any, any , any>
}

export type List = {
  itemList: ListItem[],
  filter: any
}
