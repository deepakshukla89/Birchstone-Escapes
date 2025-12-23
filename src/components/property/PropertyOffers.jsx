import React from 'react';

const PropertyOffers = ({ offersRows }) => {
    return (
        <section
            className="property-offers"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/pdOffer.png)` }}
            aria-labelledby="offers-title"
        >
            <div className="property-offers-overlay" />
            <div className="property-offers-content">
                <h2 className="property-offers-title" id="offers-title">What this place offers</h2>

                <div className="property-offers-grid">
                    {offersRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={`property-offers-row ${rowIndex === offersRows.length - 1 ? 'property-offers-row-last' : ''}`}
                        >
                            <div className="property-offers-row-inner">
                                {row.map((item, itemIndex) => (
                                    <div key={`first-${itemIndex}`} className="property-offer-item">
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                            {item.icon}
                                        </svg>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="property-offers-row-inner" aria-hidden="true">
                                {row.map((item, itemIndex) => (
                                    <div key={`second-${itemIndex}`} className="property-offer-item">
                                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                                            {item.icon}
                                        </svg>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyOffers;
