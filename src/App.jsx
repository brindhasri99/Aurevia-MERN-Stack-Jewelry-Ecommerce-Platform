import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import Showcase from './components/Showcase';
import NewArrivals from "./components/NewArrivals";
import VideoCard from "./components/VideoCard";
import Footer from "./components/Footer";

import GoldRings from "./pages/GoldRings";
import GoldNecklace from "./pages/GoldNecklace";
import GoldEarrings from "./pages/GoldEarrings";
import DiamondNecklace from "./pages/DiamondNecklace";
import DiamondEarrings from "./pages/DiamondEarrings";
import DiamondRings from "./pages/DiamondRings";
import SilverBracelets from "./pages/SilverBracelets";
import SilverChains from "./pages/SilverChains";
import SilverIdols from "./pages/SilverIdols";
import VictorianEarrings from "./pages/VictorianEarrings";
import VictorianLockets from "./pages/VictorianLockets";
import VictorianNecklaces from "./pages/VictorianNecklaces";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorAddItem from "./pages/DonorAddItem";

function Home() {
  return (
    <>
      <Hero />
      <div className="bg-white text-center py-6">
        <h2 className="text-4xl tracking-widest">Victorian Jewellery</h2>
        <p className="text-gray-600 mt-2">Unveil the beauty of exquisite jewellery.</p>
      </div>
      <Showcase />
      <div className="bg-white text-center py-6">
        <h2 className="text-4xl tracking-widest">Abirami World</h2>
        <p className="text-gray-600 mt-2">Trust us for your precious moments.</p>
      </div>
      <NewArrivals />
      <VideoCard />
    </>
  );
}

// Protected route wrapper
function ProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const { showPopup, popupItem } = useContext(CartContext);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="bg-gray-100 min-h-screen">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <CategoryBar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/gold-rings" element={<GoldRings />} />
        <Route path="/gold-necklaces" element={<GoldNecklace />} />
        <Route path="/gold-earrings" element={<GoldEarrings />} />
        <Route path="/diamond-necklaces" element={<DiamondNecklace />} />
        <Route path="/diamond-earrings" element={<DiamondEarrings />} />
        <Route path="/diamond-rings" element={<DiamondRings />} />
        <Route path="/silver-bracelets" element={<SilverBracelets />} />
        <Route path="/silver-chains" element={<SilverChains />} />
        <Route path="/silver-idols" element={<SilverIdols />} />
        <Route path="/victorian-earrings" element={<VictorianEarrings />} />
        <Route path="/victorian-lockets" element={<VictorianLockets />} />
        <Route path="/victorian-necklaces" element={<VictorianNecklaces />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />

        {/* Donor-only route */}
        <Route
          path="/donor/add-item"
          element={
            <ProtectedRoute allowedRole="donor">
              <DonorAddItem />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Global Add to Cart Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-12 py-10 rounded-3xl shadow-2xl text-center animate-popup">
            <h2 className="text-3xl font-semibold text-gray-800">🛒 Item Added to Cart</h2>
            <p className="text-gray-500 mt-3 text-lg">{popupItem?.name}</p>
          </div>
        </div>
      )}

      {/* Footer only on Home */}
      <div className="mt-16"></div>
      {location.pathname === "/" && <Footer />}
    </div>
  );
}

export default App;
