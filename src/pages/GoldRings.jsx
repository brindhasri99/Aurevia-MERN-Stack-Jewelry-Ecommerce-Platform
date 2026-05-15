import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const localProducts = [
  { id: "gr1", name: "Diamond Gold Ring", price: 25000, image: "/gring (1).jpeg", category: "diamond" },
  { id: "gr2", name: "Classic Gold Ring", price: 18000, image: "/gring (2).jpeg", category: "classic" },
  { id: "gr3", name: "Temple Ring", price: 22000, image: "/gring (3).jpeg", category: "temple" },
  { id: "gr4", name: "Modern Ring", price: 27000, image: "/gring (4).jpeg", category: "modern" },
  { id: "gr5", name: "Wedding Ring", price: 30000, image: "/gring (5).jpeg", category: "wedding" },
  { id: "gr6", name: "Antique Ring", price: 35000, image: "/gring (6).jpeg", category: "antique" }
];

const GoldRings = () => {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("all");
  const products = useProducts("gold-rings", localProducts);

  const filtered = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchPrice = item.price <= maxPrice;
    const matchCategory = category === "all" || item.category === category;
    return matchSearch && matchPrice && matchCategory;
  });

  return (
    <div className="p-10 bg-[#f8f5f2] min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Gold Rings Collection</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 border rounded" />
        <div>
          <p className="text-sm">Max Price: ₹ {maxPrice}</p>
          <input type="range" min="0" max="150000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="diamond">Diamond</option>
          <option value="classic">Classic</option>
          <option value="temple">Temple</option>
          <option value="modern">Modern</option>
          <option value="wedding">Wedding</option>
          <option value="antique">Antique</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item) => <ProductCard key={item._id || item.id} item={item} />)}
      </div>
    </div>
  );
};

export default GoldRings;
