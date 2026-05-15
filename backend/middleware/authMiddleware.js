const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Must be logged in
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch {
      return res.status(401).json({ msg: "Token invalid or expired" });
    }
  }
  return res.status(401).json({ msg: "No token, authorization denied" });
};

// Optional — attaches user if token present, continues either way (for guest orders)
const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
    } catch {
      req.user = null;
    }
  }
  next();
};

// Role-based access control
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: `Access denied. Required role: ${roles.join(" or ")}` });
    }
    next();
  };
};

module.exports = { protect, optionalAuth, requireRole };
