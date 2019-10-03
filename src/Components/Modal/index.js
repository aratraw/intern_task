import React, { Component } from "react";
import "./Modal.scss";
import cn from "classnames";
import ReactDOM from "react-dom";

class ModalInner extends Component {
  render() {
    const { isOpened, toggle, children } = this.props;

    return (
      <div>
        {isOpened && <div className={"overlay"} onClick={toggle} />}
        <div
          className={cn("modal-wrapper", {
            "modal-wrapper--closed": !isOpened
          })}
        >
          <div className="modal-header">
            <h3 className="modal-header__title">Модальное окно</h3>
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
