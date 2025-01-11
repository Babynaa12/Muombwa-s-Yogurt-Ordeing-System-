import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faBox, faUsers, faTruck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Optional CSS for additional styling

const Sidebar = ({ onLogout }) => {
  return (
    <div className="d-flex flex-column vh-100 bg-light" style={{ width: '250px', padding: '20px' }}>
      <h4 className="text-center mb-4">Dashboard</h4>

      {/* Sidebar Links */}
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <a href="/home" className="nav-link text-dark">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Home
          </a>
        </li>
        <li className="nav-item mb-3">
          <a href="/products" className="nav-link text-dark">
            <FontAwesomeIcon icon={faBox} className="me-2" />
            Products
          </a>
        </li>
        <li className="nav-item mb-3">
          <a href="/customers" className="nav-link text-dark">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Customers
          </a>
        </li>
        <li className="nav-item mb-3">
          <a href="/deliveries" className="nav-link text-dark">
            <FontAwesomeIcon icon={faTruck} className="me-2" />
            Deliveries
          </a>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
