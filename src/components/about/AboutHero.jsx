import React from 'react';
import './AboutHero.css';

const AboutHero = () => {
    return (
        <section className="about-hero" aria-labelledby="about-hero-title">
            <div className="about-hero-bg-elements" aria-hidden="true">
                <img
                    src="/logo.svg"
                    alt=""
                    className="hero-bg-icon icon-1"
                />
                <img
                    src="/logo.svg"
                    alt=""
                    className="hero-bg-icon icon-2"
                />
            </div>
            <div className="about-hero-container">
                <span className="about-hero-label">ABOUT US</span>
                <h1 id="about-hero-title" className="about-hero-title">
                    Birchstone Escapes
                </h1>
                <p className="about-hero-description">
                    At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. A sense of calm the moment you walk in. A space that feels intentionally designed yet effortlessly comfortable. A home where every detail has been considered so you can simply arrive, breathe, and enjoy.
                </p>
            </div>
        </section>
    );
};

export default AboutHero;
