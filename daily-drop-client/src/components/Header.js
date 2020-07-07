import React from "react";

import { Link } from "react-router-dom";
import GoogleAuth from "../auth/components/GoogleAuth";

const Header = () => {
  return (
    <div className="ui primary pointing menu">
      <Link to="/" className="item">
        Readables
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Readables
        </Link>
        <div className="item">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
