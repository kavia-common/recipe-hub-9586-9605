import React, { useEffect, useState } from 'react';
import { apiDelete, apiGet } from '../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const r = await apiGet(`/recipes/${id}`);
        setRecipe(r);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const canEdit = user && recipe && user.id === recipe.owner_id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await apiDelete(`/recipes/${id}`, true);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="empty">Loading...</div>;
  if (!recipe) return <div className="empty">Recipe not found.</div>;

  return (
    <div className="detail">
      <div className="meta">
        <h1 style={{ margin: 0 }}>{recipe.title}</h1>
        {canEdit && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/recipes/${id}/edit`} className="btn-outline">Edit</Link>
            <button className="btn" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="mute" style={{ marginBottom: 12 }}>
        Tags: {(recipe.tags || []).join(', ') || '—'}
      </div>
      {recipe.description && <p>{recipe.description}</p>}
      <h3>Ingredients</h3>
      <ul>
        {(recipe.ingredients || []).map((ing, idx) => (
          <li key={idx}>{(ing.quantity ? `${ing.quantity} ` : '') + ing.name}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {(recipe.instructions || []).map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
