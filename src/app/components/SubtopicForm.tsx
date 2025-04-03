// components/SubtopicForm.tsx
import React, { useState, useEffect } from 'react';
import styles from './SubtopicForm.module.css';

interface Category {
  _id: string;
  name: string;
  label: string;
}

const SubtopicForm: React.FC = () => {
  const [label, setLabel] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Replace this with an API call to fetch categories.
    setCategories([
      { _id: '1', name: 'News', label: 'News' },
      { _id: '2', name: 'Sports', label: 'Sports' },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your API call to save the subtopic
    console.log('New Subtopic:', { label, categoryId });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Subtopic</h2>
      <div className={styles.field}>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="label">Subtopic Label:</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>Add Subtopic</button>
    </form>
  );
};

export default SubtopicForm;
