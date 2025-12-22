import React from 'react';
import './HowToBook.css';

// Reusable BookingOption Card Component
const BookingOptionCard = ({
    label = "Book on",
    platform,
    link,
    isImageCard = false,
    imageSrc = null,
    order = 0
}) => {
    if (isImageCard) {
        return (
            <div
                className="booking-option-card booking-option-image"
                style={{
                    backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
                    order: order
                }}
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
            style={{ order: order }}
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
    title = "How to book your stay?",
    bookingOptions = []
}) => {
    // Default booking options - order for mobile: image first, then text
    const defaultOptions = [
        { isImageCard: true, imageSrc: `${process.env.PUBLIC_URL}/image/b1.png`, mobileOrder: 1 },
        { label: 'Book on', platform: 'Airbnb', link: 'https://airbnb.com/birchstoneescapes', mobileOrder: 2 },
        { label: 'Book on', platform: 'VRBO', link: 'https://vrbo.com/birchstoneescapes', mobileOrder: 4 },
        { isImageCard: true, imageSrc: `${process.env.PUBLIC_URL}/image/b2.png`, mobileOrder: 3 },
        { isImageCard: true, imageSrc: `${process.env.PUBLIC_URL}/image/b3.png`, mobileOrder: 5 },
        { label: 'Book direct & Save(15%)', platform: 'Website', link: '/booking', mobileOrder: 6 }
    ];

    const options = bookingOptions.length > 0 ? bookingOptions : defaultOptions;

    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingReservation",
        "reservationFor": {
            "@type": "LodgingBusiness",
            "name": "Birchstone Escapes"
        },
        "potentialAction": options
            .filter(opt => !opt.isImageCard)
            .map(opt => ({
                "@type": "BookAction",
                "target": opt.link,
                "name": `Book on ${opt.platform}`
            }))
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

                {/* Booking Grid */}
                <div className="how-to-book-grid" role="list">
                    {options.map((option, index) => (
                        <BookingOptionCard key={index} {...option} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { BookingOptionCard };
export default HowToBook;
