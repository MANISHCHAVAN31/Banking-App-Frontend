import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateBank from "../components/CreateBank";
import CreateCustomer from "../components/CreateCustomer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlankComponent = () => {
  return <></>;
};

const AdminDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState(<BlankComponent />);
  const Navigate = useNavigate();

  const checkAuthentication = async () => {
    let resp = await axios
      .get("http://localhost:9000/isAuthenticated")
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "Login first to proceed") {
          Navigate("/");
        }
      });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-center mt-3">
        <button
          className="btn btn-info btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<CreateBank />);
          }}
        >
          Create new Bank
        </button>
        <button
          className="btn btn-warning btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<CreateCustomer />);
          }}
        >
          Create new Customer
        </button>
      </div>
      <div>{currentComponent}</div>
    </div>
  );
};

export default AdminDashboard;
