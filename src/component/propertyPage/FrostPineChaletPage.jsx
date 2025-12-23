import React from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '../common/SEOMetaTags';
import './FrostPineChaletPage.css';

const FrostPineChaletPage = () => {
    // Property data
    const property = {
        name: "Frost Pine Chalet",
        tagline: "where contemporary comfort meets mountain serenity.",
        description: `This thoughtfully designed retreat invites you to slow down and breathe deeply. Wake to misty mornings framed by pines, unwind by the crackling fire, soak under starry skies in the private hot tub. With panoramic windows, cozy corners, and modern amenities, every detail is designed for genuine rest and connection. 
        Perfect for families, couples, or friends seeking an authentic mountain escape—away from screens, closer to nature, and completely yours.`,
        rating: 5.0,
        reviews: 9,
        location: "Entire home in Newry, Maine",
        image: `${process.env.PUBLIC_URL}/image/pd1.png`,
        bookingLink: "https://airbnb.com/birchstoneescapes"
    };

    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": property.name,
        "description": property.description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Newry",
            "addressRegion": "Maine",
            "addressCountry": "United States"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": property.rating,
            "reviewCount": property.reviews
        },
        "image": property.image
    };

    return (
        <>
            <SEOMetaTags
                title={`${property.name} | Birchstone Escapes`}
                description={property.description}
                url={`https://birchstoneescapes.com/property/frost-pine-chalet`}
            />

            <main className="property-page">
                {/* Hero Section */}
                <section
                    className="property-hero"
                    aria-labelledby="property-title"
                    itemScope
                    itemType="https://schema.org/LodgingBusiness"
                >
                    {/* Schema.org JSON-LD */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                    />

                    <div className="property-hero-container">
                        {/* Left: Text Content */}
                        <div className="property-hero-text">
                            <div className="property-hero-text-inner">
                                <h1 className="property-hero-title" id="property-title" itemProp="name">
                                    {property.name}
                                </h1>
                                <p className="property-hero-description" itemProp="description">
                                    <span className="property-tagline">—{property.tagline}</span>
                                    {'\n\n'}
                                    {property.description}
                                </p>
                            </div>
                            <a
                                href={property.bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="property-hero-cta"
                            >
                                Book My Stay!
                            </a>
                        </div>

                        {/* Right: Stats & Image */}
                        <div className="property-hero-media">
                            {/* Stats Row */}
                            <div className="property-stats">
                                {/* Rating */}
                                <div className="property-stat">
                                    <span className="property-stat-label">Users Rating</span>
                                    <div className="property-stat-value">
                                        <span className="property-rating-star">★</span>
                                        <span className="property-rating-score" itemProp="ratingValue">{property.rating}</span>
                                        <span className="property-rating-reviews">| {property.reviews} Reviews</span>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="property-stat">
                                    <span className="property-stat-label">Location</span>
                                    <span className="property-stat-value" itemProp="address">
                                        {property.location}
                                    </span>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div
                                className="property-hero-image"
                                style={{ backgroundImage: `url(${property.image})` }}
                                role="img"
                                aria-label={property.name}
                                itemProp="image"
                            />
                        </div>
                    </div>
                </section>

                {/* More sections will be added here */}
            </main>
        </>
    );
};

export default FrostPineChaletPage;
