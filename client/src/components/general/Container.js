import React from "react";
import generalStyles from "../../styles/general.module.css";

const Container = ({ className, type, children }) => {
  return (
    <div
      className={`${generalStyles.container} ${className ? className : ""}`}
      datatype={type}
    >
      {children}
    </div>
  );
};

export default Container;
