import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getKey = (item) => item._id || item.id;

  const placeOrder = async () => {
    try {
      // Build headers — include auth token only if logged in
      const headers = { "Content-Type": "application/json" };
      if (user?.token) headers["Authorization"] = `Bearer ${user.token}`;

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers,
        body: JSON.stringify({ items: cart, totalAmount: total }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Order failed: " + (data.error || data.msg || "Unknown error"));
        return;
      }

      alert("Order placed successfully ✅");
      setCart([]);
    } catch (err) {
      alert("Cannot reach server. Make sure the backend is running on port 5000.");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8f5f2] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 tracking-wide">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow">
          <p className="text-4xl mb-4">🛒</p>
          <p className="text-gray-400 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-xl text-sm hover:bg-yellow-500 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={getKey(item)}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80x80?text=No+Image"; }}
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-yellow-600 text-sm">₹ {item.price?.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(getKey(item))}
                      className="w-7 h-7 bg-gray-100 rounded-lg text-gray-700 font-bold hover:bg-gray-200 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-medium text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(getKey(item))}
                      className="w-7 h-7 bg-gray-100 rounded-lg text-gray-700 font-bold hover:bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₹ {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(getKey(item))}
                    className="text-red-400 text-xs mt-1 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm text-gray-600">
              {cart.map((item) => (
                <div key={getKey(item)} className="flex justify-between gap-2">
                  <span className="truncate">{item.name} × {item.quantity}</span>
                  <span className="flex-shrink-0">₹ {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span className="text-yellow-600">₹ {total.toLocaleString()}</span>
            </div>

            {!user && (
              <p className="mt-3 text-xs text-gray-400 text-center">
                You can place orders as a guest or{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-yellow-600 cursor-pointer underline"
                >
                  login
                </span>
                {" "}to track them.
              </p>
            )}

            <button
              onClick={placeOrder}
              className="mt-4 w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-medium tracking-wider hover:bg-yellow-500 transition-colors duration-300"
            >
              Place Order
            </button>
            <button
              onClick={() => navigate("/")}
              className="mt-2 w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
