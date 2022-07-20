import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DisplayBanks from "./pages/DisplayBanks";
import Login from "./pages/Login";
import DisplayCustomers from "./pages/DisplayCustomers";
import CustomerDashboard from "./pages/CustomerDashboard";
import Accounts from "./pages/Accounts";
import Balance from "./pages/Balance";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/admindashboard/:username" element={<AdminDashboard />} />
        <Route
          path="/customerdashboard/:username"
          element={<CustomerDashboard />}
        />
        <Route path="/displaybanks/:username" element={<DisplayBanks />} />
        <Route
          path="/displaycustomers/:username"
          element={<DisplayCustomers />}
        />
        <Route path="/accounts/:username" element={<Accounts />} />
        <Route path="/balance/:username" element={<Balance />} />
      </Routes>
      <footer
        style={{ position: "fixed", bottom: 0, width: "100%" }}
        className="bg-dark text-white text-center py-2"
      >
        <h3>BANKING SYSTEM</h3>
      </footer>
    </BrowserRouter>
  );
};

export default App;
