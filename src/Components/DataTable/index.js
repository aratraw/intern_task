import React, { Component } from "react";
import "./DataTable.scss";

import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");
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

    function sort(arr, field, type, direction) {
      console.log(type);
      let d = direction === "asc" ? 1 : -1;

      const sortNumbers = (a, b) => {
        return d * (Number(a[field]) - Number(b[field]));
      };
      const sortStrings = (a, b) => {
        return d * (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0);
      };
      const sortDates = (a, b) => {
        let dateA = moment(a.date, "DD.MM.YYYY");
        dateA = dateA.isValid() ? dateA : moment(a.date, "DD MMMM YYYY");
        let dateB = moment(b.date, "DD.MM.YYYY");
        dateB = dateB.isValid() ? dateB : moment(b.date, "DD MMMM YYYY");
        console.log(a.date, b.date, dateA.isSameOrBefore(dateB));
        return d * (dateA.isSameOrBefore(dateB) ? -1 : 1);
      };
      let sorter;
      switch (type) {
        case "number":
          sorter = sortNumbers;
          break;
        case "string":
          sorter = sortStrings;
          break;
        default:
          sorter = sortDates;
          break;
      }
      return arr.slice().sort(sorter);
    }
    let data = rawData;
    // data.map(x => ({ ...x, date: moment(x.date) }));
    if (sortBy.dataField) {
      data = sort(
        rawData,
        sortBy.dataField,
        getType(data[0][sortBy.dataField]),
        sortBy.direction
      );
      console.log(data, rawData);
    }
    if (filters[0]) {
      data = data.filter(x => {
        for (var f of filters) {
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
        <tbody data-table__body>{this.getTableBody(data, columns)}</tbody>
      </table>
    ); /*  */
  }
}

export default DataTable;
