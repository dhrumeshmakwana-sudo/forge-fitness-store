import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PROMO_CODES, formatINR } from '../data/products';
import { imgFallback } from '../components/ProductCard';

export const FREE_SHIP = 999;
export const SHIP_COST = 79;

export default function Cart() {
  const { cartDetailed, setQty, removeFromCart } = useStore();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null); // {code, rate}
  const [promoMsg, setPromoMsg] = useState(null);

  const subtotal = cartDetailed.reduce((s, i) => s + i.product.mrp * i.qty, 0);
  const itemTotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0);
  const promoDiscount = promo ? Math.round(itemTotal * promo.rate) : 0;
  const afterPromo = itemTotal - promoDiscount;
  const shipping = afterPromo >= FREE_SHIP || afterPromo === 0 ? 0 : SHIP_COST;
  const total = afterPromo + shipping;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromo({ code, rate: PROMO_CODES[code] });
      setPromoMsg({ ok: true, text: `${code} applied — ${PROMO_CODES[code] * 100}% off.` });
    } else {
      setPromo(null);
      setPromoMsg({ ok: false, text: 'That code is not valid. Try FORGE10.' });
    }
  };

  if (cartDetailed.length === 0) {
    return (
      <div className="container" style={{ padding: '56px 20px 90px' }}>
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>No gains yet. Add some protein, gear — or both.</p>
          <Link to="/shop" className="btn btn-dark">Browse Products</Link>
        </div>
      </div>
    );
  }

  const shipPct = Math.min(100, (afterPromo / FREE_SHIP) * 100);

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">Almost There</span>
        <h1>Your Cart</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cartDetailed.map(({ product: p, qty }) => (
            <div className="cart-row" key={p.id}>
              <Link to={`/product/${p.id}`}>
                <img src={p.image} alt={p.name} onError={imgFallback(p.id)} />
              </Link>
              <div>
                <span className="c-brand">{p.brand}</span>
                <Link to={`/product/${p.id}`} className="c-name">{p.name}</Link>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="qty">
                    <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease">−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <button className="link-btn" onClick={() => removeFromCart(p.id)}>Remove</button>
                </div>
              </div>
              <div className="c-right">
                <b style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>{formatINR(p.price * qty)}</b>
                {p.mrp > p.price && <s style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{formatINR(p.mrp * qty)}</s>}
              </div>
            </div>
          ))}
          <Link to="/shop" className="btn btn-ghost btn-sm" style={{ justifySelf: 'start' }}>Continue Shopping</Link>
        </div>

        <aside className="summary-card">
          <h3>Order Summary</h3>
          <div className="ship-progress"><div style={{ width: `${shipPct}%` }} /></div>
          <p className="ship-note">
            {shipping === 0
              ? 'You have unlocked FREE shipping.'
              : `Add ${formatINR(FREE_SHIP - afterPromo)} more for FREE shipping.`}
          </p>
          <div className="sum-row"><span>MRP Total</span><span>{formatINR(subtotal)}</span></div>
          <div className="sum-row"><span>Product Discount</span><span className="free">− {formatINR(subtotal - itemTotal)}</span></div>
          {promo && <div className="sum-row"><span>Promo ({promo.code})</span><span className="free">− {formatINR(promoDiscount)}</span></div>}
          <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? <span className="free">FREE</span> : formatINR(shipping)}</span></div>
          <div className="promo-row">
            <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Promo code" />
            <button className="btn btn-ghost btn-sm" onClick={applyPromo}>Apply</button>
          </div>
          {promoMsg && <p className={`promo-msg ${promoMsg.ok ? 'ok' : 'err'}`}>{promoMsg.text}</p>}
          <div className="sum-row total"><span>Total</span><span>{formatINR(total)}</span></div>
          <button
            className="btn btn-volt btn-block"
            style={{ marginTop: 14 }}
            onClick={() => navigate('/checkout', { state: { promo } })}
          >
            Proceed to Checkout
          </button>
          <p className="tax-note" style={{ marginTop: 12, textAlign: 'center' }}>Secure checkout · UPI, Cards & COD accepted</p>
        </aside>
      </div>
    </div>
  );
}
