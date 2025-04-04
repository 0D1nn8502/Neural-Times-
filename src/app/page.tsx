'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';
import {Category, Story, Subtopic} from "@/app/types"; 

interface GroupedStories {
  subtopic: Subtopic;
  stories: Story[];
}

export default function HomePage() { 
  const [categories, setCategories] = useState<Category[]>([]); 
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [groupedStories, setGroupedStories] = useState<GroupedStories[]>([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');  // Fetch all categories
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchGroupedStories = async () => {
      if (!selectedCategoryId) return;

      setLoading(true);
      const localStorageKey = `groupedStories_${selectedCategoryId}`;
      const localData = localStorage.getItem(localStorageKey);

      if (localData && localData !== '[]') {
        setGroupedStories(JSON.parse(localData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(`/api/stories/${selectedCategoryId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: GroupedStories[] = await response.json();
          setGroupedStories(data);
          localStorage.setItem(localStorageKey, JSON.stringify(data));

        } catch (error) {
          console.error("Error fetching grouped stories:", error);
        } finally {
          setLoading(false);
        }
      }
      setSelectedSubtopic('');
    };

    fetchGroupedStories();
  }, [selectedCategoryId]);

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
            setGroupedStories([]);
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
      {!loading && groupedStories.length > 0 && (
        <div className={styles.subtopicsRow}>
          {groupedStories.map(({ subtopic }) => (
            <button
              key={subtopic._id}
              className={`${styles.subtopicButton} ${selectedSubtopic === subtopic._id ? styles.active : ''}`}
              onClick={() => setSelectedSubtopic(subtopic._id)}
            >
              {subtopic.label}
            </button>
          ))}
        </div>
      )}

      {/* Display the l1 stories for the selected subtopic */}
      {!loading && selectedSubtopic && (
        <div className={styles.storiesContainer}>
          <h2>{groupedStories.find(({ subtopic }) => subtopic._id === selectedSubtopic)?.subtopic.label} Stories</h2>
          {groupedStories
            .find(({ subtopic }) => subtopic._id === selectedSubtopic)
            ?.stories.map((story: Story) => (
              <div key={story._id} className={styles.storyCard}>
                <div className={styles.storyTitle}>
                  <Link href={`/${selectedCategoryId}/${selectedSubtopic}/${story.slug}`}>
                    {story.title}
                  </Link>
                </div>
                <p className={styles.storyExcerpt}>{story.l1}</p>
              </div>
            ))}
        </div>
      )}

      {/* Links to Add Category, Subtopic, and Story Pages */}
      <div className={styles.addLinks}>
        <h3>Manage Content</h3>
      
          <ul>
            <li> <Link href="/admin/add-category" target='_blank'> Add Category  </Link> </li>
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
