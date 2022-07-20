import React, { useState, useEffect } from "react";
import CreateAccount from "../components/CreateAccount";
import DepositAmount from "../components/DepositAmount";
import Navbar from "../components/Navbar";
import SelfTransaction from "../components/SelfTransaction";
import Transaction from "../components/Transaction";
import WithdrawalAmount from "../components/WithdrawalAmount";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BlankComponent = () => {
  return <></>;
};

const CustomerDashboard = () => {
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
            setCurrentComponent(<CreateAccount />);
          }}
        >
          Create new Account
        </button>
        <button
          className="btn btn-warning btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<Transaction />);
          }}
        >
          Perform Transactions
        </button>
        <button
          className="btn btn-info btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<SelfTransaction />);
          }}
        >
          Self Transactions
        </button>
        <button
          className="btn btn-warning btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<DepositAmount />);
          }}
        >
          Deposit Amount
        </button>
        <button
          className="btn btn-info btn-sm mx-2"
          onClick={() => {
            setCurrentComponent(<WithdrawalAmount />);
          }}
        >
          Withdrawal Amount
        </button>
      </div>
      <div>{currentComponent}</div>
    </div>
  );
};

export default CustomerDashboard;
