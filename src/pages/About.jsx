import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">Since 2021</span>
        <h1>Built by Lifters,<br />For India</h1>
        <p>FORGE started in a 200 sq ft Mumbai godown with one belief: Indian athletes deserve world-class supplements without world-class markups, fake blends or grey-market imports.</p>
      </div>

      <div className="prose">
        <h3>The Problem We Saw</h3>
        <p>Walk into any supplement store in India a few years ago and you'd find imported tubs at double the US price, labels hiding behind "proprietary blends", and no way to know if what you bought was even real. Athletes were paying more for less — and sometimes for chalk.</p>
        <h3>What We Did About It</h3>
        <p>We built FORGE around three rules. First, every product we sell is batch-tested by an independent Indian lab, and the report is one scan away on the pack. Second, we print full, honest labels — if a scoop says 24 g protein, the lab agrees. Third, we price in rupees for Indian wallets, sourcing directly from brands and manufacturing our FORGE Labs line right here in India.</p>
        <h3>Where We Are Now</h3>
        <p>Today FORGE serves over 2,00,000 athletes across 19,000+ pin codes — from first-time gym members buying their first creatine to national-level powerlifters trusting our belts on the platform. Our warehouse ships within 24 hours, and our support team is staffed by actual coaches, not scripts.</p>
        <h3>Our Promise</h3>
        <p>If it doesn't help you train stronger, we won't sell it. No miracle claims, no dust-dosed formulas, no fake discounts. Just the stack we'd give our own training partners.</p>
      </div>

      <div className="values-grid">
        <div className="value-card">
          <b>Tested, Always</b>
          <p>Every batch is third-party lab tested for protein content, heavy metals and banned substances before it reaches our shelves.</p>
        </div>
        <div className="value-card">
          <b>Honest Labels</b>
          <p>No proprietary blends. Every ingredient and dose is printed on the pack — exactly what you pay for is what you get.</p>
        </div>
        <div className="value-card">
          <b>Priced for India</b>
          <p>Direct sourcing and local manufacturing keep prices fair. Premium quality shouldn't need an importer's markup.</p>
        </div>
      </div>

      <div style={{ paddingBottom: 80 }}>
        <div className="promo-band">
          <div>
            <h2>Ready to Forge Ahead?</h2>
            <p>Browse the catalogue and build your stack today.</p>
          </div>
          <Link to="/shop" className="btn btn-dark">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}
