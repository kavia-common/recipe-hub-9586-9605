import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ items, onToggleFavorite, favorites = [] }) {
  if (!items?.length) {
    return <div className="empty">No recipes found.</div>;
  }
  return (
    <div className="card-grid">
      {items.map(r => (
        <RecipeCard
          key={r.id}
          recipe={r}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(r.id)}
        />
      ))}
    </div>
  );
}
