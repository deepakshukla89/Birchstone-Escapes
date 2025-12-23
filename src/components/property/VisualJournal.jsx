import React, { useState, useEffect } from 'react';
import './VisualJournal.css';

const VisualJournal = () => {
    // Dummy data: 20 images
    const images = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        url: `https://picsum.photos/seed/journal${i + 1}/800/600`,
        alt: `Visual Journal Image ${i + 1}`
    }));

    // Track the current first image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Navigate to previous
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Navigate to next
    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Auto-play every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // Get the 3 visible images based on current index
    const getVisibleImages = () => {
        const first = images[currentIndex];
        const second = images[(currentIndex + 1) % images.length];
        const third = images[(currentIndex + 2) % images.length];
        return [first, second, third];
    };

    const [firstImg, secondImg, thirdImg] = getVisibleImages();

    // SEO Schema for ImageGallery
    const gallerySchema = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "Visual Journal - Birchstone Escapes",
        "description": "A visual journey through the lifestyle and atmosphere of our property.",
        "image": images.map(img => img.url)
    };

    return (
        <section
            className="visual-journal-section"
            aria-labelledby="journal-title"
        >
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
            />

            <div className="journal-container">
                {/* Header Area */}
                <div className="journal-header">
                    <div className="journal-title-group">
                        <span className="journal-subtitle">LIFESTYLE</span>
                        <h2 id="journal-title" className="journal-main-title">Visual Journal</h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="journal-nav">
                        <button
                            className="journal-nav-btn prev"
                            onClick={handlePrev}
                            aria-label="Previous image"
                        >
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H0" stroke="#EB973F" strokeWidth="1.5" />
                                <path d="M4 0L0 1L4 2" stroke="#EB973F" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button
                            className="journal-nav-btn next"
                            onClick={handleNext}
                            aria-label="Next image"
                        >
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 1H16" stroke="#EB973F" strokeWidth="1.5" />
                                <path d="M12 0L16 1L12 2" stroke="#EB973F" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stacked Images Container */}
                <div className="journal-stack">
                    {/* 3rd Image - Fully grayscale, back */}
                    <div className="journal-card journal-card-third">
                        <img
                            src={thirdImg.url}
                            alt={thirdImg.alt}
                            className="journal-img"
                            loading="lazy"
                        />
                    </div>

                    {/* 2nd Image - 50% grayscale, middle */}
                    <div className="journal-card journal-card-second">
                        <img
                            src={secondImg.url}
                            alt={secondImg.alt}
                            className="journal-img"
                            loading="lazy"
                        />
                    </div>

                    {/* 1st Image - Full color, front */}
                    <div className="journal-card journal-card-first">
                        <img
                            src={firstImg.url}
                            alt={firstImg.alt}
                            className="journal-img"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisualJournal;
