import React, { Component } from "react";
import "./DataTable.scss";
import "dayjs";
import dayjs from "dayjs";

import { regExpLiteral } from "@babel/types";

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
  let dateRegex = /(?<day>\d{1,2})[-\s\/.](?<month>\d{1,2}|[а-я]*)[-\s\/.](?<year>\d{4})/;
  if (dateRegex.test(value)) return "date";
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
        function parseMonth(value) {
          if (!isNaN(value)) return value;
          switch (value) {
            case "января":
              return 1;
              break;
            case "февраля":
              return 2;
              break;
            case "марта":
              return 3;
              break;
            case "апреля":
              return 4;
              break;
            case "мая":
              return 5;
              break;
            case "июня":
              return 6;
              break;
            case "июля":
              return 7;
              break;
            case "августа":
              return 8;
              break;
            case "сентября":
              return 9;
              break;
            case "октября":
              return 10;
              break;
            case "декабря":
              return 11;
              break;
          }
        }
        let dateRegex = /(?<day>\d{1,2})[-\s\/.](?<month>\d{1,2}|[а-я]*)[-\s\/.](?<year>\d{4})/;
        let resA = dateRegex.exec(a.date);
        let dateA = dayjs(
          new Date(
            resA.groups.year,
            parseMonth(resA.groups.month),
            resA.groups.day
          )
        );
        let resB = dateRegex.exec(b.date);

        let dateB = dayjs(
          new Date(
            resB.groups.year,
            parseMonth(resB.groups.month),
            resB.groups.day
          )
        );

        return d * (dateA.isBefore(dateB) ? -1 : dateB.isBefore(dateA) ? 1 : 0);
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
    data.map(x => ({ ...x, date: dayjs(x.date) }));
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
