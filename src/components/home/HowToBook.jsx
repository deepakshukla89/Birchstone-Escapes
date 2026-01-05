import React from 'react';
import './HowToBook.css';

// Reusable BookingOption Card Component
const BookingOptionCard = ({
    label = "Book on",
    platform,
    link,
    isImageCard = false,
    imageSrc = null
}) => {
    if (isImageCard) {
        return (
            <div
                className="booking-option-card booking-option-image"
                style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : 'none' }}
                aria-hidden="true"
            />
        );
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="booking-option-card booking-option-cta"
            aria-label={`${label} ${platform}`}
            itemScope
            itemType="https://schema.org/BookAction"
        >
            <div className="booking-option-content">
                <span className="booking-option-label">{label}</span>
                <span className="booking-option-platform" itemProp="name">{platform}</span>
            </div>
            <span className="booking-option-arrow">→</span>
        </a>
    );
};

const HowToBook = ({
    title = "How to book your stay?"
}) => {
    // Images
    const b1 = `${process.env.PUBLIC_URL}/image/b1.png`;
    const b2 = `${process.env.PUBLIC_URL}/image/b2.png`;
    const b3 = `${process.env.PUBLIC_URL}/image/b3.png`;

    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingReservation",
        "reservationFor": {
            "@type": "LodgingBusiness",
            "name": "TimbrLux Stays"
        },
        "potentialAction": [
            { "@type": "BookAction", "target": "https://airbnb.com/timbrluxstays", "name": "Book on Airbnb" },
            { "@type": "BookAction", "target": "https://vrbo.com/timbrluxstays", "name": "Book on VRBO" },
            { "@type": "BookAction", "target": "/booking", "name": "Book on Website" }
        ]
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
                {/* Title */}
                <h2 className="how-to-book-title" id="how-to-book-title">
                    {title}
                </h2>

                {/* Desktop: 3 rows with 2 columns each */}
                {/* Mobile: Each row becomes image + text stacked */}
                <div className="how-to-book-grid" role="list">
                    {/* Row 1: b2 image | Airbnb */}
                    <div className="how-to-book-row how-to-book-row-1">
                        <BookingOptionCard isImageCard imageSrc={b2} />
                        <BookingOptionCard label="Book on" platform="Airbnb" link="https://airbnb.com/timbrluxstays" />
                    </div>

                    {/* Row 2: VRBO | b1 image */}
                    <div className="how-to-book-row how-to-book-row-2">
                        <BookingOptionCard label="Book on" platform="VRBO" link="https://vrbo.com/timbrluxstays" />
                        <BookingOptionCard isImageCard imageSrc={b1} />
                    </div>

                    {/* Row 3: b3 image | Website */}
                    <div className="how-to-book-row how-to-book-row-3">
                        <BookingOptionCard isImageCard imageSrc={b3} />
                        <BookingOptionCard label="Book direct & save" platform="Website" link="/booking" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { BookingOptionCard };
export default HowToBook;
