import React from 'react';
import './OurPromise.css';

const OurPromise = () => {
    return (
        <section className="our-promise-section" aria-labelledby="promise-title">
            <div className="promise-container">
                <div className="promise-content">
                    <span className="promise-label">A MESSAGE FROM US</span>
                    <h2 id="promise-title" className="promise-title">
                        We're honored to be part of your travel story
                    </h2>
                    <p className="promise-text">
                        — and we can't wait to welcome you.
                    </p>
                    <div className="promise-signature">
                        <span className="signature-line"></span>
                        <span className="signature-text">The TimbrLux Family</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPromise;
