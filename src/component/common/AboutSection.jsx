import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = ({
    label = "About Us",
    title = "Birchstone Escapes",
    shortDescription = "At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. A sense of calm the moment you walk in. A space that feels intentionally designed yet effortlessly comfortable.",
    fullDescription = `At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. A sense of calm the moment you walk in. A space that feels intentionally designed yet effortlessly comfortable. A home where every detail has been considered so you can simply arrive, breathe, and enjoy.

Birchstone Escapes was created with a simple vision: beautifully designed home, cared for with intention, and hosted with genuine warmth.

Whether you're here for adventure, celebration, or a peaceful reset, our mission is simple: to create stays that feel unforgettable, effortless, and deeply comforting.

We're honored to be part of your travel story — and we can't wait to welcome you.`,
    stats = []
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Default stats
    const defaultStats = [
        { number: "5.0", label: "Guest Rating" },
        { number: "100+", label: "Happy Stays" },
        { number: "24/7", label: "Support" }
    ];

    const statsList = stats.length > 0 ? stats : defaultStats;

    // Schema.org structured data
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "LodgingBusiness",
            "name": "Birchstone Escapes",
            "description": fullDescription,
            "url": "https://birchstoneescapes.com",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "100"
            }
        }
    };

    return (
        <section
            className="about-section"
            aria-labelledby="about-title"
            itemScope
            itemType="https://schema.org/AboutPage"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />

            <div className="about-container">
                {/* Left: Bento Grid */}
                <div className="about-bento">
                    <div className="bento-item bento-main">
                        <div
                            className="bento-image"
                            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/homeHeroBg.png)` }}
                            role="img"
                            aria-label="Vacation home exterior"
                        />
                    </div>
                    <div className="bento-item bento-accent">
                        <span className="bento-accent-text">"</span>
                    </div>
                    <div className="bento-item bento-quote">
                        <p>Where every stay becomes a cherished memory</p>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="about-content">
                    <div className="about-header">
                        <span className="about-label">{label}</span>
                        <h2 className="about-title" id="about-title" itemProp="headline">
                            {title}
                        </h2>
                    </div>

                    <div className="about-description-wrapper">
                        <p className={`about-description ${isExpanded ? 'expanded' : ''}`} itemProp="description">
                            {isExpanded ? fullDescription : shortDescription}
                        </p>

                        <button
                            className="about-read-more"
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
                        >
                            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                            <span className="about-read-more-arrow">{isExpanded ? '↑' : '→'}</span>
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="about-stats">
                        {statsList.map((stat, index) => (
                            <div key={index} className="about-stat">
                                <span className="about-stat-number">{stat.number}</span>
                                <span className="about-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Decorative Line */}
                    <div className="about-line" aria-hidden="true">
                        <span className="about-line-bar" />
                        <span className="about-line-text">Est. 2024</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
