import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";


const localProducts = [
  { id: "ge1", name: "Gold Jhumka", price: 12000, image: "/gear (1).jpeg", category: "jhumka" },
  { id: "ge2", name: "Stud Earrings", price: 8000, image: "/gear (2).jpeg", category: "stud" },
  { id: "ge3", name: "Temple Earrings", price: 18000, image: "/gear (3).jpeg", category: "temple" },
  { id: "ge4", name: "Chandbali Earrings", price: 20000, image: "/gear (4).jpeg", category: "chandbali" },
  { id: "ge5", name: "Drop Earrings", price: 15000, image: "/gear (5).jpeg", category: "drop" },
  { id: "ge6", name: "Designer Earrings", price: 22000, image: "/gear (6).jpeg", category: "designer" }
];

const GoldEarrings = () => {
   
 const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("gold-earrings", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Gold Earrings Collection
      </h1>

      {/* 🔍 FILTER UI */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />

        {/* PRICE */}
        <div>
          <p className="text-sm">Max Price: ₹ {maxPrice}</p>
          <input
            type="range"
            min="0"
            max="150000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="jhumka">Jhumka</option>
          <option value="stud">Stud</option>
          <option value="drop">Drop</option>
          <option value="temple">Temple</option>
          <option value="chandbali">Chandbali</option>
        </select>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredProducts.map((item) => (
          <ProductCard key={item._id || item.id} item={item} />
        ))}

      </div>

    </div>
  );
};

export default GoldEarrings;