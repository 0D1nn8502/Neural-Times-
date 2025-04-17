import React, { useState, useEffect } from 'react';
import styles from './StoryForm.module.css';
import { fetchCategories } from './SubtopicForm'; 

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
  const [l1, setL1] = useState<{boldText: string; content: string}[]>([]);
  const [l2, setL2] = useState<{text: string}[]>([]);  
  const [numeric, setNumeric] = useState<{boldText: string; content: string}[]>([]); 
  const [slug, setSlug] = useState(''); 
  const [categoryId, setCategoryId] = useState('');
  const [subtopicId, setSubtopicId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);

  // Fetch categories when component mounts // 
  useEffect(() => {
    
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(); 
        setCategories(data); 

      } catch (error) {
        console.error("Error fetching categories : ", error); 
      }
    }
    loadCategories(); 
  }, []);  

  // Fetch subtopics when category changes // 
  useEffect(() => {
    
    if (!categoryId) {
      setSubtopics([]); 
      return; 
    }

    const loadSubtopics = async () => {

      try {
        const res = await fetch(`/api/subtopics?categoryId=${categoryId}`);  
        if (!res.ok) {
          throw new Error(`Error fetching subtopics : ${res.status}`); 
        }        

        const data = await res.json(); 
        setSubtopics(data);   
         
      } catch (error) {
        console.error("Error fetching subtopics : ", error); 
      }

    }
    loadSubtopics(); 

  }, [categoryId]);

  const handleAddL1 = () => {
    setL1([...l1, { boldText: '', content: '' }]);
  };

  const handleL1Change = (index: number, field: 'boldText' | 'content', value: string) => {
    const newL1 = [...l1];
    newL1[index][field] = value;
    setL1(newL1);
  };

  // New functions for numeric field
  const handleAddNumeric = () => {
    setNumeric([...numeric, { boldText: '', content: '' }]);
  };

  const handleNumericChange = (index: number, field: 'boldText' | 'content', value: string) => {
    const newNumeric = [...numeric];
    newNumeric[index][field] = value;
    setNumeric(newNumeric);
  };

  const handleAddParagraph = () => {
    setL2([...l2, {text: ''}]); 
  }

  const handleParagraphChange = (index: number, value: string) => {
    const newParas = [...l2]; 
    newParas[index].text = value; 
    setL2(newParas); 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // API call to save story //  
    try {
      const res = await fetch('/api/stories/add', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({title, l1, l2, categoryId, subtopicId, slug, numeric})   
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`Successful : ${data.message}`);  
        setL1([]); 
        setL2([]); 
        setNumeric([]); 
        setTitle(''); 
        setSlug(''); 
      } else {
        console.error('Error : ', data.message); 
      }

    } catch (error) {
      console.error('Error : ', error);  
    }
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
          {subtopics.map((sub) => (
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
        <label> Short Heading (l1):</label>
        {l1.map((item, index) => (
          <div key={index} className={styles.l1Item}>
            <input
              type="text"
              placeholder="Bold Text"
              value={item.boldText}
              onChange={(e) => handleL1Change(index, 'boldText', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Content"
              value={item.content}
              onChange={(e) => handleL1Change(index, 'content', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddL1}>Add l1 Item</button>
      </div>

      <div className={styles.field}>
        <label htmlFor="l2">Full Story (l2):</label>
        {l2.map((paragraph, index) => (
          <div key={index}> 
            
            <textarea
              value={paragraph.text}
              onChange={(e) => handleParagraphChange(index, e.target.value)} 
              required
              rows={3} 
              style={{marginBottom: '10px'}} 
            />

          </div> 

        ))} 

        <button type='button' onClick={handleAddParagraph}> Add Paragraph </button>
        
      </div> 

      <div className={styles.field}>
        <label> Numeric content:</label>
        {numeric.map((item, index) => (
          <div key={index} className={styles.numericItem}> 
            <input
              type="text"
              placeholder="Bold Text"
              value={item.boldText}
              onChange={(e) => handleNumericChange(index, 'boldText', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Content"
              value={item.content}
              onChange={(e) => handleNumericChange(index, 'content', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddNumeric}>Add numeric Item</button>
      </div>

      <div className={styles.field}>
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          value={slug} 
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.button}>Add Story</button>
    </form>
  );
};

export default StoryForm;
