import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <div className="dashboard-nav">
        <header>
          <a href="#!" className="menu-toggle">
            <i className="fas fa-bars"></i>
          </a>
          <a href="/#" className="brand-logo">
            <i className="fas fa-anchor"></i>
            <span>MUQTAFI</span></a>
        </header>

        <nav className="dashboard-nav-list">
          <NavLink to="/" end className="dashboard-nav-item"><i className="fas fa-home"></i>Home</NavLink>
          <NavLink to="/tasks" className="dashboard-nav-item"><i className="fas fa-file-upload"></i> Tasks </NavLink>
          <NavLink to="/ideas" className="dashboard-nav-item"><i className="fas fa-tachometer-alt"></i> Ideas </NavLink>
    
          <div className="nav-item-divider"></div>
          <NavLink to="/tracker" className="dashboard-nav-item"><i className="fas fa-cogs"></i> Tracker </NavLink>
          <NavLink to="/rules" className="dashboard-nav-item"><i className="fas fa-cogs"></i> Rules </NavLink>
        </nav>
    </div>

   
  );
}

export default Navbar;