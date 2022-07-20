import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const DisplayBanks = () => {
  const [bankData, setBankData] = useState({});
  const Navigate = useNavigate();

  const loadBankData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getAllBanks")
      .catch((error) => {
        console.log(error);

        if (error.response.data === "Login first to proceed") {
          Navigate("/");
        }
      });

    if (resp) {
      console.log(resp.data);
      setBankData(resp.data);
    }
  };

  useEffect(() => {
    loadBankData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <div className="h3">All Banks</div>
        <div className="mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="py-3">Full Name</th>
                <th className="py-3">Abbreviation</th>
                {/* <th className="py-3">Update</th> */}
              </tr>
            </thead>
            <tbody>
              {Object.values(bankData).map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.fullname}</td>
                    <td>{data.abbreviation}</td>
                    {/* <td>
                      <a className="btn btn-sm btn-primary">update</a>
                    </td> */}
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

export default DisplayBanks;
