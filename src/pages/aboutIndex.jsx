import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import AboutMain from '../components/about/AboutMain';

const AboutIndex = () => {
    return (
        <>
            <SEOMetaTags
                title="About Us | Birchstone Escapes"
                description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Learn about our mission to create unforgettable stays."
                url="https://birchstoneescapes.com/about"
            />
            <AboutIndex.Content />
        </>
    );
};

AboutIndex.Content = () => {
    return (
        <main className="about-page-container">
            <AboutMain />
        </main>
    );
};

export default AboutIndex;
