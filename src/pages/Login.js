import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      alert("Invalid Credentials");
    }

    //axios
    let resp = await axios
      .post("http://localhost:9000/login", {
        username,
        password,
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data, { autoClose: 1000 });
        return;
      });

    if (resp) {
      console.log(resp.data);
    }

    if (resp.data.credential.username === "manish") {
      navigate(`/admindashboard/${username}`);
    } else {
      navigate(`/customerdashboard/${username}`);
    }
  };

  return (
    <div>
      <div className="container mt-5 col-5 offset-3 text-center bg-dark text-white border border-2">
        <div>
          <div className="display-5 my-3 pt-2 fw-bold">Banking System</div>
          <div className="h5">Sign in to continue</div>
        </div>
        <form className="container col-10" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 pb-3 d-grid">
            <button type="submit" className="btn btn-primary">
              login
            </button>
          </div>
        </form>
      </div>

      {/* footer */}
    </div>
  );
};

export default Login;
