// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/Sidebar.css";  // We'll define custom CSS styles for the sidebar
// import Sidebar from './components/Sidebar'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Yogurt Management</h2>
      </div>
      <ul className="sidebar-list">
        {/* <li>
          <Link to="/" className="sidebar-item">
            Dashboard
          </Link>
        </li> */}
        {/* <li>
          <Link to="/sale" className="sidebar-item">
          <i className="bi bi-cash-stack display-4 text-success"></i>
            Sale
          </Link>
        </li> */}
        <li>
        
          <Link to="/product" className="sidebar-item">
          <i className="bi bi-box-seam display-4 text-danger" style={{ fontSize: "30px" }}></i>


            Product
          </Link>
        </li>
        <li>
          <Link to="/customer" className="sidebar-item">
          <i className="bi bi-person-fill display-4 text-primary" style={{ fontSize: "30px" }}></i>
            
            
            Customer
          </Link>
        </li>
        <li>
          <Link to="/delivery" className="sidebar-item">
          <i className="bi bi-truck text-warning" style={{ fontSize: "30px" }}></i>

            
            
            Delivery
          </Link>
        </li>
      </ul>
       {/* Logout Button
       <div className="mt-auto">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
