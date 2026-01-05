import React from 'react';
import './FeaturesSection.css';

// Feature icons as SVG components
const FeatureIcon = ({ type }) => {
    const icons = {
        wifi: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20h.01M8.53 16.11a6 6 0 016.95 0M5.64 12.74a10 10 0 0112.72 0M2.1 9.37a14 14 0 0119.8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        kitchen: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h18v18H3V3zM3 9h18M9 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        view: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        fireplace: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2c-3 4-6 7-6 11a6 6 0 0012 0c0-4-3-7-6-11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 19a3 3 0 003-3c0-2-3-4-3-4s-3 2-3 4a3 3 0 003 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        parking: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 17V7h4a3 3 0 010 6H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        pet: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="6" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="9" cy="5" r="1.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="15" cy="5" r="1.5" stroke="currentColor" strokeWidth="2" />
            </svg>
        )
    };

    return icons[type] || icons.wifi;
};

const FeatureCard = ({ icon, title, description }) => (
    <div
        className="feature-card"
        itemScope
        itemType="https://schema.org/Amenity"
    >
        <div className="feature-icon" aria-hidden="true">
            <FeatureIcon type={icon} />
        </div>
        <div className="feature-card-text">
            <h3 className="feature-card-title" itemProp="name">{title}</h3>
            <p className="feature-card-description" itemProp="description">{description}</p>
        </div>
    </div>
);

const FeaturesSection = ({
    label = "What We Offer",
    title = "Premium Amenities",
    features = []
}) => {
    // Default features
    const defaultFeatures = [
        {
            icon: 'wifi',
            title: 'High-Speed WiFi',
            description: 'Stay connected with blazing fast internet throughout the property.'
        },
        {
            icon: 'kitchen',
            title: 'Fully Equipped Kitchen',
            description: 'Cook your favorite meals with premium appliances and cookware.'
        },
        {
            icon: 'parking',
            title: 'Free Parking',
            description: 'Convenient and secure parking right at the property.'
        }
    ];

    const featureList = features.length > 0 ? features : defaultFeatures;

    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "amenityFeature": featureList.map(f => ({
            "@type": "LocationFeatureSpecification",
            "name": f.title,
            "value": true
        }))
    };

    return (
        <section
            className="features-section"
            aria-labelledby="features-title"
            itemScope
            itemType="https://schema.org/LodgingBusiness"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="features-container">
                {/* Header */}
                <div className="features-header">
                    <span className="features-label">{label}</span>
                    <h2 className="features-title" id="features-title">{title}</h2>
                </div>

                {/* Feature Grid */}
                <div className="features-grid" role="list" itemProp="amenityFeature">
                    {featureList.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
