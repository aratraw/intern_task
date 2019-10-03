import React, { Component } from "react";
import "./DataTable.scss";

import moment from "moment";
import "moment/locale/ru";
import sort from "../../utils/sort";
moment.locale("ru");

function getType(value) {
  if (!isNaN(value)) return "number";
  if (
    moment(value, "DD.MM.YYYY").isValid() ||
    moment(value, "DD MMMM YYYY").isValid()
  )
    return "date";
  return "string";
}

class DataTable extends Component {
  state = {
    sortBy: {},
    filters: []
  };

  toggleSort = field => e => {
    const { sortBy } = this.state;
    if (sortBy.dataField !== field)
      this.setState({ sortBy: { dataField: field, direction: "asc" } });
    else {
      sortBy.direction === "asc"
        ? this.setState({
            sortBy: { ...this.state.sortBy, direction: "desc" }
          })
        : this.setState({ sortBy: {} });
    }
  };

  setFilter = field => e => {
    const { filters } = this.state;
    let newFilters = filters.filter(x => x.dataField !== field);
    let val = e.target.value.toLowerCase();
    if (val !== "") newFilters.push({ dataField: field, value: val });
    this.setState({
      filters: newFilters
    });
  };

  getTableBody(rawData, columns) {
    const { sortBy, filters } = this.state;

    let data = rawData;
    data.map(x => ({ ...x, date: moment(x.date) }));
    if (sortBy.dataField) {
      data = sort(
        rawData,
        sortBy.dataField,
        getType(data[0][sortBy.dataField]),
        sortBy.direction
      );
    }
    if (filters[0]) {
      data = data.filter(x => {
        for (let f of filters) {
          if (!x[f.dataField].toLowerCase().includes(f.value)) return false;
        }
        return true;
      });
    }
    return data.map(row => (
      <tr className="data-table__row">
        {columns.map(col => (
          <td className="data-table__item">{row[col.dataField]}</td>
        ))}
      </tr>
    ));
  }

  render() {
    const { columns, data } = this.props;

    return (
      <table className="data-table">
        <thead className="data-table__head">
          <tr>
            {columns.map(col => (
              <th>
                <p onClick={col.sort && this.toggleSort(col.dataField)}>
                  {col.text}
                </p>
                {col.filter && (
                  <input
                    type="text"
                    placeholder="Значение для поиска"
                    onChange={this.setFilter(col.dataField)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{this.getTableBody(data, columns)}</tbody>
      </table>
    );
  }
}

export default DataTable;
