import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Contact() {
  const { toast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', topic: 'Order support', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    toast('Message sent');
  };

  return (
    <div className="container">
      <div className="page-hero">
        <span className="eyebrow">We Reply Fast</span>
        <h1>Contact Us</h1>
        <p>Questions about an order, a product, or your stack? Our team of coaches (yes, real coaches) replies within one working day.</p>
      </div>

      <div className="cart-layout" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <div className="panel">
            <h3>Reach Us</h3>
            <p style={{ color: 'var(--ink-soft)', display: 'grid', gap: 10 }}>
              <span><b>Email:</b> support@forge.fit</span>
              <span><b>Phone / WhatsApp:</b> +91 98200 12345</span>
              <span><b>Hours:</b> Mon–Sat, 10 AM – 7 PM IST</span>
            </p>
          </div>
          <div className="panel">
            <h3>Head Office</h3>
            <p style={{ color: 'var(--ink-soft)' }}>
              FORGE Fitness Pvt. Ltd.<br />
              Gala No. 12, Kanakia Wall Street,<br />
              Andheri East, Mumbai — 400093<br />
              Maharashtra, India
            </p>
          </div>
          <div className="panel">
            <h3>Bulk & Gym Orders</h3>
            <p style={{ color: 'var(--ink-soft)' }}>
              Running a gym or a team? Write to <b>partners@forge.fit</b> for wholesale pricing on supplements and gear.
            </p>
          </div>
        </div>

        <div className="panel">
          <h3>Send a Message</h3>
          {sent ? (
            <div>
              <p style={{ color: 'var(--ink-soft)', marginBottom: 16 }}>
                Thanks, {form.name.split(' ')[0] || 'friend'} — your message is with our team. Expect a reply at <b>{form.email}</b> within one working day.
              </p>
              <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form className="form" onSubmit={submit}>
              <div className="form-2col">
                <div className="field">
                  <label htmlFor="ct-name">Your name</label>
                  <input id="ct-name" required value={form.name} onChange={set('name')} />
                </div>
                <div className="field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" type="email" required value={form.email} onChange={set('email')} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="ct-topic">Topic</label>
                <select id="ct-topic" value={form.topic} onChange={set('topic')}>
                  <option>Order support</option>
                  <option>Product advice</option>
                  <option>Returns & refunds</option>
                  <option>Wholesale / partnerships</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="ct-msg">Message</label>
                <textarea id="ct-msg" rows="5" required value={form.message} onChange={set('message')} placeholder="How can we help?" />
              </div>
              <button className="btn btn-dark" type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
