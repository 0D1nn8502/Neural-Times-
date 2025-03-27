'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css'; // Import the CSS module
import { categories } from '@/app/types'; 

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('union-budget'); 
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>('defense');

  // Find the selected Category object
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  // Find the selected Subtopic object
  const selectedSubtopic = selectedCategory?.subtopics.find(
    (sub) => sub.id === selectedSubtopicId
  );

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
            setSelectedSubtopicId(''); // reset subtopic on category change
          }}
        >
          <option value="">-- Please choose an option --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subtopic Buttons */}
      {selectedCategory && (
        <div className={styles.subtopicsRow}>
          {selectedCategory.subtopics.map((sub) => {
            const isActive = sub.id === selectedSubtopicId;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubtopicId(sub.id)}
                className={`${styles.subtopicButton} ${isActive ? styles.active : ''}`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Stories List */}
      {selectedSubtopic && (
        <div className={styles.storiesContainer}>
          <h2 className={styles.subtopicTitle}>
            {selectedSubtopic.label} Stories
          </h2>

          {selectedSubtopic.stories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <div className={styles.storyTitle}>
                <Link href={`/${selectedCategoryId}/${selectedSubtopicId}/${story.slug}`}>
                  {story.title}
                </Link>
              </div>
              <p className={styles.storyExcerpt}>{story.l1}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
