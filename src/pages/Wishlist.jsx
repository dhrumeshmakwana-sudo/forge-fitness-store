import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { Stars, imgFallback } from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, productById, moveToCart, toggleWishlist } = useStore();
  const items = wishlist.map(productById).filter(Boolean);

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">Saved for Later</span>
        <h1>Your Wishlist</h1>
        <p>{items.length} item{items.length !== 1 ? 's' : ''} you are keeping an eye on.</p>
      </div>

      <div style={{ paddingBottom: 80, paddingTop: 24 }}>
        {items.length === 0 ? (
          <div className="empty-state">
            <h3>Nothing saved yet</h3>
            <p>Tap the heart on any product to park it here.</p>
            <Link to="/shop" className="btn btn-dark">Discover Products</Link>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((p) => (
              <div className="cart-row" key={p.id}>
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} onError={imgFallback(p.id)} />
                </Link>
                <div>
                  <span className="c-brand">{p.brand}</span>
                  <Link to={`/product/${p.id}`} className="c-name">{p.name}</Link>
                  <div style={{ marginTop: 4 }}><Stars rating={p.rating} reviews={p.reviews} /></div>
                  {!p.inStock && <span className="out-tag">Out of stock</span>}
                </div>
                <div className="c-right">
                  <b style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{formatINR(p.price)}</b>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button className="btn btn-dark btn-sm" disabled={!p.inStock} onClick={() => moveToCart(p.id)}>
                      Move to Cart
                    </button>
                    <button className="link-btn" onClick={() => toggleWishlist(p.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
