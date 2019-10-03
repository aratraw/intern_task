import moment from "moment";
import "moment/locale/ru";
moment.locale("ru");

const sortNumbers = (d, field) => (a, b) => {
  return d * (Number(a[field]) - Number(b[field]));
};
const sortDates = (d, field) => (a, b) => {
  let dateA = moment(a.date, "DD.MM.YYYY");
  dateA = dateA.isValid() ? dateA : moment(a.date, "DD MMMM YYYY");
  let dateB = moment(b.date, "DD.MM.YYYY");
  dateB = dateB.isValid() ? dateB : moment(b.date, "DD MMMM YYYY");
  return d * (dateA.isSameOrBefore(dateB) ? -1 : 1);
};
const sortStrings = (d, field) => (a, b) => {
  return d * (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0);
};
function sort(arr, field, type, direction) {
  let d = direction === "asc" ? 1 : -1;

  let sorter;
  switch (type) {
    case "number":
      sorter = sortNumbers(d, field);
      break;
    case "string":
      sorter = sortStrings(d, field);
      break;
    default:
      sorter = sortDates(d, field);
      break;
  }
  return arr.slice().sort(sorter);
}

export default sort;
