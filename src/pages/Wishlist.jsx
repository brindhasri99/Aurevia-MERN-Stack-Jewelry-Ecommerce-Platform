import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="p-10">
      <h1>Your Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No items added</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id}>
            <img src={item.image} width="100" />
            <h2>{item.name}</h2>
            <p>₹ {item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;