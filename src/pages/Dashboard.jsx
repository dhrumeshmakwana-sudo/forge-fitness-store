import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { imgFallback } from '../components/ProductCard';

export default function Dashboard() {
  const { user, updateProfile, logout } = useAuth();
  const { orders, wishlist, productById, cartValue, moveToCart, toast } = useStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user.name, phone: user.phone || '', address: user.address || '',
  });

  const myOrders = orders.filter((o) => o.email === user.email);
  const wishItems = wishlist.map(productById).filter(Boolean);
  const points = myOrders.reduce((s, o) => s + Math.floor(o.total / 100), 0);

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile(profile);
    toast('Profile saved');
  };

  const doLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container">
      <div className="dash-head">
        <span className="eyebrow">My Account</span>
        <h1>Namaste, {user.name.split(' ')[0]}</h1>
        <p>Here's what's happening with your training stack.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card"><b>{myOrders.length}</b><span>Total Orders</span></div>
        <div className="stat-card"><b>{wishlist.length}</b><span>Wishlist Items</span></div>
        <div className="stat-card"><b>{formatINR(cartValue)}</b><span>Cart Value</span></div>
        <div className="stat-card"><b>{points}</b><span>Forge Points</span></div>
      </div>

      <div className="dash-cols">
        <div style={{ display: 'grid', gap: 24 }}>
          <div className="panel">
            <h3>Recent Orders <Link to="/orders">View all</Link></h3>
            {myOrders.length === 0 ? (
              <p style={{ color: 'var(--muted)' }}>
                No orders yet. Your first stack is waiting — <Link to="/shop" style={{ textDecoration: 'underline', fontWeight: 600 }}>shop bestsellers</Link>.
              </p>
            ) : (
              myOrders.slice(0, 4).map((o) => (
                <div className="order-row" key={o.id}>
                  <div>
                    <span className="oid">{o.id}</span>
                    <small>{o.date} · {o.items.reduce((s, i) => s + i.qty, 0)} items · {o.payment}</small>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <b>{formatINR(o.total)}</b>
                    <small><span className="status-pill">{o.status}</span></small>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="panel">
            <h3>Profile & Settings</h3>
            <form className="form" onSubmit={saveProfile}>
              <div className="form-2col">
                <div className="field">
                  <label htmlFor="p-name">Full name</label>
                  <input id="p-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="p-phone">Phone</label>
                  <input id="p-phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 ..." />
                </div>
              </div>
              <div className="field">
                <label htmlFor="p-email">Email</label>
                <input id="p-email" value={user.email} disabled style={{ opacity: 0.6 }} />
              </div>
              <div className="field">
                <label htmlFor="p-address">Default delivery address</label>
                <textarea id="p-address" rows="2" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} placeholder="Flat, street, city, state, PIN" />
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-dark btn-sm" type="submit">Save Changes</button>
                <button className="btn btn-ghost btn-sm" type="button" onClick={doLogout}>Logout</button>
              </div>
            </form>
          </div>
        </div>

        <div className="panel">
          <h3>Wishlist Preview <Link to="/wishlist">Open</Link></h3>
          {wishItems.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Nothing saved yet. Tap the heart on products you like.</p>
          ) : (
            wishItems.slice(0, 5).map((p) => (
              <div className="mini-item" key={p.id}>
                <img src={p.image} alt={p.name} onError={imgFallback(p.id)} />
                <span className="m-name">{p.name}</span>
                <button className="btn btn-dark btn-sm" disabled={!p.inStock} onClick={() => moveToCart(p.id)}>Add</button>
              </div>
            ))
          )}
          <h3 style={{ marginTop: 28 }}>Quick Links</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            <Link to="/shop" className="btn btn-ghost btn-sm">Continue Shopping</Link>
            <Link to="/cart" className="btn btn-ghost btn-sm">Go to Cart</Link>
            <Link to="/orders" className="btn btn-ghost btn-sm">Track My Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
