import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
  };

  const doLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="topbar">Free shipping over ₹999 &nbsp;·&nbsp; Use code <b>FORGE10</b> for 10% off</div>
      <header className="header">
        <div className="container header-inner">
          <button className="icon-btn hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            <MenuIcon />
          </button>
          <Link to="/" className="logo">FORGE<span>.</span></Link>
          <nav className="nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <form className="header-search" onSubmit={submitSearch}>
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search whey, creatine, belts..."
              aria-label="Search products"
            />
          </form>
          <div className="header-actions">
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>
            {user ? (
              <div className="user-menu-wrap" ref={menuRef}>
                <button className="user-chip" onClick={() => setMenuOpen((o) => !o)}>
                  <span className="avatar">{user.name.charAt(0).toUpperCase()}</span>
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                {menuOpen && (
                  <div className="user-dropdown">
                    <div className="dd-head">
                      <b>{user.name}</b>
                      <small>{user.email}</small>
                    </div>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
                    <button onClick={doLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-dark btn-sm" style={{ marginLeft: 6 }}>Login</Link>
            )}
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <form onSubmit={submitSearch}>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products..." />
              <button className="btn btn-dark btn-sm" type="submit">Go</button>
            </form>
            <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>Login / Sign up</Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}
