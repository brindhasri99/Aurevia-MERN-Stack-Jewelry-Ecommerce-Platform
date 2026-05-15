import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1 });
  };

  return (
    <div
      onClick={() =>
        navigate(`/product/${item._id || item.id}`, { state: { item } })
      }
      className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-xl transition group relative z-0"
    >
      {/* ❤️ Wishlist */}
      <div className="absolute top-3 right-3 z-10">
        <FaHeart
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(item);
          }}
          className="text-gray-400 hover:text-red-500 cursor-pointer"
        />
      </div>

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[280px] object-cover rounded"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x280?text=No+Image";
        }}
      />

      <h2 className="mt-3 font-medium text-gray-800">{item.name}</h2>
      <p className="text-yellow-600">₹ {item.price?.toLocaleString()}</p>

      {/* Add to Cart button — visible on hover */}
      <button
        onClick={handleAddToCart}
        className="mt-2 w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white text-sm py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500"
      >
        <FaShoppingCart className="text-xs" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
