import React, { Component } from "react";
import Modal from "./Components/Modal";

import DataTable from "./Components/DataTable";
import data from "./fixtures"; //no need for mobX or database

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: true,
    type: "number"
  },
  {
    dataField: "name",
    text: "Имя",
    sort: true,
    filter: true
  },
  {
    dataField: "date",
    text: "Дата",
    sort: true,
    filter: true
  },
  {
    dataField: "count",
    text: "Количество",
    sort: true,
    type: "number"
  }
];

class App extends Component {
  state = { ModalOpened: false };
  toggleModal = () => {
    this.setState({ ModalOpened: !this.state.ModalOpened });
  };
  render() {
    return (
      <div className="App">
        <button
          className="btn-action btn-action--continue"
          style={{ float: "left" }}
          onClick={this.toggleModal}
        >
          Открыть
        </button>
        <Modal isOpened={this.state.ModalOpened} toggle={this.toggleModal}>
          <DataTable columns={columns} data={data} />
        </Modal>
      </div>
    );
  }
}

export default App;
