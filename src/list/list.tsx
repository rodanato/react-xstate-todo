import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import * as types from "./list.types";

import ListItem from "./list-item";

const List = (props: types.List) => {
  const { itemList, filter } = props;

  return (<div className="list">
    {
      itemList
        .filter((item: types.ListItem) => 
          filter === "all" ? true : item.state.matches(filter))
        .map((item: types.ListItem) => 
        <ListItem key={uuidv4()} data={item}/>)
    }
  </div>)
}

export default List;
