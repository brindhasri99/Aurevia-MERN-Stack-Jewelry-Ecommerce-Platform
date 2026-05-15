import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [item, setItem] = useState(state?.item || null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // Only fetch from DB if it looks like a MongoDB ObjectId (24 hex chars)
    if (!item && id && /^[a-f\d]{24}$/i.test(id)) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setItem(data))
        .catch(() => {});
    }
  }, [id]);

  if (!item) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl text-gray-500">Loading...</h1>
      </div>
    );
  }

  // Use the item's actual price — no hardcoded gold rate override
  const unitPrice = item.price || 0;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    addToCart({ ...item, price: unitPrice, quantity: qty });
  };

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen grid md:grid-cols-2 gap-10">
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[500px] object-cover rounded-xl"
      />

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-semibold">{item.name}</h1>

        <p className="text-yellow-600 text-2xl mt-2">
          ₹ {unitPrice.toLocaleString()}
        </p>

        {item.category && (
          <p className="text-gray-400 text-sm mt-1 capitalize">
            {item.category.replace(/-/g, " ")}
          </p>
        )}

        <div className="mt-6 space-y-2 text-gray-600 text-sm">
          {item.stock !== undefined && <p>In Stock: {item.stock} pieces</p>}
          <p>Making Charges: Included</p>
          <p>Free shipping on orders above ₹50,000</p>
        </div>

        {/* QUANTITY */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-9 h-9 bg-gray-100 rounded-lg text-lg hover:bg-gray-200 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-lg font-medium w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-9 h-9 bg-gray-100 rounded-lg text-lg hover:bg-gray-200 flex items-center justify-center"
          >
            +
          </button>
        </div>

        {qty > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            Total: ₹ {totalPrice.toLocaleString()}
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-3 block text-gray-400 text-sm hover:text-gray-600"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
