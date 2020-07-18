import React from "react";
import generalStyles from "../../styles/general.module.css";

const Category = ({ name, medium }) => {
  return (
    <div
      className={`${
        medium ? generalStyles.mediumCategory : generalStyles.smallCategory
      }`}
    >
      <div className={generalStyles.category}>{name}</div>
    </div>
  );
};

export default Category;
