import * as React from "react";
import * as types from "./list.types";

const ListNew = (props: types.ListNewProps ) => {  
  const { onNewTodo } = props;

  return (
    <input 
      type="text"
      className="list-new"
      onKeyUp={(e: any) => onNewTodo(e)}
    />
  );
};

export default ListNew;
