import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { imgFallback } from '../components/ProductCard';

export default function Orders() {
  const { user } = useAuth();
  const { orders, productById } = useStore();
  const myOrders = orders.filter((o) => o.email === user.email);

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">Track & Reorder</span>
        <h1>My Orders</h1>
        <p>{myOrders.length} order{myOrders.length !== 1 ? 's' : ''} placed with FORGE.</p>
      </div>

      <div style={{ padding: '24px 0 80px', maxWidth: 860 }}>
        {myOrders.length === 0 ? (
          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>When you place an order, it will show up here with tracking status.</p>
            <Link to="/shop" className="btn btn-dark">Start Shopping</Link>
          </div>
        ) : (
          myOrders.map((o) => (
            <div className="order-card" key={o.id}>
              <div className="order-card-head">
                <div>
                  <b style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem' }}>{o.id}</b>
                  <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
                    Placed on {o.date} · Payment: {o.payment}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="status-pill">{o.status}</span>
                  <div style={{ marginTop: 6, fontWeight: 700 }}>{formatINR(o.total)}</div>
                </div>
              </div>
              {o.items.map((i) => {
                const p = productById(i.id);
                return (
                  <div className="mini-item" key={i.id}>
                    {p && <img src={p.image} alt={i.name} onError={imgFallback(i.id)} />}
                    <span className="m-name">{i.name} × {i.qty}</span>
                    <b>{formatINR(i.price * i.qty)}</b>
                  </div>
                );
              })}
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: 10 }}>
                Deliver to: {o.address}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
