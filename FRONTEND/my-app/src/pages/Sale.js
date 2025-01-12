import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    totalPrice: "",
    saleDate: "",
    product: "",
    customer: "",
  });
  const [editingSaleId, setEditingSaleId] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/sale/";

  // Fetch all sales
  const fetchSales = async () => {
    try {
      const response = await axios.get(API_URL);
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      if (editingSaleId) {
        // Update sale
        await axios.put(`${API_URL}${editingSaleId}/`, formData);
        alert("Sale updated successfully!");
      } else {
        // Add new sale
        await axios.post(API_URL, formData);
        alert("Sale added successfully!");
      }

      // Reset form
      setFormData({
        totalPrice: "",
        saleDate: "",
        product: "",
        customer: "",
      });
      setEditingSaleId(null);
      fetchSales();
    } catch (error) {
      console.error("Error saving sale:", error.response?.data || error.message);
      alert("Error saving sale.");
    }
  };

  // Handle deleting a sale
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      alert("Sale deleted successfully!");
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
      alert("Error deleting sale.");
    }
  };

  // Handle editing a sale
  const handleEdit = (sale) => {
    setEditingSaleId(sale.id);
    setFormData({
      totalPrice: sale.totalPrice,
      saleDate: sale.saleDate,
      product: sale.product,
      customer: sale.customer,
    });
  };

  // Fetch sales when component mounts
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sales Management</h2>

      <div className="row">
        {/* Form Section */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center">
                {editingSaleId ? "Edit Sale" : "Add Sale"}
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="totalPrice" className="form-label">
                    Total Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalPrice"
                    name="totalPrice"
                    value={formData.totalPrice}
                    onChange={handleInputChange}
                    placeholder="Enter total price"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="saleDate" className="form-label">
                    Sale Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="saleDate"
                    name="saleDate"
                    value={formData.saleDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="product" className="form-label">
                    Product
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    placeholder="Enter product ID"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customer" className="form-label">
                    Customer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customer"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    placeholder="Enter customer ID"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {editingSaleId ? "Update Sale" : "Add Sale"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sales List Section */}
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center">Sales List</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Total Price</th>
                    <th>Sale Date</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.length > 0 ? (
                    sales.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.id}</td>
                        <td>{sale.totalPrice}</td>
                        <td>{sale.saleDate}</td>
                        <td>{sale.product}</td>
                        <td>{sale.customer}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(sale)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(sale.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No sales available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
