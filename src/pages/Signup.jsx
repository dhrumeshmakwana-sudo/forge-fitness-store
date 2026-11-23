import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import AuthLayout from '../components/AuthLayout';

export default function Signup() {
  const { signup } = useAuth();
  const { toast } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const res = signup(form.name, form.email, form.password);
    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    toast('Account created — welcome to FORGE');
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="sub">Join 2,00,000+ athletes who shop with FORGE.</p>
        <form className="form" onSubmit={submit} noValidate>
          {formError && <div className="form-error">{formError}</div>}
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={set('name')} placeholder="e.g. Priya Nair" />
            {errors.name && <p className="err">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
            {errors.email && <p className="err">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={set('password')} placeholder="Minimum 6 characters" />
            {errors.password && <p className="err">{errors.password}</p>}
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat your password" />
            {errors.confirm && <p className="err">{errors.confirm}</p>}
          </div>
          <button className="btn btn-dark btn-block" type="submit">Create My Account</button>
          <p className="tax-note" style={{ textAlign: 'center' }}>
            By signing up you agree to our Terms & Privacy Policy. This is a frontend demo — data stays in your browser.
          </p>
        </form>
        <p className="auth-switch">
          Already a member? <Link to="/login">Log in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
