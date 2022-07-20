import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const WithdrawalAmount = () => {
  const currentUser = useParams().username;
  const [amount, setAmount] = useState("");
  const [bankAbbreviationData, setBankAbbreviationData] = useState({});
  const [selectedBankAbbreviation, setSelectedBankAbbreviation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBankAbbreviation === "" && amount === "") {
      alert("Invalid Data");
    }

    let resp = await axios
      .post("http://localhost:9000/withdrawal", {
        username: currentUser,
        bankAbbreviation: selectedBankAbbreviation,
        withdrawAmount: parseInt(amount),
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp.data);
      toast.success(`Amount ${amount} withdrawed`, { autoClose: 1000 });
    }
  };

  const loadBankAbbreviations = async () => {
    let resp = await axios
      .post("http://localhost:9000/getUserAccounts", { username: currentUser })
      .catch((error) => {
        console.log(error);
      });

    if (resp) {
      console.log(resp.data);
      setBankAbbreviationData(resp.data);
    }
  };

  useState(() => {
    loadBankAbbreviations();
  }, []);

  return (
    <div>
      <div className="container col-5 text-center mt-5 p-3 border">
        <div className="h3">Withdraw Amount</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="abbreviation">
                Bank Abbreviation
              </label>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedBankAbbreviation === ""
                    ? "Select Bank"
                    : selectedBankAbbreviation}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {Object.values(bankAbbreviationData).map((data) => {
                    return (
                      <li key={data.bank.id}>
                        <a
                          className="dropdown-item"
                          onClick={() =>
                            setSelectedBankAbbreviation(data.bank.abbreviation)
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
                Amount
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
                Withdraw Amount
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalAmount;
