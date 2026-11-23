import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container">
      <div className="success-wrap">
        <h1 style={{ fontSize: '4.2rem' }}>404</h1>
        <p style={{ fontSize: '1.05rem' }}>This page skipped leg day — and every other day. It doesn't exist.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-dark">Back to Home</Link>
          <Link to="/shop" className="btn btn-ghost">Browse the Shop</Link>
        </div>
      </div>
    </div>
  );
}
