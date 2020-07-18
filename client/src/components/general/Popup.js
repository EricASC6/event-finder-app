import { useEffect } from "react";

const Popup = ({ popupWrapperRef, handleClose, children }) => {
  useEffect(() => {
    const listener = (e) => {
      if (!popupWrapperRef.current.contains(e.target)) handleClose();
    };

    window.addEventListener("mousedown", listener);

    return () => window.removeEventListener("mousedown", listener);
  }, [handleClose, popupWrapperRef]);

  return children;
};

export default Popup;
