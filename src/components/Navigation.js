import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
      </ul>
      <ul>
        <Link to="/profile">{userObj.displayName}'s Profile</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
