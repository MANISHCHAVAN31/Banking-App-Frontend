import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const DisplayCustomers = () => {
  const [customerData, setCustomerData] = useState({});
  const Navigate = useNavigate();

  const loadCustomerData = async () => {
    let resp = await axios
      .get("http://localhost:9000/getAllCustomers")
      .catch((error) => {
        console.log(error);
        if (error.response.data === "Login first to proceed") {
          Navigate("/");
        }
      });

    if (resp) {
      console.log(resp.data);
      setCustomerData(resp.data);
      return;
    }
  };

  const handleToggle = async (username) => {
    let resp = await axios
      .post("http://localhost:9000/disableCustomer", {
        username: username,
      })
      .catch((error) => {
        console.log(error);
      });
    if (resp) {
      loadCustomerData();
      console.log("customer disabled successfully");
    }
  };

  useEffect(() => {
    loadCustomerData();
  }, [customerData]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5 text-center">
        <div className="h3">All Customers</div>

        <div className="mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className="py-3">Username</th>
                <th className="py-3">First Name</th>
                <th className="py-3">Last Name</th>
                <th className="py-3">Total Balance</th>
                <th className="py-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(customerData).map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data.credential.username}</td>
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.totalbalance}</td>
                    <td>
                      <label>
                        <Switch
                          checked={data.isactive}
                          onChange={() =>
                            handleToggle(data.credential.username)
                          }
                        />
                      </label>
                    </td>
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

export default DisplayCustomers;
