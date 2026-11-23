import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PRODUCTS, formatINR, discountPct } from '../data/products';
import { useStore } from '../context/StoreContext';
import ProductCard, { Stars, imgFallback } from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQtyLocal] = useState(1);

  if (!product) return <Navigate to="/404" replace />;

  const wished = wishlist.includes(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const off = discountPct(product);

  return (
    <div className="container">
      <div className="pd-grid">
        <div className="pd-media">
          <img src={product.image} alt={product.name} onError={imgFallback(product.id)} />
        </div>
        <div className="pd-info">
          <p className="pd-brand">{product.brand} · {product.category}</p>
          <h1>{product.name}</h1>
          <div style={{ marginTop: 10 }}>
            <Stars rating={product.rating} reviews={product.reviews} />
          </div>
          <div className="pd-price">
            <b>{formatINR(product.price)}</b>
            {product.mrp > product.price && <s>{formatINR(product.mrp)}</s>}
            {off > 0 && <span className="save">Save {off}%</span>}
          </div>
          <p className="tax-note">Inclusive of all taxes. Free shipping over ₹999.</p>
          <p className="pd-desc">{product.description}</p>

          <div className="qty-row">
            <div className="qty">
              <button onClick={() => setQtyLocal((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQtyLocal((q) => Math.min(10, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button
              className="btn btn-dark"
              style={{ flex: 1 }}
              disabled={!product.inStock}
              onClick={() => addToCart(product.id, qty)}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className={`btn ${wished ? 'btn-volt' : 'btn-ghost'}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          <div className="pd-meta">
            <span>Availability: {product.inStock ? <span className="stock-ok">In Stock — ships in 24 hrs</span> : <span className="stock-out">Out of Stock</span>}</span>
            <span><b>SKU:</b> FRG-{product.id.toUpperCase()}</span>
            <span><b>Delivery:</b> 2–5 working days across India · COD available</span>
            <span><b>Returns:</b> 14-day easy returns on unopened products</span>
            <span><b>Authenticity:</b> Sourced directly from {product.brand}, batch-verified</span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section style={{ paddingBottom: 72 }}>
          <div className="section-head">
            <div>
              <span className="eyebrow">Keep Going</span>
              <h2>You May Also Like</h2>
            </div>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="btn btn-ghost btn-sm">
              More {product.category}
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
