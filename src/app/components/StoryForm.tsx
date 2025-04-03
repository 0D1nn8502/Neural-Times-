

// components/StoryForm.tsx
import React, { useState, useEffect } from 'react';
import styles from './StoryForm.module.css';

interface Category {
  _id: string;
  name: string;
  label: string;
}

interface Subtopic {
  _id: string;
  label: string;
  categoryId: string;
}

const StoryForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [l1, setL1] = useState('');
  const [l2, setL2] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subtopicId, setSubtopicId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [filteredSubtopics, setFilteredSubtopics] = useState<Subtopic[]>([]);

  useEffect(() => {
    // Replace with API calls to fetch categories and subtopics
    setCategories([
      { _id: '1', name: 'News', label: 'News' },
      { _id: '2', name: 'Sports', label: 'Sports' },
    ]);
    setSubtopics([
      { _id: 'a', label: 'Local', categoryId: '1' },
      { _id: 'b', label: 'International', categoryId: '1' },
      { _id: 'c', label: 'Football', categoryId: '2' },
      { _id: 'd', label: 'Basketball', categoryId: '2' },
    ]);
  }, []);

  // Filter subtopics when category changes
  useEffect(() => {
    const filtered = subtopics.filter((sub) => sub.categoryId === categoryId);
    setFilteredSubtopics(filtered);
    setSubtopicId('');
  }, [categoryId, subtopics]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your API call to save the story
    console.log('New Story:', { title, l1, l2, categoryId, subtopicId });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Story</h2>
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
        <label htmlFor="subtopic">Subtopic:</label>
        <select
          id="subtopic"
          value={subtopicId}
          onChange={(e) => setSubtopicId(e.target.value)}
          required
        >
          <option value="">Select a Subtopic</option>
          {filteredSubtopics.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="title">Story Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="l1">Short Heading (l1):</label>
        <input
          type="text"
          id="l1"
          value={l1}
          onChange={(e) => setL1(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="l2">Full Story (l2):</label>
        <textarea
          id="l2"
          value={l2}
          onChange={(e) => setL2(e.target.value)}
          required
          rows={5}
        ></textarea>
      </div>
      <button type="submit" className={styles.button}>Add Story</button>
    </form>
  );
};

export default StoryForm;
