import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
const localProducts = [
  { id: "vn1", name: "Royal Victorian Necklace", price: 85000, image: "/vneck (1).jpeg", category: "royal" },
  { id: "vn2", name: "Antique Victorian Necklace", price: 78000, image: "/vneck (2).jpeg", category: "antique" },
  { id: "vn3", name: "Designer Victorian Necklace", price: 92000, image: "/vneck (3).jpeg", category: "designer" },
  { id: "vn4", name: "Classic Victorian Necklace", price: 70000, image: "/vneck (4).jpeg", category: "classic" },
  { id: "vn5", name: "Vintage Victorian Necklace", price: 88000, image: "/vneck (5).jpeg", category: "vintage" },
  { id: "vn6", name: "Premium Victorian Necklace", price: 100000, image: "/vneck (6).jpeg", category: "premium" }
];

const VictorianNecklaces = () => {
    
 const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");

  // 🔥 FILTER LOGIC
  const products = useProducts("victorian-necklaces", localProducts);
  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">

      <h1 className="text-3xl font-semibold mb-6">
        Victorian Necklaces Collection
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

                
export default VictorianNecklaces;