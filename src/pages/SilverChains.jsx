import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
const localProducts = [
  { id: "sc1", name: "Classic Silver Chain", price: 2500, image: "/schain (1).jpeg", category: "classic" },
  { id: "sc2", name: "Sterling Silver Chain", price: 3200, image: "/schain (2).jpeg", category: "sterling" },
  { id: "sc3", name: "Designer Silver Chain", price: 4500, image: "/schain (3).jpeg", category: "designer" },
  { id: "sc4", name: "Thick Silver Chain", price: 5200, image: "/schain (4).jpeg", category: "thick" },
  { id: "sc5", name: "Lightweight Silver Chain", price: 1800, image: "/schain (5).jpeg", category: "lightweight" },
  { id: "sc6", name: "Premium Silver Chain", price: 6000, image: "/schain (6).jpeg", category: "premium" }
];

const SilverChain = () => {

const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("silver-chains", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Silver Chains Collection
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
          <option value="classic">Classic</option>
          <option value="sterling">Sterling</option>
          <option value="designer">Designer</option>
          <option value="thick">Thick</option>
          <option value="lightweight">Lightweight</option>
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

export default SilverChain;