import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const localProducts = [
  { id: "de1", name: "Diamond Stud Earrings", price: 25000, image: "/dear (1).jpeg", category: "stud" },
  { id: "de2", name: "Drop Diamond Earrings", price: 35000, image: "/dear (2).jpeg", category: "drop" },
  { id: "de3", name: "Hoop Diamond Earrings", price: 40000, image: "/dear (3).jpeg", category: "hoop" },
  { id: "de4", name: "Luxury Diamond Earrings", price: 55000, image: "/dear (4).jpeg", category: "premium" },
  { id: "de5", name: "Bridal Diamond Earrings", price: 70000, image: "/dear (5).jpeg", category: "bridal" },
  { id: "de6", name: "Designer Diamond Earrings", price: 45000, image: "/dear (6).jpeg", category: "designer" }
];

const DiamondEarrings = () => {

  // ✅ MUST be inside component
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("diamond-earrings", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Diamond Earrings Collection
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
          <option value="stud">Stud</option>
          <option value="drop">Drop</option>
          <option value="hoop">Hoop</option>
          <option value="bridal">Bridal</option>
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

export default DiamondEarrings;