import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="logo" />
        Recipe Hub
      </div>
      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
      <div className="grow" />
      <div className="nav-actions">
        {user ? (
          <>
            <NavLink className="btn-outline" to="/recipes/new">New Recipe</NavLink>
            <NavLink className="btn-outline" to="/profile">{user.full_name || user.email}</NavLink>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className="btn-outline" to="/login">Login</NavLink>
            <NavLink className="btn" to="/register">Sign up</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
