import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const currentUser = useParams().username;
  const [abbreviation, setAbbreviation] = useState("");

  const [bankAbbreviationData, setBankAbbreviationData] = useState({});
  const [selectedBankAbbreviation, setSelectedBankAbbreviation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let resp = await axios
      .post("http://localhost:9000/createAccount", {
        username: currentUser,
        bankAbbreviation: selectedBankAbbreviation,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
      });

    if (resp) {
      console.log(resp.data);
      toast.success("Account Created", { autoClose: 1000 });
    }
  };

  const loadBankAbbreviations = async () => {
    let resp = await axios
      .get("http://localhost:9000/getAllBanks")
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
      <div className="container text-center mt-5 col-5">
        <div className="h2">Create new Account</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="fullName">
              Select Bank Abbreviation
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
                    <li key={data.id}>
                      <a
                        className="dropdown-item"
                        onClick={() =>
                          setSelectedBankAbbreviation(data.abbreviation)
                        }
                      >
                        {data.abbreviation}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="pb-3">
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
