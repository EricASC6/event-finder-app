import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ChevronIcon } from "../../icons/chevron.svg";
import generalStyles from "../../styles/general.module.css";

const BackButton = ({ className, to }) => {
  return (
    <Link
      className={`${generalStyles.backBtn} ${className ? className : ""}`}
      to={to}
    >
      <ChevronIcon />
    </Link>
  );
};

export default BackButton;
