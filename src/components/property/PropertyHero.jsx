import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryModal from './GalleryModal';

const PropertyHero = ({ property, images = [], isLoading = false, error = null, onReload, schemaData, onBookNow }) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const handleOpenGallery = () => {
        if (!isLoading && !error && images.length > 0) {
            setIsGalleryOpen(true);
        }
    };

    const handleCloseGallery = () => setIsGalleryOpen(false);

    // Render Collage Content based on state
    const renderCollage = () => {
        if (error) {
            return (
                <div className="property-hero-error">
                    <p>Failed to load images</p>
                    <button onClick={onReload} className="property-hero-reload-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                        </svg>
                        Reload Now
                    </button>
                </div>
            );
        }

        if (isLoading) {
            return (
                <div className="property-hero-collage skeleton-collage">
                    <div className="collage-main skeleton-shimmer"></div>
                    <div className="collage-side">
                        <div className="collage-column">
                            <div className="collage-item skeleton-shimmer"></div>
                            <div className="collage-item skeleton-shimmer"></div>
                        </div>
                        <div className="collage-column">
                            <div className="collage-item skeleton-shimmer"></div>
                            <div className="collage-item skeleton-shimmer"></div>
                        </div>
                    </div>
                </div>
            );
        }

        if (images.length > 0) {
            return (
                <div className="property-hero-collage">
                    <div className="collage-main" onClick={handleOpenGallery}>
                        <img src={images[0].url} alt={property.name} itemProp="image" />
                    </div>
                    <div className="collage-side">
                        <div className="collage-column">
                            <div className="collage-item" onClick={handleOpenGallery}>
                                <img src={images[1]?.url || images[0].url} alt={`${property.name} - Interior View`} loading="lazy" />
                            </div>
                            <div className="collage-item" onClick={handleOpenGallery}>
                                <img src={images[2]?.url || images[0].url} alt={`${property.name} - Living Space`} loading="lazy" />
                            </div>
                        </div>
                        <div className="collage-column">
                            <div className="collage-item" onClick={handleOpenGallery}>
                                <img src={images[3]?.url || images[0].url} alt={`${property.name} - Amenities`} loading="lazy" />
                            </div>
                            <div className="collage-item" onClick={handleOpenGallery} style={{ position: 'relative' }}>
                                <img src={images[4]?.url || images[0].url} alt={`${property.name} - Exterior View`} loading="lazy" />
                                {images.length > 5 && (
                                    <button className="show-all-photos-btn" onClick={(e) => { e.stopPropagation(); handleOpenGallery(); }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <span className="btn-text">Show all photos</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Final fallback if no images but no error and no longer loading
        return (
            <div
                className="property-hero-image"
                style={{ backgroundImage: `url(${property.image})` }}
                role="img"
                aria-label={property.name}
                itemProp="image"
                onClick={handleOpenGallery}
            />
        );
    };

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
                    {onBookNow ? (
                        <button
                            onClick={onBookNow}
                            className="property-hero-cta"
                        >
                            Book My Stay!
                        </button>
                    ) : (
                        property.bookingLink.startsWith('http') ? (
                            <a
                                href={property.bookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="property-hero-cta"
                            >
                                Book My Stay!
                            </a>
                        ) : (
                            <Link
                                to={property.bookingLink}
                                className="property-hero-cta"
                            >
                                Book My Stay!
                            </Link>
                        )
                    )}
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

                    <div className="property-hero-collage-wrapper">
                        {renderCollage()}
                    </div>
                </div>
            </div>

            <GalleryModal
                isOpen={isGalleryOpen}
                onClose={handleCloseGallery}
                images={images.length > 0 ? images : [{ url: property.image }]}
                propertyName={property.name}
            />
        </section>
    );
};

export default PropertyHero;
