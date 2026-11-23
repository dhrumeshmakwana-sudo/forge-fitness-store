import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatINR, discountPct } from '../data/products';

export const imgFallback = (seed) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = `https://picsum.photos/seed/${seed}/900/800`;
};

// Five-star rating rendered with plain characters (no icon library).
export function Stars({ rating, reviews, showCount = true }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-label={`Rated ${rating} out of 5`}>
      {'★'.repeat(full)}
      <span style={{ color: '#cfcfc8' }}>{'★'.repeat(5 - full)}</span>
      {showCount && (
        <span className="rcount">
          {rating} ({Number(reviews).toLocaleString('en-IN')})
        </span>
      )}
    </span>
  );
}

const HeartIcon = ({ filled }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const off = discountPct(product);

  return (
    <article className="product-card">
      <div className="card-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" onError={imgFallback(product.id)} />
        </Link>
        {product.badge && (
          <span className={`card-badge ${product.badge === 'New' ? 'new' : ''}`}>{product.badge}</span>
        )}
        <button
          className={`card-wish ${wished ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          <HeartIcon filled={wished} />
        </button>
        {off > 0 && <span className="card-off">{off}% OFF</span>}
      </div>
      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <Link className="card-name" to={`/product/${product.id}`}>{product.name}</Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="card-price">
          <b>{formatINR(product.price)}</b>
          {product.mrp > product.price && <s>{formatINR(product.mrp)}</s>}
        </div>
        {!product.inStock && <span className="out-tag">Out of stock</span>}
        <div className="card-actions">
          <button
            className="btn btn-dark"
            disabled={!product.inStock}
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
          <Link className="btn btn-ghost" to={`/product/${product.id}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
