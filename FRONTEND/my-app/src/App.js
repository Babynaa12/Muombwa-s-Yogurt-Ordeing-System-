// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./Dashboard";  // Make sure to import your existing Dashboard component
 // Create other components for Sales, Products, Customers, and Deliveries
import Customer from "./pages/Customer";
import Product from "./pages/Product";
import Sale from "./pages/Sale";
import Delivery from "./pages/Delivery";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Sidebar/>
          <Routes>
            {<Route path="/" element={<Login />} /> }
            <Route path="/sale" element={<Sale />}/>
            <Route path="/product" element={<Product />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/delivery" element={<Delivery/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
