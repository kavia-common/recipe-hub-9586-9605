import React, { useState } from 'react';

export default function RecipeForm({ initial = {}, onSubmit, submitting }) {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [ingredients, setIngredients] = useState((initial.ingredients || []).map(i => `${i.quantity || ''} ${i.name}`));
  const [instructions, setInstructions] = useState(initial.instructions || []);
  const [tags, setTags] = useState(initial.tags || []);
  const [tagInput, setTagInput] = useState('');

  const addRow = (setter) => setter(prev => [...prev, '']);
  const updateRow = (setter, idx, val) => setter(prev => prev.map((v, i) => i === idx ? val : v));
  const removeRow = (setter, idx) => setter(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      ingredients: ingredients.filter(Boolean).map(line => {
        const [maybeQty, ...rest] = line.trim().split(' ');
        if (rest.length === 0) return { name: maybeQty };
        return { quantity: maybeQty, name: rest.join(' ') };
      }),
      instructions: instructions.filter(Boolean),
      tags
    };
    onSubmit(payload);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="field">
        <label>Description</label>
        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="field">
        <label>Ingredients</label>
        {ingredients.map((v, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <input style={{ flex: 1 }} value={v} onChange={e => updateRow(setIngredients, i, e.target.value)} placeholder="e.g., 2 cups flour" />
            <button type="button" className="btn-outline" onClick={() => removeRow(setIngredients, i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn-outline" onClick={() => addRow(setIngredients)}>+ Add ingredient</button>
      </div>
      <div className="field">
        <label>Instructions</label>
        {instructions.map((v, i) => (
          <div key={i} style={{ display: 'flex', gap: 6 }}>
            <input style={{ flex: 1 }} value={v} onChange={e => updateRow(setInstructions, i, e.target.value)} placeholder={`Step ${i+1}`} />
            <button type="button" className="btn-outline" onClick={() => removeRow(setInstructions, i)}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn-outline" onClick={() => addRow(setInstructions)}>+ Add step</button>
      </div>
      <div className="field">
        <label>Tags</label>
        <div className="chips">
          {tags.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add tag" />
          <button type="button" className="btn-outline" onClick={addTag}>Add</button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save Recipe'}</button>
      </div>
    </form>
  );
}
