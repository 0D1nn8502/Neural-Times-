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
  const [name, setName] = useState(''); 
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    
    const getCategories = async () => {

      try {
        setLoading(true); 
        setError(null); 

        const categories = await fetchCategories(); 
        setCategories(categories); 
      } catch (error) { 
        setError(`Failed to fetch categories : ${error}`); 
      }

    }

    getCategories(); 

  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your API call to save the subtopic // 
    try {

      const res = await fetch('../api/subtopics/add', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({name, label, categoryId}) 
      });

      if (!res.ok) {
        throw new Error (`Failed to add subtopic : ${res.status}`); 
      }

      const data = await res.json(); 
      console.log("Subtopic added : ", data); 

      setLabel(''); 
      setName('');
      setCategoryId(''); 

      alert('Subtopic added successfully'); 
      
    } catch (error) {
      console.error('Error adding subtopic : ', error); 
      alert('Failed to add subtopic'); 
    }

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

      <div className={styles.field}>
        <label htmlFor="name">Subtopic Name:</label>
        <input
          type="text"
          id="name"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.button}>Add Subtopic</button>
    </form>
  );
};


export const fetchCategories = async() => {

  try {
    const res = await fetch('/api/category'); 

    if (!res.ok) {
      throw new Error(`Failed to fetch categories : ${res.status}`); 
    }

    return await res.json(); 

  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Ensure the calling function handles this
  }

}


export {SubtopicForm}; 

