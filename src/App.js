import React, { Component } from "react";
import Modal from "./Components/Modal";

import DataTable from "./Components/DataTable";
import data from "./fixtures";

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
  state = { modalOpened: false };
  toggleModal = () => {
    const { modalOpened } = this.state;
    this.setState({ modalOpened: !modalOpened });
  };
  render() {
    const { modalOpened } = this.state;
    return (
      <div className="App">
        <button
          className="open-modal-btn btn-action"
          onClick={this.toggleModal}
        >
          Открыть
        </button>
        <Modal isOpened={modalOpened} toggle={this.toggleModal}>
          <DataTable columns={columns} data={data} />
        </Modal>
      </div>
    );
  }
}

export default App;
