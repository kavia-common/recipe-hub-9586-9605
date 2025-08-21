import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, apiDelete } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import RecipeList from '../components/RecipeList';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const q = searchParams.get('q') || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = q ? await apiGet('/recipes/search', false, { q }) : await apiGet('/recipes', false, { skip: 0, limit: 20 });
      setRecipes(data.items || data);
      setTotal(data.total ?? data.length ?? 0);
      if (user) {
        const fav = await apiGet('/favorites', true);
        setFavorites(fav.recipe_ids || []);
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, [q, user]);

  const onSearchChange = (e) => {
    const val = e.target.value;
    setSearchParams(val ? { q: val } : {});
  };

  const onToggleFavorite = async (id) => {
    if (!user) return;
    try {
      const isFav = favorites.includes(id);
      if (isFav) {
        const res = await apiDelete(`/favorites/${id}`, true);
        setFavorites(res.recipe_ids || favorites.filter(x => x !== id));
      } else {
        const res = await apiPost(`/favorites/${id}`, null, true);
        setFavorites(res.recipe_ids || [...favorites, id]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const searchValue = useMemo(() => q, [q]);

  return (
    <div>
      <div className="toolbar">
        <div className="search" style={{ flex: 1 }}>
          <span role="img" aria-label="search">🔎</span>
          <input placeholder="Search recipes..." value={searchValue} onChange={onSearchChange} />
        </div>
        {user && (
          <Link to="/recipes/new" className="btn">Create</Link>
        )}
      </div>

      {loading ? <div className="empty">Loading...</div> : (
        <>
          <RecipeList items={recipes} onToggleFavorite={onToggleFavorite} favorites={favorites} />
          <div className="mute" style={{ marginTop: 12 }}>{total} results</div>
        </>
      )}
    </div>
  );
}
