import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './SearchPage.css';

const SearchPage = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
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
                <section className="search-hero">
                    <div className="container">
                        <h1 className="search-title">Search Results</h1>
                        <p className="search-subtitle">Available properties matching your dates</p>
                    </div>
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
