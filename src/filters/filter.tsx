import * as React from "react";
import { useService } from "@xstate/react";
import * as types from "./filter.types";

const Filter = (props: types.Filter) => {
  const { filter, selectedFilter } = props;
  const [state, send] = useService(filter);
  const { label } = state.context;

  return (
    <li>
      <label
        onClick={() => send("SELECT", { label: `${label.toUpperCase()}` })}
      >
        {label}
        <input
          type="radio"
          name="list-filter"
          checked={label === selectedFilter}
          className="filter"
          readOnly
        />
      </label>
      <br />
    </li>
  );
};

export default Filter;
