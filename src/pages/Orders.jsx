import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 shadow rounded">
          <p>Status: {order.status}</p>
          <p>Total: ₹ {order.totalAmount}</p>

          {order.items.map((item, i) => (
            <div key={i}>
              {item.name} - {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;