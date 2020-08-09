import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import generalStyles from "../../styles/general.module.css";

const Modal = ({ children, open, handleClose, height, width, className }) => {
  const _className = `${generalStyles.modal} ${
    open && generalStyles.modalOpen
  } ${className}`;

  const modalRef = useRef();

  useEffect(() => {
    const modalRoot = document.querySelector("#modal-root");
    if (open) {
      modalRoot.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      modalRoot.classList.remove("active");
      document.body.style.overflow = "visible";
    }
  }, [open]);

  useEffect(() => {
    const modalRoot = document.querySelector("#modal-root");
    modalRoot.addEventListener("click", (e) => {
      if (modalRef.current.contains(e.target)) return;
      else handleClose();
    });
  }, []);

  return ReactDOM.createPortal(
    <div className={_className} ref={modalRef} style={{ width, height }}>
      {children}
    </div>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
