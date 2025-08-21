import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/';

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      navigate(redirect);
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Sign in</h2>
      <form className="form" onSubmit={onSubmit}>
        {error && <div className="empty" style={{ borderStyle: 'solid' }}>{error}</div>}
        <div className="field">
          <label>Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p className="mute" style={{ marginTop: 12 }}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
