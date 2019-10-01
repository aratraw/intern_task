import React, { Component } from "react";
import "./DataTable.scss";
import Filter from "./Filter";
/* export default () => (
  <BootstrapTable
    keyField="id"
    data={data}
    columns={columns}
    filter={filterFactory()}
  />
); */
function getType(value) {
  if (!isNaN(value)) return "number";
  return "string";
}

class DataTable extends Component {
  state = {
    sortBy: {},
    filters: {}
  };

  toggleSort(field) {
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
  }
  getTableBody(rawData, columns) {
    const { sortBy } = this.state;

    function sort(arr, field, type, direction) {
      console.log(type);
      let d = direction === "asc" ? 1 : -1;

      const sortNumbers = (a, b) => {
        return d * (parseFloat(a) - parseFloat(b));
      };
      const sortStrings = (a, b) => {
        return d * (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0);
      };

      return arr.slice().sort(type === "number" ? sortNumbers : sortStrings);
    }
    let data = rawData;

    if (sortBy.dataField) {
      console.log(getType(data[0][sortBy.dataField]));
      data = sort(
        rawData,
        sortBy.dataField,
        getType(data[0][sortBy.dataField]),
        sortBy.direction
      );
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
                <p
                  onClick={col.sort ? () => this.toggleSort(col.dataField) : {}}
                >
                  {col.text}
                </p>
                {col.filter ? <input /> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-table__body>{this.getTableBody(data, columns)}</tbody>
      </table>
    ); /*  */
  }
}

export default DataTable;
