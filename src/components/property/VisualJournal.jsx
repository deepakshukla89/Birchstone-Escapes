import React, { useState, useEffect } from 'react';
import './VisualJournal.css';

const VisualJournal = ({ images: apiImages = [], isLoading = false }) => {
    // Process API images
    const images = apiImages.map((img, i) => ({
        id: img.id || i,
        url: img.url || img.thumbnail_url,
        alt: img.caption || `Property image ${i + 1}`
    }));

    // Track the current first image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Navigate to previous
    const handlePrev = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Navigate to next
    const handleNext = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Auto-play every 3 seconds
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Get visible images with safety checks
    const getVisibleImages = () => {
        if (isLoading || images.length === 0) return [null, null, null];

        const first = images[currentIndex];
        const second = images.length > 1 ? images[(currentIndex + 1) % images.length] : first;
        const third = images.length > 2 ? images[(currentIndex + 2) % images.length] : second;

        return [first, second, third];
    };

    const [firstImg, secondImg, thirdImg] = getVisibleImages();

    if (!isLoading && images.length === 0) return null;

    return (
        <section
            className="visual-journal-section"
            aria-labelledby="journal-title"
        >
            <div className="journal-container">
                {/* Header Area */}
                <div className="journal-header">
                    <div className="journal-title-group">
                        <span className="journal-subtitle">LIFESTYLE</span>
                        <h2 id="journal-title" className="journal-main-title">Visual Journal</h2>
                    </div>

                    {/* Navigation Arrows */}
                    {!isLoading && images.length > 1 && (
                        <div className="journal-nav">
                            <button
                                className="journal-nav-btn prev"
                                onClick={handlePrev}
                                aria-label="Previous image"
                            >
                                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 1H0" stroke="#722F37" strokeWidth="1.5" />
                                    <path d="M4 0L0 1L4 2" stroke="#722F37" strokeWidth="1.5" />
                                </svg>
                            </button>
                            <button
                                className="journal-nav-btn next"
                                onClick={handleNext}
                                aria-label="Next image"
                            >
                                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1H16" stroke="#722F37" strokeWidth="1.5" />
                                    <path d="M12 0L16 1L12 2" stroke="#722F37" strokeWidth="1.5" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Stacked Images Container */}
                <div className="journal-stack">
                    {isLoading ? (
                        <>
                            <div className="journal-card journal-card-third skeleton-shimmer"></div>
                            <div className="journal-card journal-card-second skeleton-shimmer"></div>
                            <div className="journal-card journal-card-first skeleton-shimmer"></div>
                        </>
                    ) : (
                        <>
                            {thirdImg && (
                                <div className="journal-card journal-card-third">
                                    <img src={thirdImg.url} alt={thirdImg.alt} className="journal-img" loading="lazy" />
                                </div>
                            )}
                            {secondImg && (
                                <div className="journal-card journal-card-second">
                                    <img src={secondImg.url} alt={secondImg.alt} className="journal-img" loading="lazy" />
                                </div>
                            )}
                            {firstImg && (
                                <div className="journal-card journal-card-first">
                                    <img src={firstImg.url} alt={firstImg.alt} className="journal-img" loading="lazy" />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};


export default VisualJournal;
