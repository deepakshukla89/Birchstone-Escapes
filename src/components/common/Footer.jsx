import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Structured data for Organization (SEO/AEO/GEO)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        "name": "TimbrLux Stays",
        "description": "Your cozy mountain retreat awaits. Book direct and save.",
        "url": "https://timbrluxstays.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Newry",
            "addressRegion": "Maine",
            "addressCountry": "United States"
        },
        "sameAs": [
            "https://instagram.com/timbrluxstays",
            "https://facebook.com/timbrluxstays"
        ]
    };

    return (
        <footer
            className="footer"
            role="contentinfo"
            itemScope
            itemType="https://schema.org/WPFooter"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand" itemScope itemType="https://schema.org/Organization">
                    <h2 className="footer-logo" itemProp="name">
                        TimbrLux Stays
                    </h2>
                    <p className="footer-description" itemProp="description">
                        Your cozy mountain retreat awaits. Book direct and save.
                    </p>
                </div>

                {/* Divider Line */}
                <hr className="footer-divider" aria-hidden="true" />

                {/* Desktop Footer Columns */}
                <div className="footer-columns footer-columns-desktop">
                    {/* Location Column */}
                    <div
                        className="footer-column"
                        itemScope
                        itemType="https://schema.org/Place"
                    >
                        <h3 className="footer-column-title">Location</h3>
                        <address
                            className="footer-column-content"
                            itemProp="address"
                            itemScope
                            itemType="https://schema.org/PostalAddress"
                        >
                            <span itemProp="description">Entire home in </span>
                            <span itemProp="addressLocality">Newry</span>,
                            <span itemProp="addressRegion"> Maine</span>,
                            <span itemProp="addressCountry"> United States</span>
                        </address>
                    </div>

                    {/* Vertical Divider */}
                    <div className="footer-vertical-divider" aria-hidden="true"></div>

                    {/* Quick Links Column */}
                    <nav
                        className="footer-column"
                        aria-label="Footer navigation"
                        itemScope
                        itemType="https://schema.org/SiteNavigationElement"
                    >
                        <h3 className="footer-column-title">Quick links</h3>
                        <ul className="footer-column-content footer-links">
                            <li><Link to="/" itemProp="url"><span itemProp="name">Home</span></Link></li>
                            <li><Link to="/about" itemProp="url"><span itemProp="name">About Us</span></Link></li>
                            <li><Link to="/properties" itemProp="url"><span itemProp="name">Our Homes</span></Link></li>
                        </ul>
                    </nav>

                    {/* Vertical Divider */}
                    <div className="footer-vertical-divider" aria-hidden="true"></div>

                    {/* Social Links Column */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">Follow us</h3>
                        <ul className="footer-column-content footer-links footer-social">
                            <li><a href="https://instagram.com/timbrluxstays" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">Instagram</a></li>
                            <li><a href="https://facebook.com/timbrluxstays" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">Facebook</a></li>
                        </ul>
                    </div>
                </div>

                {/* Mobile Footer Columns - Different Structure */}
                <div className="footer-columns footer-columns-mobile">
                    {/* Location */}
                    <div className="footer-column">
                        <h3 className="footer-column-title">Location</h3>
                        <address className="footer-column-content">
                            Entire home in Newry, Maine, United States
                        </address>
                    </div>

                    {/* Quick Links + Follow Us Row */}
                    <div className="footer-mobile-row">
                        <nav className="footer-column" aria-label="Footer navigation mobile">
                            <h3 className="footer-column-title">Quick links</h3>
                            <ul className="footer-column-content footer-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/properties">Our Homes</Link></li>
                            </ul>
                        </nav>

                        <div className="footer-column">
                            <h3 className="footer-column-title">Follow us</h3>
                            <ul className="footer-column-content footer-links">
                                <li><a href="https://instagram.com/timbrluxstays" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                                <li><a href="https://facebook.com/timbrluxstays" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="footer-divider" aria-hidden="true" />

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        <small>Copyright {currentYear} TimbrLux Stays</small>
                    </p>

                    <nav className="footer-legal" aria-label="Legal links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <span aria-hidden="true">|</span>
                        <Link to="/terms">Terms & Condition</Link>
                    </nav>

                    <p className="footer-credits">
                        <small>Design and Develop by Team DS</small>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
