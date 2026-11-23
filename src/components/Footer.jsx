import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/products';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="f-logo">FORGE<span>.</span></div>
            <p>India's performance fitness store. Lab-tested supplements and pro-grade gear, shipped from Mumbai to 19,000+ pin codes.</p>
            <p style={{ color: '#c9c9c2', fontWeight: 600 }}>support@forge.fit<br />+91 98200 12345</p>
          </div>
          <div>
            <h4>Shop</h4>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to={`/shop?category=${encodeURIComponent(c.name)}`}>{c.name}</Link>
            ))}
            <Link to="/shop">All Products</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/shop">Bestsellers</Link>
            <Link to="/cart">Your Cart</Link>
          </div>
          <div>
            <h4>Your Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/orders">Track Orders</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FORGE Fitness. All rights reserved.</span>
          <span>Frontend demo project — no real orders or payments are processed.</span>
        </div>
      </div>
    </footer>
  );
}
