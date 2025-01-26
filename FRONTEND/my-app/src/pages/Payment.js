import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  const [payments, setPayments] = useState([]); // Payments state
  const [orders, setOrders] = useState([]); // Orders for dropdown
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [selectedOrderId, setSelectedOrderId] = useState(""); // Selected order
  const [amount, setAmount] = useState(""); // Payment amount
  const [paymentStatus, setPaymentStatus] = useState("Pending"); // Payment status

  const PAYMENT_API_URL = "http://127.0.0.1:8000/api/payment/"; // API for payments
  const ORDER_API_URL = "http://127.0.0.1:8000/api/order/"; // API for orders

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const response = await axios.get(PAYMENT_API_URL);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
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

  // Handle Open Modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrderId("");
    setAmount("");
    setPaymentStatus("Pending");
  };

  // Handle Submit Payment
  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!selectedOrderId || !amount || amount <= 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const paymentData = {
      order: selectedOrderId,
      amount,
      payment_status: paymentStatus,
    };

    try {
      const response = await axios.post(PAYMENT_API_URL, paymentData);
      console.log("Payment created:", response.data);
      alert("Payment successfully created!");
      fetchPayments(); // Refresh the payments list
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPayments();
    fetchOrders();
  }, []);

  // Map order names to payment records
  const getOrderName = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    return order ? `Order ${order.id}` : "Unknown Order";
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Management</h2>

      {/* Payment List Table */}
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title text-center">Payments</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>Payment Date</th>
                <th>Amount (TZS)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{getOrderName(payment.order)}</td>
                  <td>{payment.payment_date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && <p className="text-center">No payments found.</p>}
        </div>
      </div>

      {/* Add Payment Button */}
      <div className="mt-3 text-center">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          Add Payment
        </button>
      </div>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Payment</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitPayment}>
                  {/* Order Selection */}
                  <div className="form-group">
                    <label>Order</label>
                    <select
                      className="form-control"
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      required
                    >
                      <option value="">Select Order</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          Order {order.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Input */}
                  <div className="form-group">
                    <label>Amount (TZS)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      min="1"
                      required
                    />
                  </div>

                  {/* Payment Status */}
                 

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
