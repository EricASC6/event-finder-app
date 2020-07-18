import React from "react";
import Container from "../general/Container";
import Logo from "../general/Logo";
import Profile from "../credentials/Profile";
import layoutStyles from "../../styles/layout.module.css";

const Header = () => {
  return (
    <Container>
      <header className={layoutStyles.header}>
        <Logo />
        <Profile />
      </header>
    </Container>
  );
};

export default Header;
