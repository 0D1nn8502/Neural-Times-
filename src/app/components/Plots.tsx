'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Plots.module.css';
import {Lora} from 'next/font/google'; 

const lora = Lora ({
  subsets: ['latin'] 
})

interface PlotsProps {
  categoryName: string;
}

interface PlotImage {
  name: string;
  path: string;
}

export default function Plots({ categoryName }: PlotsProps) {
  const [plots, setPlots] = useState<PlotImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<PlotImage | null>(null);

  useEffect(() => {
    const fetchPlots = async () => {
      if (!categoryName) return;
      
      setLoading(true);
      setError(null);

      try {
        // Fetch the list of plot images from an API endpoint
        const response = await fetch(`/api/plots?category=${encodeURIComponent(categoryName)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch plots');
        }

        const data = await response.json();
        setPlots(data.plots || []);
      } catch (err) {
        console.error('Error fetching plots:', err);
        setError('Unable to load plots for this category');
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
  }, [categoryName]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading plots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (plots.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No plots available for this category yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.plotsContainer}>
      <h3 className={`${styles.plotsTitle} ${lora.className}`}>
         Visualizations of Numeric Trends
       </h3>
      
      <div className={styles.plotsGrid}>
        {plots.map((plot, index) => (
          <div 
            key={index} 
            className={styles.plotCard}
            onClick={() => setSelectedPlot(plot)}
          >
            <div className={styles.plotImageWrapper}>
              <Image
                src={plot.path}
                alt={plot.name}
                width={400}
                height={300}
                className={styles.plotImage}
                priority={index < 4}
              />
            </div>
            <p className={`${styles.plotName} ${lora.className}`}>
                {plot.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for enlarged view */}
      {selectedPlot && (
        <div 
          className={styles.modal}
          onClick={() => setSelectedPlot(null)}
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setSelectedPlot(null)}
            >
              x
            </button>
            <Image
              src={selectedPlot.path}
              alt={selectedPlot.name}
              width={1200}
              height={900}
              className={styles.modalImage}
            />
            <p className={styles.modalCaption}>{selectedPlot.name}</p> 
          </div>
        </div>
      )}
    </div>
  );
}