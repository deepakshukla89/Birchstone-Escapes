import React from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './TermsConditions.css';

const TermsConditions = () => {
    // Schema.org structured data for SEO
    const termsSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms & Conditions - Timbrlux Stays",
        "description": "Terms & Conditions and House Rules for Timbrlux Stays vacation rentals.",
        "url": "https://timbrluxstays.com/terms",
        "publisher": {
            "@type": "LodgingBusiness",
            "name": "Timbrlux Stays"
        }
    };

    return (
        <>
            <SEOMetaTags
                title="Terms & Conditions | Timbrlux Stays"
                description="Terms & Conditions and House Rules for Timbrlux Stays. Read our booking policies, cancellation terms, and house rules."
                url="https://timbrluxstays.com/terms"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
            />

            <main className="legal-page">
                {/* Hero Section */}
                <section className="legal-hero" aria-labelledby="terms-hero-title">
                    <div className="legal-hero-container">
                        <span className="legal-hero-label">LEGAL</span>
                        <h1 id="terms-hero-title" className="legal-hero-title">
                            Terms &amp; Conditions
                        </h1>
                        <p className="legal-hero-subtitle">
                            &amp; House Rules – Timbrlux Stays
                        </p>
                        <p className="legal-hero-effective">
                            Effective Date: December 30, 2025
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="legal-content-section" aria-label="Terms and Conditions Content">
                    <div className="legal-content-container">
                        <article className="legal-content-card">
                            <p className="legal-paragraph">
                                By booking directly with Timbrlux Stays, you agree to the following Terms &amp; Conditions and House Rules. Reservations are confirmed once payment is received and a confirmation email is issued. The minimum booking age is 25, and valid identification may be required. The guest who makes the booking must be one of the guests staying at the property.
                            </p>

                            <p className="legal-paragraph">
                                All guests must complete online check­in through our secure Happy Guest platform. This process includes signing the rental agreement, verifying identification, and choosing either a $1000 security hold (a pending transaction, not a traditional deposit) or an optional non­refundable damage waiver that covers accidental damage up to the limit defined by the third­party insurance policy. Guests must also provide the names of all individuals staying at the property.
                            </p>

                            <p className="legal-paragraph">
                                Cancellation policies are shown at checkout and in your confirmation email. Refunds, when applicable, are processed to the original payment method, but no­shows or early departures are non­refundable. Standard check­in and checkout times are listed in your confirmation, and early check­in or late checkout may be available for an additional fee. Access details will be provided shortly before arrival and must not be shared with anyone who is not a registered guest.
                            </p>

                            <p className="legal-paragraph">
                                Guests are expected to follow the house rules during their stay. Smoking or vaping inside the property is prohibited. Parties, unauthorized events, illegal activity, and pets are not allowed. Only registered guests may stay overnight, and for safety and insurance reasons, the fireplace may not be used. Quiet hours are observed between 10 PM and 8 AM. Guests are responsible for any damages beyond normal wear and tear, and violations of these rules may result in termination of the stay without refund.
                            </p>

                            <p className="legal-paragraph">
                                Guests stay at and use the property at their own risk. Timbrlux Stays is not liable for accidents, injuries, theft, or loss of personal belongings. We strongly recommend purchasing travel insurance to cover unforeseen events.
                            </p>

                            <p className="legal-paragraph">
                                By booking, you consent to our <Link to="/privacy" className="legal-inline-link">Timbrlux Stays Privacy Policy</Link>. With your consent, we may send updates or offers via email or SMS, and you may unsubscribe at any time using the links provided in emails or by replying STOP to text messages.
                            </p>

                            <p className="legal-paragraph">
                                These Terms are governed by the laws of the State of Maine, USA, and any disputes will be resolved under the jurisdiction of the courts located in Oxford County, Maine. By completing a booking, you acknowledge and agree to these Terms &amp; Conditions and House Rules.
                            </p>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
};

export default TermsConditions;
