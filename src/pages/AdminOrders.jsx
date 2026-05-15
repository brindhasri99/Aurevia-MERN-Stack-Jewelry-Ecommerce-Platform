import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/orders");
    setOrders(await res.json());
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Admin Orders</h1>
      {orders.map(o => (
        <div key={o._id} className="p-4 bg-white mb-3 shadow">
          <p>Total: ₹ {o.totalAmount}</p>
          <select
            value={o.status}
            onChange={(e)=>updateStatus(o._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}
