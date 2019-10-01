import React, { Component } from "react";
import "./Modal.scss";

import ReactDOM from "react-dom";

/* 
        <Button color="dark" onClick={this.toggle}>
          Открыть форму
        </Button>

        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Модалка</ModalHeader>
          <ModalBody>
            <DataTable />
          </ModalBody>
        </Modal> */

class ModalInner extends Component {
  render() {
    const { isOpened, toggle, children } = this.props;

    return (
      <div>
        {isOpened ? <div className={"overlay"} onClick={toggle} /> : null}
        <div
          className={
            "modal-wrapper" + (!isOpened ? " modal-wrapper--closed" : "")
          }
        >
          <div className="modal-header">
            <h3>Модальное окно</h3>
            <span className="btn-close" onClick={toggle}>
              ×
            </span>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="btn-action btn-action--cancel" onClick={toggle}>
              Закрыть
            </button>
            <button
              className="btn-action btn-action--continue"
              onClick={toggle}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function Modal(props) {
  return ReactDOM.createPortal(
    <ModalInner {...props} />,
    document.querySelector("#modal")
  );
}
export default Modal;
