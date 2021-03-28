import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <section className="head">
      <div className="header">
        <img src={logo} alt="" />
      </div>
      <div className="nav">
          <Link to="/shop">Shop</Link>
          <Link to="/review">Order Review</Link>
          <Link to="/inventory">Manage Inventory</Link>
          <button onClick={() => setLoggedInUser({})}>Sign Out</button>
      </div>
      <div className="search">
        <input type="text" placeholder="Search Products....."/>
        <button type="submit" className="btn btn-secondary">Search</button>
      </div>
    </section>
  );
};

export default Header;
