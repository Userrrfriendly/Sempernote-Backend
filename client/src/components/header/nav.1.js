import React from "react";

import "./nav.css";
import Hamburger from "./icons/hamburger";
import SearchIcon from "./icons/search";
import VerticalMenu from "./icons/verticalMenu";
import NavLabel from "./navLabel";

const Nav = props => {
  return (
    <nav className="navigation">
      {/* <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>14</div> */}
      <Hamburger toggleDrawer={props.toggleDrawer} />
      <NavLabel />
      <SearchIcon />
      <VerticalMenu />
    </nav>
  );
};

export default Nav;
