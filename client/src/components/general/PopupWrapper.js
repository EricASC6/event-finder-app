import React, { useRef } from "react";
import Popup from "./Popup";
import generalStyles from "../../styles/general.module.css";

const PopupWrapper = ({ children, position, handleClose }) => {
  const popupWrapperRef = useRef();

  return (
    <div
      className={generalStyles.popupWrapper}
      style={position}
      ref={popupWrapperRef}
    >
      <Popup popupWrapperRef={popupWrapperRef} handleClose={handleClose}>
        {children}
      </Popup>
    </div>
  );
};

export default PopupWrapper;
