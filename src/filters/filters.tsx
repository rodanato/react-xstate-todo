import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Filter from "./filter";
import * as types from "./filter.types";

const Filters = (props: types.Filters) => {
  const { filterList, selectedFilter } = props;

  return (
    <ul className="filters">
      {filterList.map((filter: types.Filter) =>
        <Filter 
          filter={filter} 
          key={uuidv4()}
          selectedFilter={selectedFilter} 
        />
      )}
    </ul>
  );
};

export default Filters;
