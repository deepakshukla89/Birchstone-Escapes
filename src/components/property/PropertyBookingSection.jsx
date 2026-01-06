import React from 'react';
import './PropertyBookingSection.css';

const PropertyBookingSection = ({ onBookNow, propertyName }) => {
    return (
        <section className="property-booking-action-section">
            <div className="booking-action-container">
                <div className="booking-action-content">
                    <div className="booking-action-text">
                        <span className="booking-tagline">EXPERIENCE LUXURY</span>
                        <h2 className="booking-action-title">Ready to stay at {propertyName}?</h2>
                        <p className="booking-action-description">
                            Join us for an unforgettable retreat where mountain serenity meets modern comfort.
                            Secure your dates today and start planning your perfect getaway.
                        </p>
                    </div>
                    <div className="booking-action-controls">
                        <button onClick={onBookNow} className="booking-action-btn-primary">
                            BOOK YOUR STAY NOW
                        </button>
                        <div className="booking-guarantee">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Secure Booking Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="booking-action-bg-glow"></div>
        </section>
    );
};

export default PropertyBookingSection;
