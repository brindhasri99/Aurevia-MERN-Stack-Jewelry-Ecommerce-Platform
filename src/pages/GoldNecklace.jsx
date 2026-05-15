import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";


const localProducts = [
  { id: "gn1", name: "Temple Necklace", price: 55000, image: "/gneck (1).jpeg", category: "temple" },
  { id: "gn2", name: "Bridal Necklace", price: 75000, image: "/gneck (2).jpeg", category: "bridal" },
  { id: "gn3", name: "Antique Necklace", price: 65000, image: "/gneck (3).jpeg", category: "antique" },
  { id: "gn4", name: "Long Haram", price: 82000, image: "/gneck (4).jpeg", category: "long" },
  { id: "gn5", name: "Short Necklace", price: 48000, image: "/gneck (5).jpeg", category: "short" },
  { id: "gn6", name: "Designer Necklace", price: 90000, image: "/gneck (6).jpeg", category: "designer" }
];

const GoldNecklace = () => {
    
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("gold-necklaces", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Gold Necklace Collection
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
          <option value="temple">Temple</option>
          <option value="bridal">Bridal</option>
          <option value="antique">Antique</option>
          <option value="long">Long</option>
          <option value="short">Short</option>
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

       

export default GoldNecklace;