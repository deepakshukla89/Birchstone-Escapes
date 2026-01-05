import React from 'react';
import { Link } from 'react-router-dom';
import './AccommodationsSection.css';

const AccommodationsSection = ({
    label = "Accommodations",
    title = "The Chalet",
    property = null
}) => {
    // Default property
    const defaultProperty = {
        name: "Frost Pine Chalet",
        location: "Entire home in Newry, Maine, United States",
        image: `${process.env.PUBLIC_URL}/image/Frost-Pine-Chalet.png`,
        link: "/property/frost-pine-chalet"
    };

    const propertyData = property || defaultProperty;

    // Schema.org structured data for Accommodation
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": propertyData.name,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Newry",
            "addressRegion": "Maine",
            "addressCountry": "United States"
        },
        "image": propertyData.image,
        "url": propertyData.link
    };

    return (
        <section
            className="accommodations-section"
            aria-labelledby="accommodations-title"
            itemScope
            itemType="https://schema.org/LodgingBusiness"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="accommodations-container">
                {/* Header */}
                <div className="accommodations-header">
                    <div className="accommodations-text">
                        <span className="accommodations-label">{label}</span>
                        <h2 className="accommodations-title" id="accommodations-title">
                            {title}
                        </h2>
                    </div>
                    <div className="accommodations-divider" aria-hidden="true" />
                </div>

                {/* Property Card */}
                <div className="accommodations-property">
                    {/* Background Image */}
                    <div
                        className="property-image"
                        style={{ backgroundImage: `url(${propertyData.image})` }}
                        role="img"
                        aria-label={propertyData.name}
                        itemProp="image"
                    />

                    {/* Gradient Overlay */}
                    <div className="property-overlay" aria-hidden="true" />

                    {/* Content */}
                    <div className="property-content">
                        <div className="property-info">
                            <h3 className="property-name" itemProp="name">
                                {propertyData.name}
                            </h3>
                            <p className="property-location" itemProp="address">
                                {propertyData.location}
                            </p>
                        </div>

                        <Link
                            to={propertyData.link}
                            className="property-link"
                            aria-label={`View ${propertyData.name}`}
                        >
                            <span>View Property</span>
                            <span className="property-link-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccommodationsSection;
