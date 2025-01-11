import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [product, setProduct] = useState("");
  const [customer, setCustomer] = useState("");
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

  // Handle form submission for adding or updating a sale
  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = {
      totalPrice,
      saleDate,
      product,
      customer,
    };

    const config = {
      headers: {
        "Content-Type": "application/json", // Ensure content-type is set to application/json
      },
    };

    try {
      if (editingSaleId) {
        // Update sale
        await axios.put(`${API_URL}${editingSaleId}/`, saleData, config);
        alert("Sale updated successfully!");
      } else {
        // Add new sale
        await axios.post(API_URL, saleData, config);
        alert("Sale added successfully!");
      }

      // Reset form
      setTotalPrice("");
      setSaleDate("");
      setProduct("");
      setCustomer("");
      setEditingSaleId(null);

      // Refresh sales list
      fetchSales();
    } catch (error) {
      console.error("Error saving sale:", error.response?.data || error.message);
      alert("Error saving sale.");
    }
  };

  // Handle sale deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      alert("Sale deleted successfully!");
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  // Handle editing a sale
  const handleEdit = (sale) => {
    setEditingSaleId(sale.id);
    setTotalPrice(sale.totalPrice);
    setSaleDate(sale.saleDate);
    setProduct(sale.product);
    setCustomer(sale.customer);
  };

  // Fetch sales on component mount
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sales Management</h2>

      <div className="row">
        {/* Sales Form on the Left */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="text-center">
                {editingSaleId ? "Edit Sale" : "Add Sale"}
              </h4>
              <form onSubmit={handleSubmit}>
                {/* Total Price */}
                <div className="mb-3">
                  <label htmlFor="totalPrice" className="form-label">
                    Total Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalPrice"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    placeholder="Enter total price"
                    required
                  />
                </div>

                {/* Sale Date */}
                <div className="mb-3">
                  <label htmlFor="saleDate" className="form-label">
                    Sale Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="saleDate"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    required
                  />
                </div>

                {/* Product */}
                <div className="mb-3">
                  <label htmlFor="product" className="form-label">
                    Product
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Enter product ID"
                    required
                  />
                </div>

                {/* Customer */}
                <div className="mb-3">
                  <label htmlFor="customer" className="form-label">
                    Customer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="Enter customer ID"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {editingSaleId ? "Update Sale" : "Add Sale"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sales List on the Right */}
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
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.id}</td>
                      <td>{sale.totalPrice}</td>
                      <td>{sale.saleDate}</td>
                      <td>{sale.product}</td>
                      <td>{sale.customer}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(sale)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(sale.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sales.length === 0 && (
                <p className="text-center">No sales available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
