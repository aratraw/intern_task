import React from "react";

function Filter(filterVal, data, dataField, update) {
  const filterData = e => {
    const value = e.target.value.toLowerCase();

    const filtered = data.filter(x => {
      return x[dataField].toLowerCase().includes(value);

      update();
    });
  };
  return (
    <label>
      <span>
        <input
          value={filterVal}
          type="text"
          className="data-table__filter"
          placeholder="Введите значение для поиска"
          onChange={filterData}
        />
      </span>
    </label>
  );
}

export default Filter;
