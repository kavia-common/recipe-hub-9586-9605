import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await register(email, password, fullName || null);
      navigate('/');
    } catch (e) {
      setError('Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Create account</h2>
      <form className="form" onSubmit={onSubmit}>
        {error && <div className="empty" style={{ borderStyle: 'solid' }}>{error}</div>}
        <div className="field">
          <label>Full name</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Optional" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Creating...' : 'Create account'}</button>
      </form>
      <p className="mute" style={{ marginTop: 12 }}>
        Have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}
