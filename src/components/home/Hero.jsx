import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({
    title = "TimbrLux Stays",
    tagline = "The best home experience, blending comfort, style, and serene settings.",
    ctaText = "Plan your escape!",
    ctaLink = "/booking",
    backgroundImage = null
}) => {
    // Schema.org structured data for LodgingBusiness
    const heroSchema = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": title,
        "description": tagline,
        "url": "https://timbrluxstays.com",
        "priceRange": "$$$",
        "@id": "https://timbrluxstays.com/#organization"
    };

    const bgImage = backgroundImage || `${process.env.PUBLIC_URL}/image/homeHeroBg.png`;

    return (
        <section
            className="hero"
            role="banner"
            aria-label="Hero section"
            itemScope
            itemType="https://schema.org/LodgingBusiness"
        >
            {/* Background Video - LCP Element */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={bgImage}
                className="hero-video"
                fetchpriority="high"
            >
                <source src={`${process.env.PUBLIC_URL}/hero_bg_video.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
            />

            {/* Dark Overlay */}
            <div className="hero-overlay" aria-hidden="true" />

            {/* Content */}
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title" itemProp="name">
                        {title}
                    </h1>
                    <p className="hero-tagline" itemProp="description">
                        {tagline}
                    </p>
                </div>

                <Link
                    to={ctaLink}
                    className="hero-cta"
                    aria-label={ctaText}
                    itemProp="potentialAction"
                    itemScope
                    itemType="https://schema.org/ReserveAction"
                >
                    <span itemProp="name">{ctaText}</span>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
