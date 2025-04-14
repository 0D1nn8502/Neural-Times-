'use client';

import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import {Category, Story, Subtopic} from "@/app/types";
import Link from 'next/link'; 

// TODO : Can the categories be prefetched (SSR)? //  

export default function HomePage() { 
  const [categories, setCategories] = useState<Category[]>([]); 
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]); 
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [subtopicLabel, setsubtopiclabel] = useState<string>(''); 

  useEffect(() => {
    const fetchCategories = async () => { 
      setLoading(true); 

      try {
        const response = await fetch('/api/category');  // Fetch all categories
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message : ` );
        }
        const data: Category[] = await response.json();
        setCategories(data); 

      } catch (error) {
        console.error("Error fetching categories:", error);
        setTimeout(fetchCategories, 2000); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchSubtopics = async () => {
      if (!selectedCategoryId) return; 

      setSelectedSubtopic('');

      try {
        const response = await fetch(`/api/subtopics?categoryId=${selectedCategoryId}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status : ${response.status}`); 
        }

        const data: Subtopic[] = await response.json();
        setSubtopics(data);  

      } catch (error) {
        console.error("Error fetching subtopics:", error);
      }
    }

    fetchSubtopics(); 
  }, [selectedCategoryId]); 


  useEffect(() => {
    const fetchStories = async () => {
      if (!selectedSubtopic || !selectedCategoryId) return;

      setLoading(true);
      const localStorageKey = `stories_${selectedSubtopic}`;
      const localData = localStorage.getItem(localStorageKey);

      if (localData && localData !== '[]') {
        setStories(JSON.parse(localData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(`/api/stories/${selectedSubtopic}`); 
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: Story[] = await response.json(); 
          setStories(data);
          localStorage.setItem(localStorageKey, JSON.stringify(data));

        } catch (error) {
          console.error("Error fetching grouped stories:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStories();
  }, [selectedSubtopic]);


  return (
    <div className={styles.mainContainer}>
      {/* Category Dropdown */}
      <div className={styles.dropdownContainer}>
        <label htmlFor="category-select" className={styles.label}>
          Select a Category:
        </label>
        <select
          id="category-select"
          className={styles.categoryDropdown}
          value={selectedCategoryId}
          onChange={(e) => {
            setSelectedCategoryId(e.target.value);
            setStories([]);
          }}
        >
          <option value="">-- Please choose an option --</option>
          {categories.map((category: Category) => (
            <option key={category._id} value={category._id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading subtopics...</p>
        </div>
      )}

      {/* Subtopic Buttons */}
      {!loading && selectedCategoryId && subtopics.length > 0 && (
        <div className={styles.subtopicsRow}>
          {subtopics.map((subtopic) => (
            <button
              key={subtopic._id}
              className={`${styles.subtopicButton} ${selectedSubtopic === subtopic._id ? styles.active : ''}`}
              onClick={() => {
                setSelectedSubtopic(subtopic._id)  
                setsubtopiclabel(subtopic.label); 
                setStories([]); 
              }}
            >
              {subtopic.label}
            </button>
          ))}
        </div>
      )}

      {/* Display the l1 stories for the selected subtopic */}
      {!loading && selectedSubtopic && (
        <div className={styles.storiesContainer}>
          <h2> {subtopicLabel} Stories </h2>
          {stories.map((story: Story) => (
              
                <div key={story._id} className={styles.storyCard}>
                  <Link href={`/full/${story.slug}?subtopicId=${selectedSubtopic}`} target='_blank'> 
                  <div className={styles.storyTitle}>
                      {story.title}
                  </div>
                  </Link> 
                  <p className={styles.storyExcerpt}>{story.l1}</p>
                </div>
              
            ))}
        </div>
      )}

      {/* Links to Add Category, Subtopic, and Story Pages */}
      <div className={styles.addLinks}>
        <h3>Manage Content</h3>
      
          <ul>
            <li> <Link href="/admin/add-category" target='_blank'> Add Category </Link> </li>
            <li> <Link href="/admin/add-subtopic" target='_blank'> Add Subtopic </Link> </li>
            <li> <Link href="/admin/add-story" target='_blank'> Add Story </Link> </li> 
          </ul> 
        
      </div>

      {/* Styles for Loading Spinner */}
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #0070f3;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
