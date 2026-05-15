import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const localProducts = [
  { id: "vl1", name: "Antique Victorian Locket", price: 22000, image: "/vlock (1).jpeg", category: "antique" },
  { id: "vl2", name: "Royal Victorian Locket", price: 28000, image: "/vlock (2).jpeg", category: "royal" },
  { id: "vl3", name: "Classic Victorian Locket", price: 20000, image: "/vlock (3).jpeg", category: "classic" },
  { id: "vl4", name: "Designer Victorian Locket", price: 26000, image: "/vlock (4).jpeg", category: "designer" },
  { id: "vl5", name: "Vintage Victorian Locket", price: 24000, image: "/vlock (5).jpeg", category: "vintage" },
  { id: "vl6", name: "Premium Victorian Locket", price: 32000, image: "/vlock (6).jpeg", category: "premium" }
];

const VictorianLockets = () => {
    
 const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("victorian-lockets", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Victorian Lockets Collection
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
          <option value="antique">Antique</option>
          <option value="royal">Royal</option>
          <option value="classic">Classic</option>
          <option value="designer">Designer</option>
          <option value="vintage">Vintage</option>
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

export default VictorianLockets;
