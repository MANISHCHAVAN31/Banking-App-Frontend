import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SelfTransaction = () => {
  const currentUsername = useParams().username;
  const [debitBankAbbriviation, setDebitBankAbbriviation] = useState("");
  const [creditBankAbbriviation, setCreditBankAbbriviation] = useState("");
  const [amount, setAmount] = useState("");

  const [selfAccountData, setSelfAccountData] = useState({});
  const [customersData, setCustomersData] = useState({});

  const handleSelfTransfer = async (e) => {
    e.preventDefault();

    if (
      debitBankAbbriviation === "" &&
      creditBankAbbriviation === "" &&
      amount === ""
    ) {
      alert("Invalid Data");
      return;
    }

    if (creditBankAbbriviation === debitBankAbbriviation) {
      alert("Can not perform operation in same account");
      return;
    }

    let resp = await axios
      .post("http://localhost:9000/transfer", {
        debitCustomerUsername: currentUsername,
        debitCustomerBankAbbriviation: debitBankAbbriviation,
        creditCustomerUsername: currentUsername,
        creditCustomerBankAbbriviation: creditBankAbbriviation,
        transferAmount: parseInt(amount),
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp.data);
      toast.success("Tranasction Completed", { autoClose: 1000 });
    }
  };

  const loadCurrentCustomerData = async () => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", {
        username: currentUsername,
      })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp.data);
      setSelfAccountData(resp.data);
    }
  };

  useEffect(() => {
    loadCurrentCustomerData();
  }, []);

  return (
    <div>
      <div className="container col-5 text-center mt-5 p-3 border">
        <div className="h3">Self Transaction</div>
        <div>
          <form onSubmit={handleSelfTransfer}>
            <div className="mb-3">
              <label className="form-label" htmlFor="debitBankAbbriviation">
                Debit Bank Abbreviation
              </label>

              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {debitBankAbbriviation === ""
                    ? "Select Bank"
                    : debitBankAbbriviation}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(selfAccountData).map((data) => {
                    return (
                      <li key={data.bank.id}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setDebitBankAbbriviation(data.bank.abbreviation)
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
              <label className="form-label" htmlFor="creditBankAbbriviation">
                Credit Bank Abbreviation
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {creditBankAbbriviation === ""
                    ? "Select Bank"
                    : creditBankAbbriviation}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(selfAccountData).map((data) => {
                    return (
                      <li key={data.bank.bankId}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setCreditBankAbbriviation(data.bank.abbreviation)
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
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Send Amount
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelfTransaction;
