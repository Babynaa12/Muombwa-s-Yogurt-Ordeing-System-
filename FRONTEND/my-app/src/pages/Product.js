import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [price, setPrice] = useState(0);

  const API_URL = "http://127.0.0.1:8000/api/product/";
  const ORDER_API_URL = "http://127.0.0.1:8000/api/order/";
  const CUSTOMER_API_URL = "http://127.0.0.1:8000/api/customer/";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(ORDER_API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(CUSTOMER_API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Open Modal and set default values
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setQuantity(1);
    setPrice(product.price); // Set initial price
  };

  // Close Modal and reset values
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
    setCustomerId("");
    setPrice(0);
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!selectedProduct || quantity <= 0 || !customerId) {
      alert("Please fill all fields before placing the order.");
      return;
    }

    try {
      const totalPrice = (selectedProduct.price * quantity).toFixed(2);
      const saleDate = new Date().toISOString().split("T")[0];

      const orderData = {
        customer: customerId,
        product: selectedProduct.id,
        quantity,
        totalPrice,
        order_date: saleDate,
        status: "Pending",
      };

      const response = await axios.post(ORDER_API_URL, orderData);
      alert("Order placed successfully!");
      handleCloseModal(); // Close modal and reset
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Failed to place order. Check your inputs or try again later.");
    }
  };

  // Update price dynamically
  useEffect(() => {
    if (selectedProduct) {
      setPrice((selectedProduct.price * quantity).toFixed(2));
    }
  }, [quantity, selectedProduct]);

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, []);

  // Helper to get product name by ID
  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.productName : "Unknown Product";
  };

  // Helper to get customer name by ID
  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.customerName : "Unknown Customer";
  };
  const getPrice = (productId) => {
    const product = products.find((c) => c.id === productId);
    return product ? product.price : "";
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product Management</h2>

      {/* Product List */}
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
          {products.length === 0 && <p className="text-center">No products available.</p>}
        </div>
      </div>

      {/* Order List */}
      <div className="mt-5">
        <h3>Orders</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Customer Name</th>
              <th>Quantity</th>
              <th>Total Price (TZS)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{getProductName(order.product)}</td>
                <td>{getCustomerName(order.customer)}</td>
               
                <td>{order.quantity}</td>
                {/* <td>TZS{order.price} </td> */}
                <td>{(getPrice(order.product) * order.quantity).toFixed(2)} TZS</td>

              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="text-center">No orders placed yet.</p>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Place Order</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
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
                    onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Customer Name</label>
                  <select
                    className="form-control"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.customerName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Price</label>
                  <input type="text" className="form-control" value={price} readOnly />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handlePlaceOrder}>
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
