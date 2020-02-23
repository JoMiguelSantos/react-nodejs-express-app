import "./NavBar.css";
import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="navbar">
      <Link to="/">New Search</Link>
      <Link to="/repos">Repos</Link>
      <Link to="/bookmarks">Bookmarks</Link>
    </nav>
  );
};
