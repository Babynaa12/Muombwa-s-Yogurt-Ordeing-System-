import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Delivery = () => {
  const [formData, setFormData] = useState({
    DeliveryName: '',
    DeliveryNumber: '',
    DeliveryAddress: '',
    DeliveryEmail: '',
    DeliveryProduct: '',
  });
  const [deliveries, setDeliveries] = useState([]);
  const [editId, setEditId] = useState(null); // For tracking if we're editing an existing delivery

  // Fetch deliveries on component mount
  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = () => {
    axios
      .get('http://127.0.0.1:8000/api/delivery/')
      .then((response) => setDeliveries(response.data))
      .catch((error) => console.error('Error fetching deliveries:', error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // Update existing delivery
      axios
        .put(`http://127.0.0.1:8000/api/delivery/${editId}/`, formData)
        .then((response) => {
          setDeliveries(
            deliveries.map((delivery) =>
              delivery.id === editId ? response.data : delivery
            )
          );
          resetForm();
        })
        .catch((error) => console.error('Error updating delivery:', error));
    } else {
      // Add new delivery
      axios
        .post('http://127.0.0.1:8000/api/delivery/', formData)
        .then((response) => {
          setDeliveries([...deliveries, response.data]);
          resetForm();
        })
        .catch((error) => console.error('Error adding delivery:', error));
    }
  };

  const handleEdit = (id) => {
    const deliveryToEdit = deliveries.find((delivery) => delivery.id === id);
    setFormData({
      DeliveryName: deliveryToEdit.DeliveryName,
      DeliveryNumber: deliveryToEdit.DeliveryNumber,
      DeliveryAddress: deliveryToEdit.DeliveryAddress,
      DeliveryEmail: deliveryToEdit.DeliveryEmail,
      DeliveryProduct: deliveryToEdit.DeliveryProduct,
    });
    setEditId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/delivery/${id}/`)
      .then(() => {
        setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
      })
      .catch((error) => console.error('Error deleting delivery:', error));
  };

  const resetForm = () => {
    setFormData({
      DeliveryName: '',
      DeliveryNumber: '',
      DeliveryAddress: '',
      DeliveryEmail: '',
      DeliveryProduct: '',
    });
    setEditId(null);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Form */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">
                {editId ? 'Edit Delivery' : 'Add Delivery'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Delivery Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="DeliveryName"
                    value={formData.DeliveryName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="DeliveryNumber"
                    value={formData.DeliveryNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Address</label>
                  <textarea
                    className="form-control"
                    name="DeliveryAddress"
                    value={formData.DeliveryAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="DeliveryEmail"
                    value={formData.DeliveryEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Delivery Product</label>
                  <input
                    type="text"
                    className="form-control"
                    name="DeliveryProduct"
                    value={formData.DeliveryProduct}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {editId ? 'Update Delivery' : 'Add Delivery'}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Delivery List */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Delivery List</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Address</th>
              
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>{delivery.id}</td>
                      <td>{delivery.DeliveryName}</td>
                      <td>{delivery.DeliveryProduct}</td>
                      <td>{delivery.DeliveryAddress}</td>
             
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleEdit(delivery.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(delivery.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
