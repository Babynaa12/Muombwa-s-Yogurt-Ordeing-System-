import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Delivery List */}
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Delivery List</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Number</th> {/* Added Delivery Number */}
                    <th>Product</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id}>
                      <td>{delivery.id}</td>
                      <td>{delivery.DeliveryName}</td>
                      <td>{delivery.DeliveryNumber}</td> {/* Display Delivery Number */}
                      <td>{delivery.DeliveryProduct}</td>
                      <td>{delivery.DeliveryAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {deliveries.length === 0 && (
                <p className="text-center">No deliveries found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
