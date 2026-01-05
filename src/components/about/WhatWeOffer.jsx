import React from 'react';
import './WhatWeOffer.css';

const WhatWeOffer = () => {
    const offerings = [
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="#722F37" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            ),
            title: "Premium Property",
            description: "Our property is thoughtfully designed and maintained to exceed your expectations."
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44C35 44 44 35 44 24C44 13 35 4 24 4C13 4 4 13 4 24C4 35 13 44 24 44Z" stroke="#722F37" strokeWidth="2" />
                    <path d="M24 14V24L30 30" stroke="#722F37" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ),
            title: "24/7 Support",
            description: "We're always just a message away, ready to help whenever you need."
        },
        {
            icon: (
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20V36H36V20L24 8L12 20Z" stroke="#722F37" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M20 36V28H28V36" stroke="#722F37" strokeWidth="2" strokeLinejoin="round" />
                </svg>
            ),
            title: "Home Away From Home",
            description: "Every stay feels personal, comfortable, and genuinely welcoming."
        }
    ];

    return (
        <section className="what-we-offer-section" aria-labelledby="offer-title">
            <div className="offer-container">
                <div className="offer-header">
                    <span className="offer-label">WHAT WE OFFER</span>
                    <h2 id="offer-title" className="offer-title">
                        Whether you're here for adventure, celebration, or a peaceful reset
                    </h2>
                    <p className="offer-subtitle">
                        Our mission is simple: to create stays that feel unforgettable, effortless, and deeply comforting.
                    </p>
                </div>

                <div className="offer-grid">
                    {offerings.map((item, index) => (
                        <div className="offer-card" key={index}>
                            <div className="offer-icon">{item.icon}</div>
                            <h3 className="offer-card-title">{item.title}</h3>
                            <p className="offer-card-description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
