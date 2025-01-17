import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // Orders state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product for ordering
  const [quantity, setQuantity] = useState(1); // To store quantity for order
  const [customerId, setCustomerId] = useState(1); // Assuming a logged-in customer (set based on your actual logic)
  const API_URL = "http://127.0.0.1:8000/api/product/";
  const ORDER_API_URL = "http://127.0.0.1:8000/api/order/";

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(ORDER_API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle Open Modal to Order
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setQuantity(1); // Reset quantity
  };

  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (!selectedProduct || quantity <= 0) return; // Validate input

    try {
      // Calculate total price
      const totalPrice = (selectedProduct.price * quantity).toFixed(2);

      // Get today's date (or set your own sale date)
      const saleDate = new Date().toISOString().split('T')[0]; // Format: "YYYY-MM-DD"

      const orderData = {
        customer: customerId, // Replace with the actual customer ID
        product: selectedProduct.id, // The product ID
        quantity: quantity, // The quantity the user wants to order
        totalPrice: totalPrice, // Total price for the order
        saleDate: saleDate, // Sale date
      };

      // Log the order data to verify before sending the request
      console.log("Order Data:", orderData);

      // POST request to create the order
      const response = await axios.post(ORDER_API_URL, orderData);
      console.log("Order placed successfully:", response.data); // Log the success response
      alert("Order placed successfully!");
      setShowModal(false); // Close the modal
      setQuantity(1); // Reset quantity

      // Fetch updated orders after placing the order
      fetchOrders();

    } catch (error) {
      // Log the full error response for debugging
      if (error.response) {
        console.error("Error placing order:", error.response.data);
        alert(`Failed to place order. Error: ${error.response.data.detail || error.response.data}`);
      } else {
        console.error("Error placing order:", error.message);
        alert(`Failed to place order. Error: ${error.message}`);
      }
    }
  };

  // Fetch products and orders on component mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product Management</h2>

      {/* Product List Table (Removed Quantity Column) */}
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center">Product List</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (TZS)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.Category}</td>
                  <td>{product.price} TZS</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleOpenModal(product)}
                    >
                      Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center">No products available.</p>
          )}
        </div>
      </div>

      {/* Order Table */}
      <div className="mt-5">
        <h3>Orders</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price (TZS)</th>
              <th>Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice} TZS</td>
                <td>{order.saleDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center">No orders placed yet.</p>
        )}
      </div>

      {/* Order Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Order</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Product: {selectedProduct?.productName}</label>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max={selectedProduct?.quantity || 1}
                  />
                </div>
                {/* Display Product Name, Total Price, Sale Date in Modal */}
                <div className="mt-3">
                  <h6>Product Details</h6>
                  <p><strong>Product Name:</strong> {selectedProduct?.productName}</p>
                  <p><strong>Total Price:</strong> {(selectedProduct?.price * quantity).toFixed(2)} TZS</p>
                  <p><strong>Sale Date:</strong> {new Date().toISOString().split('T')[0]}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
