import React from "react";
import { Link } from "react-router-dom";



function Nav() {
  return (
    <nav style={{backgroundColor:'white'}} className="navbar navbar-expand-lg">
      <Link to="/">Search Books</Link><span style={{padding:'10px'}}>|</span>
      <Link to="/saved">Saved Books</Link>
      

    </nav>
  );
}

export default Nav;
