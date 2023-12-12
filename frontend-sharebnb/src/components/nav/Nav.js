import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "../../utilities/userContext";
import "./Nav.css";

/** Renders Nav component.
 *
 * Props:
 * - logout(): calls parent function to log user out.
 *
 * App -> Nav
 */

function Nav({ logout }) {
  const { currentUser } = useContext(userContext);

  return (
    <nav className="Nav navbar px-4 mb-4" data-bs-theme="dark">
      <Link className="Nav-heading" to="/">ShareBnB</Link>
      <div className="d-inline justify-content-end">
        <NavLink className="Nav-Link d-inline justify-content-end" to="/listings">Listings</NavLink>
        {currentUser
          ? <>
            <NavLink className="Nav-Link" to="/upload">Add a Listing</NavLink>
            <Link className="Nav-Link" to="/" onClick={logout}>Logout</Link>
          </>
          : <>
            <NavLink className="Nav-Link" to="/login">Login</NavLink>
            <NavLink className="Nav-Link" to="/signup">Signup</NavLink>
          </>}
      </div>
    </nav>
  );
}

export default Nav;