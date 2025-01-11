import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/customer/";

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle form submission for adding or updating a customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      customerName,
      customerNumber,
      customerAddress,
    };

    try {
      if (editingCustomerId) {
        // Update customer
        await axios.put(`${API_URL}${editingCustomerId}/`, customerData);
        alert("Customer updated successfully!");
      } else {
        // Add new customer
        await axios.post(API_URL, customerData);
        alert("Customer added successfully!");
      }

      // Reset form
      setCustomerName("");
      setCustomerNumber("");
      setCustomerAddress("");
      setEditingCustomerId(null);

      // Refresh customer list
      fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  // Handle customer deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      alert("Customer deleted successfully!");
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Handle editing a customer
  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);
    setCustomerName(customer.customerName);
    setCustomerNumber(customer.customerNumber);
    setCustomerAddress(customer.customerAddress);
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Customer Management</h2>

      <div className="row">
        {/* Customer Form */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center">
                {editingCustomerId ? "Edit Customer" : "Add Customer"}
              </h4>
              <form onSubmit={handleSubmit}>
                {/* Customer Name */}
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                {/* Customer Number */}
                <div className="mb-3">
                  <label htmlFor="customerNumber" className="form-label">
                    Customer Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="customerNumber"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    placeholder="Enter customer number"
                    required
                  />
                </div>

                {/* Customer Address */}
                <div className="mb-3">
                  <label htmlFor="customerAddress" className="form-label">
                    Customer Address
                  </label>
                  <textarea
                    className="form-control"
                    id="customerAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Enter customer address"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {editingCustomerId ? "Update Customer" : "Add Customer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center">Customer List</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.customerName}</td>
                      <td>{customer.customerNumber}</td>
                      <td>{customer.customerAddress}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customers.length === 0 && (
                <p className="text-center">No customers available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
