import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const { login } = useAuth();
  const { toast } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    toast('Welcome back to FORGE');
    navigate(location.state?.from || '/dashboard', { replace: true });
  };

  const fillDemo = () => {
    setEmail('demo@forge.fit');
    setPassword('demo123');
    setError('');
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="sub">Log in to your FORGE account to continue.</p>

        <div className="demo-box">
          <b>Demo Account — click to autofill</b>
          <button type="button" className="link-btn" style={{ color: 'var(--ink)', fontSize: '0.88rem' }} onClick={fillDemo}>
            Email: <code>demo@forge.fit</code> · Password: <code>demo123</code>
          </button>
        </div>

        <form className="form" onSubmit={submit}>
          {error && <div className="form-error">{error}</div>}
          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
          </div>
          <button className="btn btn-dark btn-block" type="submit">Log In</button>
        </form>
        <p className="auth-switch">
          New to FORGE? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
