import React from 'react';
import './OurPhilosophy.css';

const OurPhilosophy = () => {
    return (
        <section className="philosophy-section" aria-labelledby="philosophy-title">
            <div className="philosophy-container">
                {/* Left - Large Quote */}
                <div className="philosophy-quote-wrapper">
                    <span className="philosophy-quote-mark">"</span>
                    <blockquote className="philosophy-quote">
                        TimbrLux Stays was created with a simple vision: a beautifully designed property, cared for with intention, and hosted with genuine warmth.
                    </blockquote>
                </div>

                {/* Right - Values */}
                <div className="philosophy-values">
                    <div className="philosophy-value">
                        <span className="value-number">01</span>
                        <h3 className="value-title">Intentional Design</h3>
                        <p className="value-description">
                            Every space is thoughtfully curated to feel both beautiful and effortlessly functional.
                        </p>
                    </div>
                    <div className="philosophy-value">
                        <span className="value-number">02</span>
                        <h3 className="value-title">Genuine Care</h3>
                        <p className="value-description">
                            Every corner of this home is cared for as our own, with thoughtful touches and detail in every stay.
                        </p>
                    </div>
                    <div className="philosophy-value">
                        <span className="value-number">03</span>
                        <h3 className="value-title">Warm Hospitality</h3>
                        <p className="value-description">
                            From booking to checkout, we're here to make your stay seamless and memorable.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPhilosophy;
