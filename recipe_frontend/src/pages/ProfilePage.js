import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <div className="empty">Not signed in.</div>;
  return (
    <div className="detail">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.full_name || '—'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p className="mute">ID: {user.id}</p>
    </div>
  );
}
