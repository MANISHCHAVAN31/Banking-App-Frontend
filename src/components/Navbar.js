import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const currentUser = useParams().username;
  const navigate = useNavigate();

  const handleLogout = async () => {
    let resp = await axios
      .get("http://localhost:9000/logout")
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp);
    }

    navigate("/");
  };

  {
    if (currentUser === "manish") {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border shadow">
            <div className="container-fluid">
              <Link
                className="navbar-brand fw-bold"
                to={`/admindashboard/${currentUser}`}
              >
                Banking System
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item mx-3">
                    <Link
                      className="nav-link"
                      to={`/displaybanks/${currentUser}`}
                    >
                      All Banks
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link
                      className="nav-link"
                      to={`/displaycustomers/${currentUser}`}
                    >
                      All Customers
                    </Link>
                  </li>
                </ul>
                <div className="d-flex">
                  <div className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border shadow">
            <div className="container-fluid">
              <Link
                className="navbar-brand fw-bold"
                to={`/customerdashboard/${currentUser}`}
              >
                Banking System
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item mx-3">
                    <Link className="nav-link" to={`/accounts/${currentUser}`}>
                      Accounts
                    </Link>
                  </li>
                  <li className="nav-item mx-3">
                    <Link className="nav-link" to={`/balance/${currentUser}`}>
                      Balance
                    </Link>
                  </li>
                </ul>
                <div className="d-flex">
                  <div className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
};

export default Navbar;
