import React from "react";

import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui primary pointing menu">
      <Link to="/" className="item">
        DailyDrop (of knowledge)
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Readables
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
