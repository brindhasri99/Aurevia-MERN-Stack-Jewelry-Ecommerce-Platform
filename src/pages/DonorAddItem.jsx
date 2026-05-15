import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = [
  { value: "gold-rings", label: "Gold Rings" },
  { value: "gold-necklaces", label: "Gold Necklaces" },
  { value: "gold-earrings", label: "Gold Earrings" },
  { value: "diamond-necklaces", label: "Diamond Necklaces" },
  { value: "diamond-earrings", label: "Diamond Earrings" },
  { value: "diamond-rings", label: "Diamond Rings" },
  { value: "silver-bracelets", label: "Silver Bracelets" },
  { value: "silver-chains", label: "Silver Chains" },
  { value: "silver-idols", label: "Silver Idols" },
  { value: "victorian-earrings", label: "Victorian Earrings" },
  { value: "victorian-lockets", label: "Victorian Lockets" },
  { value: "victorian-necklaces", label: "Victorian Necklaces" },
];

const DonorAddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "gold-rings",
    stock: "10",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("add"); // "add" | "manage"

  useEffect(() => {
    if (!user || user.role !== "donor") {
      navigate("/login");
    } else {
      loadMyProducts();
    }
  }, [user]);

  const loadMyProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setMyProducts(Array.isArray(data) ? data : []);
    } catch {
      setMyProducts([]);
    }
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setForm((f) => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrl = (e) => {
    setForm((f) => ({ ...f, image: e.target.value }));
    setImagePreview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.price || !form.image) {
      setError("Please fill all required fields and add an image.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || data.error || "Failed to add product");
        return;
      }
      setSuccess(`"${form.name}" added successfully to ${CATEGORIES.find(c => c.value === form.category)?.label}!`);
      setForm({ name: "", price: "", category: "gold-rings", stock: "10", image: "" });
      setImagePreview("");
      loadMyProducts();
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      loadMyProducts();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f2] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Donor Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">{user?.email} · Donor</p>
          </div>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">💎 Donor</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTab("add")}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
              tab === "add" ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            ➕ Add New Item
          </button>
          <button
            onClick={() => { setTab("manage"); loadMyProducts(); }}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
              tab === "manage" ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            📦 All Products ({myProducts.length})
          </button>
        </div>

        {/* ADD ITEM FORM */}
        {tab === "add" && (
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Add Item to Category</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. Rose Gold Temple Ring"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    placeholder="25000"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="10"
                    min="0"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Image - URL or Upload */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Product Image *</label>
                <div className="space-y-3">
                  {/* Upload */}
                  <label className="flex items-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-yellow-400 transition-colors">
                    <span className="text-2xl">📷</span>
                    <span className="text-sm text-gray-500">Upload from device</span>
                    <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                  </label>
                  {/* URL */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">or enter URL</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={form.image.startsWith("data:") ? "" : form.image}
                    onChange={handleImageUrl}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* Preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">{error}</div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">✅ {success}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-medium tracking-wider hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        )}

        {/* MANAGE PRODUCTS */}
        {tab === "manage" && (
          <div className="space-y-3">
            {myProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow text-gray-400">
                No products yet. Add your first item!
              </div>
            ) : (
              myProducts.map((p) => (
                <div key={p._id} className="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    <p className="text-yellow-600 text-sm">₹ {p.price?.toLocaleString()}</p>
                    <p className="text-gray-400 text-xs mt-0.5 capitalize">{p.category?.replace(/-/g, " ")} · Stock: {p.stock}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-500 text-sm px-3 py-1.5 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorAddItem;
