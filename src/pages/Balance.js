import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Balance = () => {
  const currentUser = useParams().username;
  const [balanceData, setBalanceData] = useState({});
  const Navigate = useNavigate();

  const loadBalanceData = async () => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", { username: currentUser })
      .catch((error) => {
        console.log(error);
        if (error.response.data === "Login first to proceed") {
          Navigate("/");
        }
      });

    if (resp) {
      console.log(resp.data);
      setBalanceData(resp.data);
    }
  };

  useEffect(() => {
    loadBalanceData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="display-6 mb-5 text-center">Balance Details</div>

        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Bank Full Name</th>
                <th scope="col">Abbreviation</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(balanceData).map((data) => {
                return (
                  <tr key={data.bankid}>
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

export default Balance;
