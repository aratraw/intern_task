import React, { Component } from "react";

class Filter extends Component {
  filterData = e => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { filterVal, data, dataField, update } = this.props;
    return (
      <label>
        <span>
          <input
            value={filterVal}
            type="text"
            className="data-table__filter"
            placeholder="Введите значение для поиска"
            onChange={this.filterData}
          />
        </span>
      </label>
    );
  }
}

export default Filter;
