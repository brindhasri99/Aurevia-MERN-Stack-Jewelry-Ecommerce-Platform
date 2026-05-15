import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// All products for search
const ALL_PRODUCTS = [
  { name: "Gold Necklace",         path: "/gold-necklaces" },
  { name: "Gold Earrings",         path: "/gold-earrings" },
  { name: "Gold Rings",            path: "/gold-rings" },
  { name: "Diamond Necklace",      path: "/diamond-necklaces" },
  { name: "Diamond Earrings",      path: "/diamond-earrings" },
  { name: "Diamond Rings",         path: "/diamond-rings" },
  { name: "Silver Chains",         path: "/silver-chains" },
  { name: "Silver Bracelets",      path: "/silver-bracelets" },
  { name: "Silver Idols",          path: "/silver-idols" },
  { name: "Victorian Earrings",    path: "/victorian-earrings" },
  { name: "Victorian Lockets",     path: "/victorian-lockets" },
  { name: "Victorian Necklaces",   path: "/victorian-necklaces" },
  { name: "Gold Jhumka",           path: "/gold-earrings" },
  { name: "Stud Earrings",         path: "/gold-earrings" },
  { name: "Temple Earrings",       path: "/gold-earrings" },
  { name: "Chandbali Earrings",    path: "/gold-earrings" },
  { name: "Diamond Solitaire Ring",path: "/diamond-rings" },
  { name: "Silver Bracelet",       path: "/silver-bracelets" },
  { name: "Ganesha Idol",          path: "/silver-idols" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, logout } = useAuth();

  const [showMenu, setShowMenu]       = useState(false);
  const [showSearch, setShowSearch]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const menuRef   = useRef(null);
  const searchRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setSearchQuery("");
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Filter suggestions as user types
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length > 0) {
      const filtered = ALL_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (path) => {
    setShowSearch(false);
    setSearchQuery("");
    setSuggestions([]);
    navigate(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].path);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-6 bg-[#0f0f0f] text-white border-b border-[#2a2a2a] relative z-50">

      {/* Logo */}
      <img
        src={logo}
        alt="Abirami Jewellers"
        className="h-20 object-contain scale-125 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Right Icons */}
      <div className="flex items-center space-x-6">

        {/* Search */}
        <div className="relative" ref={searchRef}>
          {!showSearch ? (
            <FaSearch
              className="text-xl cursor-pointer hover:text-yellow-400 transition"
              onClick={() => setShowSearch(true)}
            />
          ) : (
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search jewellery..."
                className="bg-[#1a1a1a] border border-[#3a3a3a] text-white text-sm rounded-xl px-4 py-2 w-56 focus:outline-none focus:border-yellow-400 transition"
              />
              <FaTimes
                className="text-gray-400 cursor-pointer hover:text-white transition"
                onClick={() => { setShowSearch(false); setSearchQuery(""); setSuggestions([]); }}
              />
            </form>
          )}

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-10 left-0 w-64 bg-white text-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
              {suggestions.slice(0, 6).map((s, i) => (
                <div
                  key={i}
                  onClick={() => handleSuggestionClick(s.path)}
                  className="px-4 py-3 text-sm hover:bg-yellow-50 hover:text-yellow-700 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0 transition"
                >
                   {s.name}
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {searchQuery.trim().length > 0 && suggestions.length === 0 && (
            <div className="absolute top-10 left-0 w-64 bg-white text-gray-500 rounded-2xl shadow-2xl z-50 px-4 py-3 text-sm">
              No results for "{searchQuery}"
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <FaUser
            className="text-xl cursor-pointer hover:text-yellow-400 transition"
            onClick={() => { if (!user) navigate("/login"); else setShowMenu(!showMenu); }}
          />
          {showMenu && user && (
            <div className="absolute right-0 top-8 bg-white text-gray-800 rounded-2xl shadow-2xl w-52 py-3 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm font-semibold truncate">{user.email}</p>
                <span className={"text-xs px-2 py-0.5 rounded-full mt-1 inline-block " +
                  (user.role === "donor" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700")}>
                  {user.role === "donor" ? "💎 Donor" : "🛍️ Customer"}
                </span>
              </div>
              {user.role === "donor" && (
                <button onClick={() => { navigate("/donor/add-item"); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition">
                  ➕ Add Items
                </button>
              )}
              <button onClick={() => { navigate("/orders"); setShowMenu(false); }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition">
                📦 My Orders
              </button>
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition flex items-center gap-2">
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Wishlist */}
        <FaHeart
          onClick={() => navigate("/wishlist")}
          className="text-xl cursor-pointer hover:text-red-500 transition"
        />

        {/* Cart */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <FaShoppingCart className="text-xl hover:text-yellow-400 transition" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
              {cart.length}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
