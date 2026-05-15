# 💍 Abirami Jewellers — E-Commerce Web App

A modern, feature-rich jewellery e-commerce platform built with **React + Vite + Tailwind CSS**, offering a seamless shopping experience across Gold, Diamond, Silver, and Victorian jewellery collections.

---

## 🛍️ Features

### 🏠 Home & Discovery
- Hero banner with rich jewellery imagery
- Victorian Jewellery showcase section
- New Arrivals grid with product highlights
- Embedded video showcase card
- Category bar for quick navigation across all jewellery types

### 📦 Product Catalog
Dedicated pages for 12 jewellery categories:
- **Gold** — Rings, Necklaces, Earrings
- **Diamond** — Rings, Necklaces, Earrings
- **Silver** — Bracelets, Chains, Idols
- **Victorian** — Earrings, Lockets, Necklaces

### 🛒 Cart & Orders
- Add to Cart with animated popup confirmation
- Quantity increase / decrease / remove in cart
- Cart persisted in `localStorage`
- Place Order via backend API (port 5000)
- Orders page for tracking purchase history
- Cart item count badge on navbar icon

### ❤️ Wishlist
- Add items to wishlist
- Dedicated wishlist page

### 🔐 Authentication
- User registration and login
- JWT token-based authentication stored in `localStorage`
- Role-based access: **Customer** and **Donor**
- Protected routes (redirects to `/login` if unauthenticated)

### 💎 Donor Portal
- Donors can add new jewellery items with name, price, category, stock, and image upload
- Manage and view existing products
- Tab-based UI: Add Item / Manage Items
- Role badge displayed in navbar profile menu

### 🛠️ Admin Panel
- Admin Orders view
- Admin Products view

### 🎨 UI / UX
- Dark navbar with logo, search, wishlist, and cart icons
- User profile dropdown with role badge (Customer / Donor)
- Sign Out functionality
- Responsive layout with Tailwind CSS
- Smooth transitions and hover effects

---

## 🗂️ Project Structure

```
abirami_project/
├── public/                  # Static assets (jewellery images, favicon, QR)
├── src/
│   ├── assets/              # Logo and SVGs
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   ├── CategoryBar.jsx  # Horizontal category navigation
│   │   ├── Hero.jsx         # Homepage hero section
│   │   ├── Showcase.jsx     # Victorian jewellery showcase
│   │   ├── NewArrivals.jsx  # New arrivals grid
│   │   ├── VideoCard.jsx    # Video showcase section
│   │   ├── Footer.jsx       # Site footer
│   │   └── ProductCard.jsx  # Reusable product card component
│   ├── context/
│   │   ├── CartContext.jsx      # Global cart state + localStorage sync
│   │   ├── AuthContext.jsx      # Auth state with JWT + role management
│   │   └── WishlistContext.jsx  # Wishlist state management
│   ├── hooks/
│   │   └── useProducts.js   # Custom hook for fetching products
│   ├── pages/
│   │   ├── Login.jsx / Register.jsx
│   │   ├── Cart.jsx / Wishlist.jsx / Orders.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── DonorAddItem.jsx
│   │   ├── AdminOrders.jsx / AdminProducts.jsx
│   │   ├── GoldRings.jsx, GoldNecklace.jsx, GoldEarrings.jsx
│   │   ├── DiamondRings.jsx, DiamondNecklace.jsx, DiamondEarrings.jsx
│   │   ├── SilverBracelets.jsx, SilverChains.jsx, SilverIdols.jsx
│   │   └── VictorianEarrings.jsx, VictorianLockets.jsx, VictorianNecklaces.jsx
│   ├── products.js          # Static product seed data
│   ├── App.jsx              # Root component with routes
│   ├── main.jsx             # React entry point
│   ├── App.css              # Global styles
│   └── index.css            # Tailwind base import
└── vite.config.js           # Vite + Tailwind config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/abirami-jewellers.git
cd abirami-jewellers/abirami_project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend
The frontend expects a REST API at `http://localhost:5000` with the following endpoints:

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/login`     | User login               |
| POST   | `/api/auth/register`  | User registration        |
| GET    | `/api/products`       | Fetch all products       |
| POST   | `/api/products`       | Add a new product (Donor)|
| POST   | `/api/orders`         | Place an order           |
| GET    | `/api/orders`         | Fetch orders             |

---

## 🔧 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, Vite                    |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing    | React Router DOM v6               |
| State      | React Context API                 |
| Icons      | React Icons (Font Awesome)        |
| Storage    | localStorage (cart, auth tokens)  |
| Backend    | Node.js / Express (separate repo) |

---

## 🔮 Upcoming Features

### 🔍 Search & Filtering
- [ ] Live search bar with results dropdown in the Navbar
- [ ] Filter products by price range, material, and weight
- [ ] Sort products by price (low–high / high–low) and newest

### 💳 Payments
- [ ] Razorpay / Stripe payment gateway integration
- [ ] UPI and COD (Cash on Delivery) options
- [ ] Order confirmation emails via Nodemailer

### 🏠 User Profile
- [ ] Dedicated profile page with editable name, phone, and address
- [ ] Saved addresses for faster checkout
- [ ] Profile picture upload

### 📦 Order Management
- [ ] Real-time order status tracking (Placed → Shipped → Delivered)
- [ ] Order cancellation within a time window
- [ ] Invoice PDF download per order

### ⭐ Reviews & Ratings
- [ ] Product rating (1–5 stars) by verified buyers
- [ ] Customer review submission and display
- [ ] Average rating shown on product cards

### 💎 Wishlist Improvements
- [ ] Wishlist persisted in `localStorage` / backend
- [ ] Move wishlist items directly to cart
- [ ] Share wishlist via link

### 🔔 Notifications
- [ ] In-app notification bell (new arrivals, order updates)
- [ ] WhatsApp / SMS order confirmation integration

### 👑 Admin Dashboard
- [ ] Analytics dashboard: total sales, top products, revenue charts
- [ ] Role management (promote user to donor / admin)
- [ ] Bulk product upload via CSV

### 🌐 Internationalisation & Accessibility
- [ ] Multi-language support (Tamil, Hindi, English)
- [ ] Currency switcher (INR / USD / AED)
- [ ] WCAG-compliant accessibility improvements

### 📱 Mobile App
- [ ] React Native mobile app (iOS & Android)
- [ ] Push notifications for offers and order updates

### 🤖 AI Features
- [ ] Jewellery recommendation engine based on browsing history
- [ ] AI-powered virtual try-on using device camera
- [ ] Chatbot for customer support

---


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is proprietary and owned by **Abirami Jewellers**. All rights reserved.

---

## 📬 Contact

For queries, reach out via the Instagram QR available in the app footer, or email the store directly.
