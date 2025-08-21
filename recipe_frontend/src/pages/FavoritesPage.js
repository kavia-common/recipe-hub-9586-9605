import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import RecipeList from '../components/RecipeList';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fav = await apiGet('/favorites', true);
        setFavorites(fav.recipe_ids || []);
        // Fetch recipes by ids using list endpoint and filter client side
        const list = await apiGet('/recipes', false, { skip: 0, limit: 100 });
        const items = (list.items || list).filter(r => fav.recipe_ids.includes(r.id));
        setRecipes(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="empty">Loading favorites...</div>;

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0 }}>Your Favorites</h2>
      </div>
      <RecipeList items={recipes} favorites={favorites} />
    </div>
  );
}
