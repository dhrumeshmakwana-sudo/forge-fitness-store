import { createContext, useContext, useEffect, useState } from 'react';

// Frontend-only demo auth. Accounts and the session live in localStorage.
// NOTE: this is a portfolio/demo pattern only — never store real passwords
// client-side in a production app.
const AuthContext = createContext(null);

const DEMO_USER = {
  name: 'Demo Athlete',
  email: 'demo@forge.fit',
  password: 'demo123',
  phone: '+91 98765 43210',
  address: 'Bandra West, Mumbai, Maharashtra 400050',
};

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = read('forge_users', null);
    if (saved) return saved;
    return [DEMO_USER]; // seed demo account on first run
  });
  const [user, setUser] = useState(() => read('forge_session', null));

  useEffect(() => { localStorage.setItem('forge_users', JSON.stringify(users)); }, [users]);
  useEffect(() => {
    if (user) localStorage.setItem('forge_session', JSON.stringify(user));
    else localStorage.removeItem('forge_session');
  }, [user]);

  const publicUser = (u) => ({
    name: u.name, email: u.email, phone: u.phone || '', address: u.address || '',
  });

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'Invalid email or password. Try the demo account below.' };
    setUser(publicUser(found));
    return { ok: true };
  };

  const signup = (name, email, password) => {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists. Please log in.' };
    }
    const newUser = { name: name.trim(), email: email.trim(), password, phone: '', address: '' };
    setUsers((u) => [...u, newUser]);
    setUser(publicUser(newUser));
    return { ok: true };
  };

  const updateProfile = (patch) => {
    if (!user) return;
    const next = { ...user, ...patch };
    setUser(next);
    setUsers((list) => list.map((u) => (u.email === user.email ? { ...u, ...patch } : u)));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
