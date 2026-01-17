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

        // Function to inject new theme into Shadow DOM
        const applyNewTheme = () => {
            const widget = document.querySelector('hospitable-direct-mps');
            if (widget && widget.shadowRoot) {
                // Remove gray background if it exists
                const shadowBgs = widget.shadowRoot.querySelectorAll('.search-bar-container-bg');
                shadowBgs.forEach(bg => {
                    bg.style.backgroundColor = 'transparent';
                    bg.style.background = 'transparent';
                });

                // Inject Custom Styles to override color theme
                let style = widget.shadowRoot.querySelector('#theme-override');
                if (!style) {
                    style = document.createElement('style');
                    style.id = 'theme-override';
                    widget.shadowRoot.appendChild(style);
                }

                style.textContent = `
                    :host {
                        --mps-primary-color: #722F37 !important;
                        --mps-button-bg: #722F37 !important;
                        --mps-button-text: #ffffff !important;
                    }
                    .search-bar-container-bg {
                        background: transparent !important;
                        background-color: transparent !important;
                    }
                    button, .mps-button, .search-button, [type="button"] {
                        background-color: #722F37 !important;
                        color: #ffffff !important;
                        border-color: #722F37 !important;
                    }
                    .property-title, .property-card-title, h2, h3 {
                        color: #722F37 !important;
                    }
                    .price-amount, .price, .property-card-price {
                        color: #722F37 !important;
                    }
                    .mps-input-icon, svg {
                        fill: #722F37 !important;
                        stroke: #722F37 !important;
                    }
                    a {
                        color: #722F37 !important;
                    }
                    .mps-search-bar__button {
                        background-color: #722F37 !important;
                    }
                `;
            }

            // Also target main DOM just in case
            const bgs = document.querySelectorAll('.search-bar-container-bg');
            bgs.forEach(bg => {
                bg.style.backgroundColor = 'transparent';
                bg.style.background = 'transparent';
            });
        };

        // Run frequently to catch when widget renders
        const intervalId = setInterval(applyNewTheme, 100);

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

            {/* Schema.org structured data for Search Page */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SearchResultsPage",
                        "name": "Search Results - TimbrLux Stays",
                        "description": "Browse available vacation rental properties at TimbrLux Stays.",
                        "url": "https://timbrluxstays.com/search",
                        "mainEntity": {
                            "@type": "ItemList",
                            "name": "Available Properties",
                            "itemListElement": [{
                                "@type": "LodgingBusiness",
                                "name": "Frost Pine Chalet",
                                "url": "https://timbrluxstays.com/property/1967238"
                            }]
                        }
                    })
                }}
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
