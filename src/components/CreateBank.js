import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateBank = () => {
  const [fullName, setFullName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fullName === "" && abbreviation === "") {
      alert("Invalid data");
    }

    let resp = await axios
      .post("http://localhost:9000/createBank", { fullName, abbreviation })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
      });

    if (resp) {
      console.log(resp.data);
      toast.success("Bank created successfully", { autoClose: 1000 });
    }
  };

  return (
    <div>
      <div className="container text-center mt-5 col-5">
        <div className="h2">Create new Bank</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="fullName">
              Bank Full Name
            </label>
            <input
              className="form-control"
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="abbreviation">
              Bank Name Abbreviation
            </label>
            <input
              className="form-control"
              type="text"
              name="abbreviation"
              value={abbreviation}
              onChange={(e) => {
                setAbbreviation(e.target.value);
              }}
            />
          </div>
          <div className="pb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBank;
