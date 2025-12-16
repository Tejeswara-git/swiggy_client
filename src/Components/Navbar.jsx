import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-section">
      <div className="title">
        <Link to="/" className="swiggy-link">
          <h1>Swiggy</h1>
        </Link>
      </div>
      <div className="sreach">
        <input
          type="text"
          placeholder="Search"
          style={{ width: 200, height: 30, borderRadius: 5 }}
        />
      </div>
      <div className="auth">
        <span>Login</span>/<span>Sign Up</span>
      </div>
    </div>
  );
};

export default Navbar;
