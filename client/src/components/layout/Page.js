import React from "react";
import Header from "./Header";
import Navbar from "./../nav/Navbar";
import layoutStyles from "../../styles/layout.module.css";

const Page = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className={layoutStyles.wrapper}>{children}</div>
      <Navbar />
    </React.Fragment>
  );
};

export default Page;
