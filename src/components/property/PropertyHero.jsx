import React from 'react';

const PropertyHero = ({ property, schemaData }) => {
    return (
        <section
            className="property-hero"
            aria-labelledby="property-title"
            itemScope
            itemType="https://schema.org/LodgingBusiness"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="property-hero-container">
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

                <div className="property-hero-media">
                    <div className="property-stats">
                        <div className="property-stat">
                            <span className="property-stat-label">Users Rating</span>
                            <div className="property-stat-value">
                                <span className="property-rating-star">★</span>
                                <span className="property-rating-score" itemProp="ratingValue">{property.rating}</span>
                                <span className="property-rating-reviews">| {property.reviews} Reviews</span>
                            </div>
                        </div>

                        <div className="property-stat">
                            <span className="property-stat-label">Location</span>
                            <span className="property-stat-value" itemProp="address">
                                {property.location}
                            </span>
                        </div>
                    </div>

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
    );
};

export default PropertyHero;
