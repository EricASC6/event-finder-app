import React from "react";
import generalStyles from "../../styles/general.module.css";

const Form = ({ onSubmit, children }) => {
  return (
    <form
      className={generalStyles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
};

export default Form;
