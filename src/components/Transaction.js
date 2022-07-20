import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Transaction = () => {
  const currentUser = useParams().username;
  const [sendingAbbreviation, setSendingAbbreviation] = useState("");
  const [receivingCustomerName, setReceivingCustomerName] = useState("");
  const [receivingAbbreviation, setReceivingAbbreviation] = useState("");
  const [amount, setAmount] = useState("");

  const [selfAccountsData, setSelfAccountsData] = useState({});
  const [allCustomers, setAllCustomers] = useState({});
  const [receiverCustomerAccounts, setReceiverCustomerAccounts] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await axios
      .post("http://localhost:9000/transfer", {
        debitCustomerUsername: currentUser,
        debitCustomerBankAbbriviation: sendingAbbreviation,
        creditCustomerUsername: receivingCustomerName,
        creditCustomerBankAbbriviation: receivingAbbreviation,
        transferAmount: parseInt(amount),
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      toast.success("Transaction Successful", { autoClose: 1000 });
    }
  };

  const loadSelfAccountsData = async () => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", { username: currentUser })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      setSelfAccountsData(resp.data);
    }
  };
  const loadCustomersData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getAllCustomers")
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      setAllCustomers(resp.data);
    }
  };

  const loadReceiverCustomerAccounts = async (username) => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", {
        username,
      })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp.data);
      setReceiverCustomerAccounts(resp.data);
    }
  };

  useEffect(() => {
    loadSelfAccountsData();
    loadCustomersData();
  }, []);

  return (
    <div>
      <div className="container col-5 text-center mt-5 mb-4 p-3 border">
        <div className="h3">Account Transaction</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="sendingAbbreviation">
                Sending Bank Abbreviation
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sendingAbbreviation === ""
                    ? "Select Bank"
                    : sendingAbbreviation}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(selfAccountsData).map((data) => {
                    return (
                      <li key={data.bank.id}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setSendingAbbreviation(data.bank.abbreviation)
                          }
                        >
                          {data.bank.abbreviation}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="receivingCustomerName">
                Receiving Customer Name
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {receivingCustomerName === ""
                    ? "Select Customer"
                    : receivingCustomerName}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(allCustomers).map((data) => {
                    return (
                      <li key={data.id}>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            setReceivingCustomerName(data.credential.username);
                            loadReceiverCustomerAccounts(
                              data.credential.username
                            );
                          }}
                        >
                          {data.credential.username}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="receivingAbbreviation">
                Receiving Bank Abbreviation
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {receivingAbbreviation === ""
                    ? "Select Account"
                    : receivingAbbreviation}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(receiverCustomerAccounts).map((data) => {
                    return (
                      <li key={data.bank.id}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setReceivingAbbreviation(data.bank.abbreviation)
                          }
                        >
                          {data.bank.abbreviation}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="amount">
                Amount to send
              </label>
              <input
                className="form-control"
                type="text"
                name="amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 ">
              <button className="btn btn-primary">Send Amount</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
