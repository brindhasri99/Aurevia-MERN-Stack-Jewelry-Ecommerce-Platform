import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupItem, setPopupItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getKey = (product) => product._id || product.id;

  const addToCart = (product) => {
    const key = getKey(product);
    setCart((prev) => {
      const existing = prev.find((item) => getKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          getKey(item) === key ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setPopupItem(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => getKey(item) !== key));
  };

  const increaseQty = (key) => {
    setCart((prev) =>
      prev.map((item) => getKey(item) === key ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const decreaseQty = (key) => {
    setCart((prev) =>
      prev.map((item) => getKey(item) === key ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, increaseQty, decreaseQty, showPopup, popupItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
