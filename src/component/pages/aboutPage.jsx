import React from 'react';
import SEOMetaTags from '../common/SEOMetaTags';
// import './aboutPage.css';

export default function AboutPage() {
    return (
        <>
            <SEOMetaTags
                title="About Us"
                description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Learn about our mission to create unforgettable stays."
                url="https://birchstoneescapes.com/about"
            />

            <div className="about-page">
                About page
            </div>
        </>
    );
}
