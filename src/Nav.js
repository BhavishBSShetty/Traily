import React, { useEffect, useState } from "react";
import logo from "./images/logo.png";
import user from "./images/user.png";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img src={logo} alt="Traily" className="nav_logo" />
      <img src={user} alt="User" className="nav_user" />
    </div>
  );
}

export default Nav;
