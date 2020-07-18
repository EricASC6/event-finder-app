import React from "react";
import generalStyles from "../../styles/general.module.css";

const ErrorContainer = ({ error }) => {
  return <div className={generalStyles.error}>{error}</div>;
};

export default ErrorContainer;
