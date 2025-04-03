// components/CategoryForm.tsx
import React, { useState } from 'react';
import styles from './CategoryForm.module.css';

const CategoryForm: React.FC = () => {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // API call // 
    try {
        const res = await fetch('/api/category/add', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify({name, label}) 
        });

        const data = await res.json(); 
        if (res.ok) {
            console.log(data.message); 
            setName(''); 
            setLabel(''); 
        } else {
            console.error('Error : ', data.message); 
        }

    } catch (error) {
        console.error('Error : ', error); 
    }

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Category</h2>
      <div className={styles.field}>
        <label htmlFor="name">Category Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="label">Category Label:</label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>Add Category</button>
    </form>
  );
};

export default CategoryForm;
