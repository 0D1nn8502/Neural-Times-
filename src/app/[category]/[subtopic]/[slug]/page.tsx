'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './FullStory.module.css'; // Optional: your CSS module for styling

interface Story {
  _id: string;
  title: string;
  l1: string;
  l2: string;
  slug: string;
  categoryId: string;
  subtopicId: string;
}

const FullStory = () => {
  // Extract categoryId and subtopicId from the route parameters
  const { categoryId, subtopicId } = useParams() as {
    categoryId: string;
    subtopicId: string;
  };

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        // Build the API URL with query parameters for categoryId and subtopicId
        const response = await fetch(
          `/api/story?categoryId=${encodeURIComponent(categoryId)}&subtopicId=${encodeURIComponent(subtopicId)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setStory(data.story);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subtopicId) {
      fetchStory();
    }
  }, [categoryId, subtopicId]);

  return (
    <div className={styles.fullStoryContainer}>
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading full story...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : story ? (
        <div className={styles.storyContent}>
          <h1 className={styles.title}>{story.title}</h1>
          <div className={styles.fullText} style={{ whiteSpace: 'pre-wrap' }}>
            {story.l2}
          </div>
        </div>
      ) : (
        <p className={styles.noStory}>No story found for this subtopic.</p>
      )}
    </div>
  );
};

export default FullStory;
