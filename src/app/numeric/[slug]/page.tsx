'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './NumericPage.module.css'; // Create this CSS file for styling
import { Story } from '@/app/types';

const fetchStory = async (slug: string, subtopicId: string) => {
    if (!slug || !subtopicId) { 
        throw new Error('Slug or subtopic is missing.');
    }

    try {
        const storedStories = localStorage.getItem(`stories_${subtopicId}`); 
        if (storedStories) {
            const stories = JSON.parse(storedStories);
            const foundStory = stories.find((s: Story) => s.slug === slug);

            if (foundStory) {
                return foundStory;
            } else {
                throw new Error('Story not found in local storage.');
            }
        } else {
            throw new Error('No stories found in local storage.');
        }
    } catch (error) {
        console.error("Error fetching story:", error);
        throw error;
    }
};

const NumericPage = ({ params }: { params: Promise<{ slug: string }> }) => {

    const searchParams = useSearchParams();
    const subtopicId = searchParams.get('subtopicId');
    
    const [slug, setSlug] = useState<string>('');
    const [story, setStory] = useState<Story | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Handle the Promise-based params // 
    useEffect(() => {
        const resolveParams = async () => {
            try {
                const resolvedParams = await params;
                setSlug(resolvedParams.slug);
            } catch (err) {
                setError('Failed to resolve URL parameters');
                setLoading(false);
            }
        };
        
        resolveParams();
    }, [params]);

    // Fetch the story once we have the slug
    useEffect(() => {
        const loadStory = async () => {
            if (!slug || !subtopicId) return; // Don't fetch if we don't have the slug yet
            
            setLoading(true);
            try {
                const fetchedStory = await fetchStory(slug, subtopicId); 
                setStory(fetchedStory);
            } catch (err: any) {
                setError(err.message || 'Failed to load story');
            } finally {
                setLoading(false);
            }
        };

        loadStory();
    }, [slug, subtopicId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!story) return <p> Numeric Story not found.</p>;

    return (
        <div className={styles.numericContainer}>
            <h1 className={styles.storyTitle}>{story.title}</h1>
            <h2>Numeric Details</h2>  
            <ul className={styles.numericList}>
                {story.numeric.map((item, index) => (
                    <li key={index}>
                        <strong>{item.boldText}</strong>: {item.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NumericPage;
