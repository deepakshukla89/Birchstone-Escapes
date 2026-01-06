import React, { useState } from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import { submitContactForm } from '../services/api';
import './Contact.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dates: '',
        message: '',
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true; // Phone is optional
        // Accepts formats like: +1 (555) 123-4567, 555-123-4567, 5551234567, etc.
        const phoneRegex = /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.phone && !validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setStatus({ type: 'success', message: result.message || 'Thank you! Your message has been sent. We\'ll get back to you soon.' });
                setFormData({ name: '', email: '', phone: '', dates: '', message: '' });
            } else {
                setStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Unable to connect to the server. Please check your internet connection and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Schema.org structured data for SEO & AEO
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Us - TimbrLux Stays",
        "description": "Get in touch with TimbrLux Stays for luxury vacation rental inquiries.",
        "mainEntity": {
            "@type": "LodgingBusiness",
            "name": "TimbrLux Stays",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Newry",
                "addressRegion": "ME",
                "addressCountry": "US"
            },
            "telephone": "+1 (555) 247-2478",
            "email": "hello@timbrluxstays.com",
            "url": "https://timbrluxstays.com"
        }
    };

    return (
        <>
            <SEOMetaTags
                title="Contact Us | TimbrLux Stays"
                description="Have questions about your stay? Get in touch with TimbrLux Stays. We're here to help you plan your perfect getaway."
                url="https://timbrluxstays.com/contact"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            <main className="contact-page">
                {/* Hero Section */}
                <section className="contact-hero" aria-labelledby="contact-hero-title">
                    <div className="contact-hero-container">
                        <span className="contact-hero-label">GET IN TOUCH</span>
                        <h1 id="contact-hero-title" className="contact-hero-title">
                            Contact Us
                        </h1>
                        <p className="contact-hero-description">
                            Have questions about your stay or need help planning your getaway? We're here to help and would love to hear from you.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="contact-content-section" aria-label="Contact details and form">
                    <div className="contact-content-container">
                        {/* Left: Contact Info */}
                        <div className="contact-info-side">
                            <article className="contact-info-card">
                                <div className="info-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="contact-info-content">
                                    <h3 className="contact-info-title">Email</h3>
                                    <p className="contact-info-text">
                                        <a href="mailto:hello@timbrluxstays.com">hello@timbrluxstays.com</a>
                                    </p>
                                </div>
                            </article>

                            <article className="contact-info-card">
                                <div className="info-icon-wrapper">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="contact-info-content">
                                    <h3 className="contact-info-title">Phone</h3>
                                    <p className="contact-info-text">
                                        <a href="tel:+15552472478">+1 (555) 247-2478</a>
                                    </p>
                                </div>
                            </article>

                            <article className="contact-info-card contact-info-card-map">
                                <div className="contact-info-row">
                                    <div className="info-icon-wrapper">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div className="contact-info-content">
                                        <h3 className="contact-info-title">Location</h3>
                                        <p className="contact-info-text">
                                            Newry, Maine — Near Sunday River
                                        </p>
                                    </div>
                                </div>
                                {/* Google Maps Embed */}
                                <div className="contact-map-embed">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2879.5!2d-70.8010278!3d44.5275278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDTCsDMxJzM5LjEiTiA3MMKwNDgnMDMuNyJX!5e1!3m2!1sen!2sus!4v1704476400000!5m2!1sen!2sus"
                                        width="100%"
                                        height="200"
                                        style={{ border: 0, borderRadius: '8px', marginTop: '12px' }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="TimbrLux Stays Location - Newry, Maine"
                                    ></iframe>
                                </div>
                            </article>

                        </div>

                        {/* Right: Contact Form */}
                        <div className="contact-form-side">
                            <h2 className="contact-form-title">Send Us a Message</h2>

                            {status.message && (
                                <div className={`status-message ${status.type}`}>
                                    {status.type === 'success' ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    )}
                                    <span>{status.message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="contact-form-grid">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={errors.name ? 'error' : ''}
                                        />
                                        {errors.name && <span className="error-text">{errors.name}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                        />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (xxx) xxx-xxxx"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={errors.phone ? 'error' : ''}
                                        />
                                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dates">Proposed Dates (Optional)</label>
                                        <input
                                            type="text"
                                            id="dates"
                                            name="dates"
                                            placeholder="e.g. July 12 - July 19"
                                            value={formData.dates}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="message">How can we help? *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            placeholder="Tell us about your trip plans or any questions you have..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={errors.message ? 'error' : ''}
                                        ></textarea>
                                        {errors.message && <span className="error-text">{errors.message}</span>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-submit-contact"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ContactPage;
