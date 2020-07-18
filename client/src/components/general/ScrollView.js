import React from "react";
import generalStyles from "../../styles/general.module.css";

// Takes in a list of components and creates a carousel
const ScrollView = ({ children }) => {
  return <div className={generalStyles.scrollView}>{children}</div>;
};

export default ScrollView;
