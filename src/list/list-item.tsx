import * as React from "react";
import { useService } from "@xstate/react";
import * as types from "./list.types";

const ListItem = (props: types.ListItem) => {
  const { data } = props;
  const [state, send] = useService(data);

  return (
    <>
      <div className="filter">
        <div onClick={() => send("TOGGLE")}>
          <input
            type="checkbox"
            checked={state.matches('completed')}
            readOnly
          />
          {state.context.label}
        </div>

        <span 
          className="filter__close"
          onClick={() => send("REMOVE", { id: data.id })}
        >X</span>
      </div>
      <br/>
    </>
  );
};

export default ListItem;
