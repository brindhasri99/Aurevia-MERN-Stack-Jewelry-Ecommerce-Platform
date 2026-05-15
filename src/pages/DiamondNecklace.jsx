import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const localProducts = [
  { id: "dn1", name: "Diamond Pendant Necklace", price: 65000, image: "/dneck (1).jpeg", category: "pendant" },
  { id: "dn2", name: "Classic Diamond Necklace", price: 85000, image: "/dneck (2).jpeg", category: "classic" },
  { id: "dn3", name: "Bridal Diamond Set", price: 120000, image: "/dneck (3).jpeg", category: "bridal" },
  { id: "dn4", name: "Modern Diamond Chain", price: 70000, image: "/dneck (4).jpeg", category: "chain" },
  { id: "dn5", name: "Luxury Diamond Necklace", price: 150000, image: "/dneck (5).jpeg", category: "luxury" },
  { id: "dn6", name: "Designer Diamond Necklace", price: 95000, image: "/dneck (6).jpeg", category: "designer" }
];

const DiamondNecklace = () => {

const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("diamond-necklaces", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Diamond Necklace Collection
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
          <option value="pendant">Pendant</option>
          <option value="classic">Classic</option>
          <option value="bridal">Bridal</option>
          <option value="chain">Chain</option>
          <option value="luxury">Luxury</option>
          <option value="designer">Designer</option>
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

export default DiamondNecklace;