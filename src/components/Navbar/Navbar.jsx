import React, { useContext } from "react";
import right_arrow from "../../assets/arroyicon.png";
import logo from "../../assets/nav-logo.png";
import "./navbar.css";
import { Coincontext } from "../../context/Coincontext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setcurrency } = useContext(Coincontext);

  const myNavigate = useNavigate();

  // function for handling currency change

  const handlecurrency = (e) => {
    switch (e.target.value) {
      case "usd": {
        setcurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setcurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setcurrency({ name: "inr", symbol: "₹" });
        break;
      }

      default: {
        setcurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };
  return (
    <div className="navbar">
      <img src={logo} alt="" onClick={() => myNavigate("/")} />

      <ul className="navlist">
        <Link to="/">Home</Link>
        <Link to="/coin/bitcoin">Pricing</Link>
        <Link to="/allcoins">Coins</Link>
      </ul>
      <div className="right-nav">
        <select onChange={handlecurrency}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <Link to="/signIn">
          {" "}
          <button>Sign-in</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
