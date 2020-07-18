import React from "react";
import { Link } from "react-router-dom";
import generalStyles from "../../styles/general.module.css";

const Logo = () => {
  return (
    <Link className={generalStyles.logo} to="/">
      LOGO
    </Link>
  );
};

export default Logo;
