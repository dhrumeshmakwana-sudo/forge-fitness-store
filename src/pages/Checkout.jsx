import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../data/products';
import { imgFallback } from '../components/ProductCard';
import { FREE_SHIP, SHIP_COST } from './Cart';

const PAYMENTS = [
  { id: 'UPI', label: 'UPI', note: 'GPay, PhonePe, Paytm & more' },
  { id: 'Card', label: 'Credit / Debit Card', note: 'Visa, Mastercard, RuPay' },
  { id: 'COD', label: 'Cash on Delivery', note: 'Pay when your order arrives' },
];

export default function Checkout() {
  const { user } = useAuth();
  const { cartDetailed, placeOrder } = useStore();
  const location = useLocation();
  const promo = location.state?.promo || null;

  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    city: '', pin: '',
  });
  const [payment, setPayment] = useState('UPI');
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);

  const itemTotal = cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0);
  const promoDiscount = promo ? Math.round(itemTotal * promo.rate) : 0;
  const afterPromo = itemTotal - promoDiscount;
  const shipping = afterPromo >= FREE_SHIP || afterPromo === 0 ? 0 : SHIP_COST;
  const total = afterPromo + shipping;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Enter the full name.';
    if (!/^[+\d][\d\s-]{9,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (form.address.trim().length < 10) errs.address = 'Enter your complete address.';
    if (form.city.trim().length < 2) errs.city = 'Enter your city.';
    if (!/^\d{6}$/.test(form.pin.trim())) errs.pin = 'Enter a 6-digit PIN code.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const order = {
      id: 'FRG' + Date.now().toString().slice(-8),
      email: user.email,
      items: cartDetailed.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.qty })),
      total,
      payment,
      address: `${form.address}, ${form.city} — ${form.pin}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
    };
    placeOrder(order);
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <div className="container">
        <div className="success-wrap">
          <div className="success-ring">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h1>Order Confirmed</h1>
          <p>Thanks, {user.name.split(' ')[0]}. Your stack is being packed at our Mumbai warehouse and will reach you in 2–5 working days.</p>
          <div className="oid-big">Order ID: {placed.id}</div>
          <p>Payment: <b>{placed.payment}</b> · Total paid/payable: <b>{formatINR(placed.total)}</b></p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
            <Link to="/orders" className="btn btn-dark">Track My Order</Link>
            <Link to="/shop" className="btn btn-ghost">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="container" style={{ padding: '56px 20px 90px' }}>
        <div className="empty-state">
          <h3>Nothing to check out</h3>
          <p>Your cart is empty — add something first.</p>
          <Link to="/shop" className="btn btn-dark">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">Secure Checkout</span>
        <h1>Checkout</h1>
      </div>
      <form onSubmit={submit}>
        <div className="cart-layout">
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="panel">
              <h3>Delivery Address</h3>
              <div className="form">
                <div className="form-2col">
                  <div className="field">
                    <label htmlFor="c-name">Full name</label>
                    <input id="c-name" value={form.name} onChange={set('name')} />
                    {errors.name && <p className="err">{errors.name}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">Phone</label>
                    <input id="c-phone" value={form.phone} onChange={set('phone')} placeholder="+91 ..." />
                    {errors.phone && <p className="err">{errors.phone}</p>}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="c-address">Address</label>
                  <textarea id="c-address" rows="2" value={form.address} onChange={set('address')} placeholder="Flat no, building, street, landmark" />
                  {errors.address && <p className="err">{errors.address}</p>}
                </div>
                <div className="form-2col">
                  <div className="field">
                    <label htmlFor="c-city">City</label>
                    <input id="c-city" value={form.city} onChange={set('city')} />
                    {errors.city && <p className="err">{errors.city}</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-pin">PIN code</label>
                    <input id="c-pin" value={form.pin} onChange={set('pin')} placeholder="400050" />
                    {errors.pin && <p className="err">{errors.pin}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="panel">
              <h3>Payment Method</h3>
              <div className="pay-options">
                {PAYMENTS.map((p) => (
                  <label key={p.id} className={`pay-opt ${payment === p.id ? 'active' : ''}`}>
                    <input type="radio" name="pay" checked={payment === p.id} onChange={() => setPayment(p.id)} />
                    <span>{p.label}<small>{p.note}</small></span>
                  </label>
                ))}
              </div>
              <p className="tax-note" style={{ marginTop: 12 }}>
                Demo checkout — no real payment is collected or processed.
              </p>
            </div>
          </div>

          <aside className="summary-card">
            <h3>Your Order</h3>
            {cartDetailed.map(({ product: p, qty }) => (
              <div className="mini-item" key={p.id}>
                <img src={p.image} alt={p.name} onError={imgFallback(p.id)} />
                <span className="m-name">{p.name} × {qty}</span>
                <b>{formatINR(p.price * qty)}</b>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <div className="sum-row"><span>Subtotal</span><span>{formatINR(itemTotal)}</span></div>
              {promo && <div className="sum-row"><span>Promo ({promo.code})</span><span className="free">− {formatINR(promoDiscount)}</span></div>}
              <div className="sum-row"><span>Shipping</span><span>{shipping === 0 ? <span className="free">FREE</span> : formatINR(shipping)}</span></div>
              <div className="sum-row total"><span>Total</span><span>{formatINR(total)}</span></div>
            </div>
            <button className="btn btn-volt btn-block" type="submit" style={{ marginTop: 14 }}>
              Place Order · {formatINR(total)}
            </button>
          </aside>
        </div>
      </form>
    </div>
  );
}
