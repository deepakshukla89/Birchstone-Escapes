import React from 'react';

const PropertyHighlights = () => {
    return (
        <section className="property-highlights" aria-label="Property Highlights">
            <div className="property-highlights-container">
                <div className="property-highlights-list" role="list">
                    <div className="property-highlight-item" role="listitem" itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                        <img
                            src={`${process.env.PUBLIC_URL}/image/icons/SpeakeasyLounge.svg`}
                            alt="Speakeasy Lounge"
                            className="property-highlight-icon"
                            width="60"
                            height="60"
                        />
                        <span className="property-highlight-label" itemProp="name">Speakeasy Lounge</span>
                    </div>

                    <div className="property-highlight-item" role="listitem" itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                        <img
                            src={`${process.env.PUBLIC_URL}/image/icons/bbq.svg`}
                            alt="BBQ Grill & Fire Pit"
                            className="property-highlight-icon"
                            width="60"
                            height="60"
                        />
                        <span className="property-highlight-label" itemProp="name">BBQ Grill & Fire Pit</span>
                    </div>

                    <div className="property-highlight-item" role="listitem" itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                        <img
                            src={`${process.env.PUBLIC_URL}/image/icons/mountain.svg`}
                            alt="Mountain Views"
                            className="property-highlight-icon"
                            width="60"
                            height="60"
                        />
                        <span className="property-highlight-label" itemProp="name">Mountain Views</span>
                    </div>

                    <div className="property-highlight-item" role="listitem" itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                        <img
                            src={`${process.env.PUBLIC_URL}/image/icons/game.svg`}
                            alt="Game Room"
                            className="property-highlight-icon"
                            width="60"
                            height="60"
                        />
                        <span className="property-highlight-label" itemProp="name">Game Room</span>
                    </div>

                    <div className="property-highlight-item" role="listitem" itemProp="amenityFeature" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                        <img
                            src={`${process.env.PUBLIC_URL}/image/icons/river.svg`}
                            alt="Sunday River Resort"
                            className="property-highlight-icon"
                            width="60"
                            height="60"
                        />
                        <span className="property-highlight-label" itemProp="name">Sunday River Resort</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyHighlights;
