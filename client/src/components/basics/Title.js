import React from "react";
import basicsStyles from "../../styles/basics.module.css";

const Title = ({ children, ...props }) => {
  return (
    <h2 className={basicsStyles.title} {...props}>
      {children}
    </h2>
  );
};

export default Title;
