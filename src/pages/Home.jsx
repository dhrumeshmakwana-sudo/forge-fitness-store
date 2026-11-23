import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard, { Stars, imgFallback } from '../components/ProductCard';

const TruckIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>);
const ShieldIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>);
const ReturnIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>);
const BadgeIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>);

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta', role: 'Powerlifter, Pune', rating: 5,
    text: 'The 10 mm lever belt is the best purchase of my lifting career — my squat went from 140 to 165 kg in four months. Delivery to Pune took two days.',
  },
  {
    name: 'Sana Khan', role: 'Marathoner, Bengaluru', rating: 5,
    text: 'Finally a store where the label matches the scoop. Their creatine is Creapure-grade quality at half the imported price, and it actually dissolves.',
  },
  {
    name: 'Rohit Sharma', role: 'Coach, Delhi', rating: 5,
    text: 'I send all my clients here. Batch-tested products, honest prices in rupees, and support that actually answers. FORGE is my default recommendation now.',
  },
];

export default function Home() {
  const bestsellers = PRODUCTS.filter((p) => p.badge === 'Bestseller');
  const newArrivals = PRODUCTS.filter((p) => p.badge === 'New');
  const featured = [...bestsellers, ...newArrivals].slice(0, 8);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">New Season Drop — Live Now</span>
            <h1>Train<br />Stronger.<br /><em>Live Louder.</em></h1>
            <p>Lab-tested supplements and pro-grade gear trusted by 2,00,000+ Indian athletes. No fake blends. No imported-price nonsense.</p>
            <div className="hero-cta">
              <Link to="/shop" className="btn btn-volt">Shop Bestsellers</Link>
              <Link to="/about" className="btn btn-ghost" style={{ color: '#fff', borderColor: '#fff' }}>Our Story</Link>
            </div>
            <div className="hero-stats">
              <div><b>2L+</b><span>Athletes</span></div>
              <div><b>4.8 / 5</b><span>Avg. Rating</span></div>
              <div><b>19,000+</b><span>Pin Codes</span></div>
            </div>
          </div>
          <div className="hero-img">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
              alt="Athlete training with dumbbells"
              onError={imgFallback('forge-hero')}
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits">
        <div className="container benefits-grid">
          <div className="benefit"><span className="b-ico"><TruckIcon /></span><div><b>Free Shipping</b><span>On all orders above ₹999</span></div></div>
          <div className="benefit"><span className="b-ico"><ShieldIcon /></span><div><b>100% Authentic</b><span>Sourced direct from brands</span></div></div>
          <div className="benefit"><span className="b-ico"><ReturnIcon /></span><div><b>Easy 14-Day Returns</b><span>No questions asked</span></div></div>
          <div className="benefit"><span className="b-ico"><BadgeIcon /></span><div><b>Lab Tested</b><span>Every batch, third-party verified</span></div></div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Categories</span>
              <h2>Shop by Goal</h2>
            </div>
            <Link to="/shop" className="btn btn-ghost btn-sm">View All</Link>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} className="cat-tile" to={`/shop?category=${encodeURIComponent(c.name)}`}>
                <img src={c.image} alt={c.name} loading="lazy" onError={imgFallback(c.slug)} />
                <span className="cat-label"><b>{c.name}</b><span>{c.blurb}</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Most Wanted</span>
              <h2>Bestsellers & New Drops</h2>
              <p>The products India keeps coming back for — restocked weekly.</p>
            </div>
            <Link to="/shop" className="btn btn-dark btn-sm">Shop All</Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo */}
      <section style={{ paddingBottom: 72 }}>
        <div className="container">
          <div className="promo-band">
            <div>
              <h2>Flat 10% Off Your First Stack</h2>
              <p>Use the code at checkout. New here? Take 15% with <b>FIRSTBUY</b>.</p>
            </div>
            <span className="promo-code">FORGE10</span>
            <Link to="/shop" className="btn btn-dark">Start Shopping</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ paddingBottom: 72 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Community</span>
              <h2>Forged in Real Gyms</h2>
            </div>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testi" key={t.name}>
                <Stars rating={t.rating} reviews={0} showCount={false} />
                <p>"{t.text}"</p>
                <div className="who">
                  <span className="avatar">{t.name.charAt(0)}</span>
                  <div><b>{t.name}</b><span>{t.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ paddingBottom: 72 }}>
        <div className="container">
          <div className="newsletter">
            <h2>Join the Forge List</h2>
            <p>Training tips, early drops and member-only prices. One email a week — no spam, ever.</p>
            {subscribed ? (
              <p className="ok-msg">You're in. Watch your inbox for a welcome offer.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes('@')) setSubscribed(true);
                }}
              >
                <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-volt" type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
