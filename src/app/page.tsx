'use client';

import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import {Category, Story, Subtopic} from "@/app/types";
import Link from 'next/link'; 
import {Lora} from 'next/font/google'; 
import {Card} from  '@/app/components/Card/Card';     

// TODO : Can the categories be prefetched (SSR)? //  

const lora = Lora ({
  subsets: ['latin'] 
})


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

  const handleNumericClick = () => {
    alert('No numerical stories yet');
  }; 

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
    <div className={styles.sarvasv}>  

    <Card className={styles.marginTop}>    
    <div className={styles.introduction}> 
        <p className={styles.lora}>
        PolicyStory is an information tool that summarizes Indian policy related news in a comprehensible fashion. It provides a <b>topic oriented</b>, <b>chronological</b>, <b>longitudinal</b>, easy-to-understand summary of policy news. This is the beta version of the tool, and it's absolutely free to use! 
        </p>

    </div> 

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
                  
                  <div className={styles.storyTitle}>
                      {story.title}
                  </div> 
                  
                  {/* Render bullet points for l1 */}
                  <ul className={styles.bulletList}>
                      {story.l1.map((item, index) => (
                        <li key={index}>
                          <strong>{item.boldText}</strong>
                          {/* Render content if it exists */}
                          {item.content && <>: {item.content}</>}

                          {/* Render bullets if they exist */}
                          {item.bullets && (
                            <ul className={styles.bulletList}>
                              {item.bullets.map((bullet, bulletIndex) => (
                                <li key={bulletIndex}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                  </ul> 

                  <div className={styles.storyLinks}>
                                <Link href={`/full/${story.slug}?subtopicId=${selectedSubtopic}`} className={styles.link} target='_blank'> 
                                    Detailed (L2) Summary 
                                </Link>
                              
                                {story.numeric.length > 0 ? (<Link href={`/numeric/${story.slug}?subtopicId=${selectedSubtopic}`} className={styles.link} target='_blank'>
                                    Numeric Summary 
                                </Link>

                                ) : (
                                  <span 
                                    className={styles.link} 
                                    onClick={handleNumericClick} 
                                    style={{ cursor: 'pointer'}} 
                                    > 
                                      Numeric Summary
                                    </span>
                                )}
                  </div>

                </div>
              
            ))}
        </div>
      )}

      

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
    </Card> 
    </div>  
  );
}
