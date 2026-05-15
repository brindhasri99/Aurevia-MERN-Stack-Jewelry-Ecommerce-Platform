import { useState, useEffect } from "react";

const useProducts = (category, localProducts) => {
  const [dbProducts, setDbProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDbProducts(data);
      })
      .catch(() => setDbProducts([]));
  }, [category]);

  // Merge: local first, then DB products not already in local list
  const merged = [
    ...localProducts,
    ...dbProducts.filter((dbp) => !localProducts.find((lp) => lp.name === dbp.name)),
  ];

  return merged;
};

export default useProducts;
