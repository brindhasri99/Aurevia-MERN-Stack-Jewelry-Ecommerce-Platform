import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";


const localProducts = [
  { id: "dr1", name: "Solitaire Diamond Ring", price: 60000, image: "/dring.jpeg", category: "solitaire" },
  { id: "dr2", name: "Classic Diamond Ring", price: 45000, image: "/dring (2).jpeg", category: "classic" },
  { id: "dr3", name: "Engagement Ring", price: 80000, image: "/dring (3).jpeg", category: "engagement" },
  { id: "dr4", name: "Modern Diamond Ring", price: 52000, image: "/dring (4).jpeg", category: "modern" },
  { id: "dr5", name: "Luxury Diamond Ring", price: 95000, image: "/dring (5).jpeg", category: "luxury" },
  { id: "dr6", name: "Designer Diamond Ring", price: 70000, image: "/dring (6).jpeg", category: "designer" }
];

const DiamondRings = () => {
   
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("diamond-rings", localProducts);
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

export default DiamondRings;