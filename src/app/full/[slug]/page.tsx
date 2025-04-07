'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './StoryPage.module.css';
import { Story } from '@/app/types';

interface Prop { 
    params: {
        slug: string; 
    }
}


const StoryPage = ({params} : Prop) => {
  const searchParams = useSearchParams(); 
  const slug = params.slug; 
  const subtopicId = searchParams.get('subtopicId'); 

  console.log("SLUG :: ", slug); 

  const [story, setStory] = useState<Story>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchStory = async () => {
      
      if (!slug || !subtopicId) {
            setError('Slug or Subtopic ID is missing.'); 
            setLoading(false);
            return; // Ensure slug and subtopicId are available // 
      }

      setLoading(true);
      try {
        // Retrieve the story from local storage
    
        const storedStories = localStorage.getItem(`stories_${subtopicId}`);  
        console.log("Stored : ", storedStories);

        if (storedStories) {
            const stories = JSON.parse(storedStories);
            const foundStory = stories.find((s: Story) => s.slug === slug);
  
            if (foundStory) {
              setStory(foundStory);
              console.log("Found Story:", foundStory); // Log found story
            } else {
              setError('Story not found in local storage.');
            }
          } else {
            setError('No stories found in local storage.');
          }
        } catch (error) {
          setError('Failed to load story');
          console.error("Error fetching story:", error);
        } finally {
          setLoading(false);
        }
    };

    fetchStory();
  }, [slug, subtopicId]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!story) return <p>Story not found.</p>;

  return (
    <div className={styles.storyContainer}>
      <h1 className={styles.storyTitle}>{story.title}</h1>
      <div className={styles.storyContent}>{story.l2}</div>
    </div>
  );
};


export default StoryPage;
