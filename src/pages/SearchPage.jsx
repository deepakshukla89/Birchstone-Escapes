import React, { useEffect } from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './SearchPage.css';

const SearchPage = () => {
    useEffect(() => {
        // Load Hospitable widget script
        const script = document.createElement('script');
        script.src = "https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js";
        script.async = true;
        document.body.appendChild(script);

        // Remove gray background from widget
        const removeGrayBackground = () => {
            // Target elements in main DOM
            const bgs = document.querySelectorAll('.search-bar-container-bg');
            bgs.forEach(bg => {
                bg.style.backgroundColor = 'transparent';
                bg.style.background = 'transparent';
            });

            // Target elements in Shadow DOM
            const widget = document.querySelector('hospitable-direct-mps');
            if (widget && widget.shadowRoot) {
                const shadowBgs = widget.shadowRoot.querySelectorAll('.search-bar-container-bg');
                shadowBgs.forEach(bg => {
                    bg.style.backgroundColor = 'transparent';
                    bg.style.background = 'transparent';
                });
            }
        };

        // Run frequently to catch when widget renders
        const intervalId = setInterval(removeGrayBackground, 100);

        return () => {
            clearInterval(intervalId);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <SEOMetaTags
                title="Search Results | TimbrLux Stays"
                description="Browse our available property at TimbrLux Stays based on your search criteria."
                url="https://timbrluxstays.com/search"
            />

            <main className="search-page">
                <section
                    className="search-hero"
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/homeHeroBg.png)` }}
                >
                    <div className="search-hero-content">
                        <h1 className="search-title">Search Results</h1>
                        <p className="search-subtitle">Your perfect getaway is just a click away</p>
                    </div>
                    <div className="search-hero-overlay"></div>
                </section>

                <section className="search-widget-section">
                    <div className="container">
                        <hospitable-direct-mps
                            identifier="3db49084-2a5a-4ea3-bece-99b47a22eda5"
                            type="custom"
                        />
                    </div>
                </section>
            </main>
        </>
    );
};

export default SearchPage;
