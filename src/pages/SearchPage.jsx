import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './SearchPage.css';

const SearchPage = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Load Hospitable script
        const script = document.createElement('script');
        script.src = "https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js";
        script.async = true;
        document.body.appendChild(script);

        // Function to remove the gray background from Hospitable widget
        const removeGrayBackground = () => {
            // Try to find and modify the element with the gray background
            const searchBarContainerBg = document.querySelector('.search-bar-container-bg');
            if (searchBarContainerBg) {
                searchBarContainerBg.style.backgroundColor = 'transparent';
                searchBarContainerBg.style.background = 'transparent';
            }

            // Also try to target inside shadow DOM if accessible
            const widget = document.querySelector('hospitable-direct-mps');
            if (widget && widget.shadowRoot) {
                const shadowBgElement = widget.shadowRoot.querySelector('.search-bar-container-bg');
                if (shadowBgElement) {
                    shadowBgElement.style.backgroundColor = 'transparent';
                    shadowBgElement.style.background = 'transparent';
                }
            }
        };

        // Run the function multiple times to catch when the widget loads
        const intervalId = setInterval(removeGrayBackground, 500);

        // Also run after script loads
        script.onload = () => {
            setTimeout(removeGrayBackground, 1000);
            setTimeout(removeGrayBackground, 2000);
            setTimeout(removeGrayBackground, 3000);
        };

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
                title="Search Results | Birchstone Escapes"
                description="Browse available properties at Birchstone Escapes based on your search criteria."
                url="https://birchstoneescapes.com/search"
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
