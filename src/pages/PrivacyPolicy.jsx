import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    // Schema.org structured data for SEO
    const privacySchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy - Timbrlux Stays",
        "description": "Privacy Policy for Timbrlux Stays vacation rentals.",
        "url": "https://timbrluxstays.com/privacy",
        "publisher": {
            "@type": "LodgingBusiness",
            "name": "Timbrlux Stays"
        }
    };

    return (
        <>
            <SEOMetaTags
                title="Privacy Policy | Timbrlux Stays"
                description="Privacy Policy for Timbrlux Stays. Learn how we collect, use, and protect your personal information."
                url="https://timbrluxstays.com/privacy"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
            />

            <main className="legal-page">
                {/* Hero Section */}
                <section className="legal-hero" aria-labelledby="legal-hero-title">
                    <div className="legal-hero-container">
                        <span className="legal-hero-label">LEGAL</span>
                        <h1 id="legal-hero-title" className="legal-hero-title">
                            Privacy Policy
                        </h1>
                        <p className="legal-hero-effective">
                            Effective December 30, 2025
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="legal-content-section" aria-label="Privacy Policy Content">
                    <div className="legal-content-container">
                        <article className="legal-content-card">
                            <p className="legal-paragraph">
                                At Timbrlux Stays, we respect your privacy. When you book directly, we collect basic details (name, email, phone, payment info, stay dates, guest count) and technical data (IP, cookies). This information is used to process reservations, send confirmations, provide support, and, with your consent, share updates or offers.
                            </p>

                            <p className="legal-paragraph">
                                By opting in, you agree to receive updates and special offers via email or SMS; you may unsubscribe anytime via email links or by replying STOP to texts (standard carrier rates may apply).
                            </p>

                            <p className="legal-paragraph">
                                We never sell your data. It may be shared only with trusted providers such as payment processors or communication platforms. We use industry­standard security, though no system is 100% secure. Depending on your location, you may have rights to access, correct, or delete your data, and opt out of marketing.
                            </p>

                            <p className="legal-paragraph">
                                Our site uses cookies, which you can disable in your browser. Services are not directed to children under 18. International users should note data may be transferred to the US.
                            </p>

                            <p className="legal-paragraph">
                                By booking, you consent to this policy. Updates will be posted with a new effective date.
                            </p>

                            {/* Contact Section */}
                            <div className="legal-contact">
                                <h3 className="legal-contact-title">Contact</h3>
                                <div className="legal-contact-info">
                                    <a href="mailto:vikas@timbrluxstays.com" className="legal-contact-link">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        vikas@timbrluxstays.com
                                    </a>
                                    <a href="tel:+12065588542" className="legal-contact-link">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        +1 (206) 558­8542
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
};

export default PrivacyPolicy;
