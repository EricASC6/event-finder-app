import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import { ReactComponent as BookmarkIcon } from "../../icons/bookmark-link.svg";
import { ReactComponent as VenueIcon } from "../../icons/venue.svg";
import { ReactComponent as CalendarIcon } from "../../icons/calendar.svg";
import Container from "../general/Container";
import navStyles from "../../styles/nav.module.css";

const Navbar = () => {
  return (
    <Container className={navStyles.nav}>
      <nav className={navStyles.navbar}>
        <NavLink
          to="/"
          className={navStyles.navItem}
          activeClassName={navStyles.active}
        >
          <HomeIcon />
        </NavLink>
        <NavLink
          to="/bookmark"
          className={navStyles.navItem}
          activeClassName={navStyles.active}
        >
          <BookmarkIcon />
        </NavLink>
        <NavLink
          to="/venues"
          className={navStyles.navItem}
          activeClassName={navStyles.active}
        >
          <VenueIcon />
        </NavLink>
        <NavLink
          to="/calendar"
          className={navStyles.navItem}
          activeClassName={navStyles.active}
        >
          <CalendarIcon />
        </NavLink>
      </nav>
    </Container>
  );
};

export default Navbar;
