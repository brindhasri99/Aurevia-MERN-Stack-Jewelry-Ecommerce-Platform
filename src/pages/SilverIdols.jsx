import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const localProducts = [
  { id: "si1", name: "Silver Ganesh Idol", price: 5000, image: "/sidol (1).jpeg", category: "ganesh" },
  { id: "si2", name: "Silver Lakshmi Idol", price: 6200, image: "/sidol (2).jpeg", category: "lakshmi" },
  { id: "si3", name: "Silver Krishna Idol", price: 7500, image: "/sidol (3).jpeg", category: "krishna" },
  { id: "si4", name: "Silver Shiva Idol", price: 8200, image: "/sidol (4).jpeg", category: "shiva" },
  { id: "si5", name: "Silver Durga Idol", price: 6800, image: "/sidol (5).jpeg", category: "durga" },
  { id: "si6", name: "Premium Silver Idol Set", price: 10000, image: "/sidol (6).jpeg", category: "premium" }
];

const SilverIdols = () => {
   
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("silver-idols", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Silver Idols Collection
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
          <option value="ganesh">Ganesh</option>
          <option value="lakshmi">Lakshmi</option>
          <option value="krishna">Krishna</option>
          <option value="shiva">Shiva</option>
          <option value="durga">Durga</option>
          <option value="premium">Premium</option>
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


export default SilverIdols;