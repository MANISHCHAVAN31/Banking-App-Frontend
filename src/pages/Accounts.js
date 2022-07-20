import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const Accounts = () => {
  const currentUser = useParams().username;
  const Navigate = useNavigate();
  const [accountData, setAccountData] = useState({});

  const loadAccounts = async () => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", {
        username: currentUser,
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "Login first to proceed") {
          Navigate("/");
        }
      });

    if (resp) {
      console.log(resp.data);
      setAccountData(resp.data);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <div className="h3">All Accounts</div>
        <div className="mt-5">
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                <th className="py-3">Full Name</th>
                <th className="py-3">Bank Abbreviation</th>
                <th className="py-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(accountData).map((data) => {
                return (
                  <tr key={data.bank.id}>
                    <td>{data.bank.fullname}</td>
                    <td>{data.bank.abbreviation}</td>
                    <td>{data.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
