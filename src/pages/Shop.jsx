import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, formatINR } from '../data/products';
import ProductCard from '../components/ProductCard';

const MAX_PRICE = 5000;
const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

const SORTS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const query = params.get('q') || '';

  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [brand, setBrand] = useState('All');
  const [sort, setSort] = useState('popularity');
  const [inStockOnly, setInStockOnly] = useState(false);

  const setCategory = (c) => {
    const next = new URLSearchParams(params);
    if (c === 'All') next.delete('category');
    else next.set('category', c);
    setParams(next);
  };

  const clearSearch = () => {
    const next = new URLSearchParams(params);
    next.delete('q');
    setParams(next);
  };

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (brand !== 'All' && p.brand !== brand) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && !p.inStock) return false;
      if (query) {
        const hay = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      return true;
    });
    switch (sort) {
      case 'price-low': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-high': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [category, brand, maxPrice, sort, inStockOnly, query]);

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">The Catalogue</span>
        <h1>{category === 'All' ? 'Shop All' : category}</h1>
        <p>Every product is batch-tested and shipped within 24 hours from our Mumbai warehouse.</p>
      </div>

      <div className="shop-layout">
        <aside className="filters">
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Category</h4>
            <div className="chip-col">
              {['All', ...CATEGORIES.map((c) => c.name)].map((c) => (
                <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h4>Max Price</h4>
            <span className="range-val">Up to {formatINR(maxPrice)}</span>
            <input
              type="range" min="349" max={MAX_PRICE} step="50"
              value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="filter-group">
            <h4>Brand</h4>
            <div className="chip-col">
              {['All', ...BRANDS].map((b) => (
                <button key={b} className={`chip ${brand === b ? 'active' : ''}`} onClick={() => setBrand(b)}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <label style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
              In stock only
            </label>
          </div>
        </aside>

        <div>
          <div className="shop-toolbar">
            <span className="count">
              {results.length} product{results.length !== 1 ? 's' : ''}
              {query && (
                <> for "<b>{query}</b>" — <button className="link-btn" style={{ color: 'var(--ink)' }} onClick={clearSearch}>clear search</button></>
              )}
            </span>
            <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <h3>Nothing matches those filters</h3>
              <p>Try a different category, brand or price range.</p>
              <button
                className="btn btn-dark"
                onClick={() => { setCategory('All'); setBrand('All'); setMaxPrice(MAX_PRICE); setInStockOnly(false); clearSearch(); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid shop-grid">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
