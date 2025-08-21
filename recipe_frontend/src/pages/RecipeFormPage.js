import React, { useEffect, useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import { apiGet, apiPatch, apiPost } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeFormPage({ mode = 'create' }) {
  const isEdit = mode === 'edit';
  const { id } = useParams();
  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const r = await apiGet(`/recipes/${id}`);
        setInitial(r);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id, isEdit]);

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      if (isEdit) {
        const updated = await apiPatch(`/recipes/${id}`, payload, true);
        navigate(`/recipes/${updated.id}`);
      } else {
        const created = await apiPost('/recipes', payload, true);
        navigate(`/recipes/${created.id}`);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to save recipe');
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && !initial) return <div className="empty">Loading...</div>;

  return (
    <div>
      <div className="toolbar">
        <h2 style={{ margin: 0 }}>{isEdit ? 'Edit Recipe' : 'New Recipe'}</h2>
      </div>
      <RecipeForm initial={initial || {}} onSubmit={handleSubmit} submitting={saving} />
    </div>
  );
}
