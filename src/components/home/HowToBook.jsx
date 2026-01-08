import React from 'react';
import './HowToBook.css';

const HowToBook = () => {
    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingReservation",
        "reservationFor": {
            "@type": "LodgingBusiness",
            "name": "TimbrLux Stays"
        },
        "potentialAction": {
            "@type": "BookAction",
            "target": "/booking",
            "name": "Book Directly"
        }
    };

    return (
        <section
            className="how-to-book"
            aria-labelledby="how-to-book-title"
            itemScope
            itemType="https://schema.org/WebPageElement"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/homeBookImageBg.png)` }}
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* Background Overlay */}
            <div className="how-to-book-overlay" aria-hidden="true" />

            <div className="how-to-book-container">
                <span className="how-to-book-label">The Best Way to Stay</span>

                <h2 className="how-to-book-title" id="how-to-book-title">
                    Book Direct & Save
                </h2>

                <p className="how-to-book-description">
                    Experience the most seamless way to plan your getaway.
                    Enjoy exclusive rates, personalized service, and no hidden booking fees when you reserve directly with us.
                </p>

                {/* Benefits Icons */}
                <div className="book-direct-benefits">
                    <div className="benefit-item">
                        <div className="benefit-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <span className="benefit-text">Best Rate Guaranteed</span>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="benefit-text">Secure Booking</span>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                            </svg>
                        </div>
                        <span className="benefit-text">No Service Fees</span>
                    </div>
                </div>

                {/* Main CTA */}
                <a
                    href="/booking"
                    className="btn-book-direct"
                    aria-label="Book your stay directly"
                >
                    Check Availability <span>→</span>
                </a>
            </div>
        </section>
    );
};


export default HowToBook;
