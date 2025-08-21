import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="section-title">Your</div>
      <div className="card" style={{ display: 'grid', gap: 8 }}>
        {user ? (
          <>
            <div><strong>{user.full_name || user.email}</strong></div>
            <div className="mute" style={{ fontSize: 13 }}>{user.email}</div>
            <hr className="sep" />
            <NavLink to="/favorites" className="btn-outline" style={{ textAlign: 'center' }}>
              View Favorites
            </NavLink>
            <NavLink to="/recipes/new" className="btn" style={{ textAlign: 'center' }}>
              Create Recipe
            </NavLink>
          </>
        ) : (
          <>
            <div className="mute">Sign in to create and save recipes.</div>
            <NavLink to="/login" className="btn" style={{ textAlign: 'center' }}>
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
}
