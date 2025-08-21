import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, onToggleFavorite, isFavorite }) {
  const titleInitials = (recipe.title || 'R').slice(0, 2).toUpperCase();

  return (
    <div className="recipe-card">
      <div className="recipe-thumb">{titleInitials}</div>
      <div className="recipe-body">
        <Link to={`/recipes/${recipe.id}`} style={{ fontWeight: 700 }}>{recipe.title}</Link>
        <div className="meta">
          <span className="mute">{recipe.tags?.slice(0, 3).join(', ') || 'No tags'}</span>
          {onToggleFavorite && (
            <button
              className="btn-outline"
              onClick={() => onToggleFavorite(recipe.id)}
              aria-label="Toggle favorite"
            >
              {isFavorite ? '★ Favorited' : '☆ Favorite'}
            </button>
          )}
        </div>
        <div className="tag-row">
          {(recipe.tags || []).slice(0, 5).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
