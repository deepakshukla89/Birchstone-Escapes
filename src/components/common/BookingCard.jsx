import React from 'react';
import { Link } from 'react-router-dom';
import './BookingCard.css';

const BookingCard = ({ onBookNow }) => {
    return (
        <section
            className="booking-card"
            aria-label="Book your stay"
            itemScope
            itemType="https://schema.org/Product"
        >
            <div className="booking-card-container">
                {/* Award Badge Section */}
                <div
                    className="booking-card-badge"
                    itemScope
                    itemType="https://schema.org/AggregateRating"
                >
                    <div className="badge-rating">
                        <img
                            src="/image/award.png"
                            alt="Award laurel left"
                            className="badge-laurel badge-laurel-left"
                            loading="lazy"
                        />
                        <span
                            className="badge-score"
                            itemProp="ratingValue"
                        >
                            5.0
                        </span>
                        <img
                            src="/image/award.png"
                            alt="Award laurel right"
                            className="badge-laurel badge-laurel-right"
                            loading="lazy"
                        />
                    </div>
                    <p className="badge-title" itemProp="description">Guest favourite</p>
                    <meta itemProp="bestRating" content="5" />
                    <meta itemProp="worstRating" content="1" />
                </div>

                {/* CTA Section */}
                <div className="booking-card-cta">
                    <h2 className="booking-card-heading" itemProp="name">
                        Ready to book your family getaway!
                    </h2>
                    {onBookNow ? (
                        <button
                            onClick={onBookNow}
                            className="booking-card-btn"
                            aria-label="Book your vacation stay now"
                        >
                            BOOK MY STAY!
                        </button>
                    ) : (
                        <Link
                            to="/booking"
                            className="booking-card-btn"
                            aria-label="Book your vacation stay now"
                        >
                            BOOK MY STAY!
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BookingCard;
