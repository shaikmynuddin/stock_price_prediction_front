import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logout from "../media/logoutic.png";
import email from "../media/emaiilic.png";
import user from "../media/useric.png";
const Navbar = (props) => {
  const navigate = useNavigate();

  const getUsername = () => {
    if (props.user && props.user.email) {
      // Extracting username from email
      const emailParts = props.user.email.split("@");
      return emailParts[0];
    }
    return "";
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
      props.handleLogout(); // Call handleLogout function passed from App.js to update the state
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} fixed-top`}
      style={{ width: "100%", left: 0 }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div
            className={`form-check form-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
              style={{ marginRight: "15px" }}
            >
              DarkMode
            </label>
          </div>
          <div className="dropdown">
            {props.isLoggedIn && (
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user} // Add the path to your user logo image
                  alt="User Logo"
                  className="user-logo"
                  style={{ width: "25px",marginRight: '5px' }}
                />
                {getUsername()} {/* Displaying username */}
              </button>
            )}
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{marginRight:'9px'}}>
              <li>
                <div className="dropdown-item">
                  <img
                    src={email} // Add the path to your user logo image
                    alt="User Logo"
                    className="user-logo"
                    style={{ width: "25px", marginRight: '5px' }}
                  />
                  {props.user && props.user.email}{" "}
                </div>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <img
                    src={logout}
                    alt="Logout Logo"
                    className="logout-logo"
                    style={{ width: "25px",marginRight: '5px' }}
                  />
                  Logout
                </button>
              </li>
            </ul>
          </div>
          {!props.isLoggedIn && (
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn btn-primary btn-animated">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-success btn-animated">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "StockTrack",
};

export default Navbar;
