import React, { useState, useEffect } from 'react';
import { submitContactForm } from '../../services/api';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true; // Phone is optional
        const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
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
                // Reset errors
                setErrors({});
            } else {
                setStatus({ type: 'error', message: result.message || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Unable to connect to the server. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="contact-modal-overlay" onClick={onClose}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="contact-modal-close"
                    onClick={onClose}
                    aria-label="Close contact modal"
                >
                    ×
                </button>

                <h2 className="contact-modal-title">Send Us a Message</h2>

                {status.message && (
                    <div className={`contact-modal-status ${status.type}`}>
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
                    <div className="contact-modal-grid">
                        <div className="contact-modal-field">
                            <label htmlFor="modal-name">Full Name *</label>
                            <input
                                type="text"
                                id="modal-name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="contact-modal-error">{errors.name}</span>}
                        </div>

                        <div className="contact-modal-field">
                            <label htmlFor="modal-email">Email Address *</label>
                            <input
                                type="email"
                                id="modal-email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="contact-modal-error">{errors.email}</span>}
                        </div>

                        <div className="contact-modal-field">
                            <label htmlFor="modal-phone">Phone (Optional)</label>
                            <input
                                type="tel"
                                id="modal-phone"
                                name="phone"
                                placeholder="+1 (xxx) xxx-xxxx"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="contact-modal-error">{errors.phone}</span>}
                        </div>

                        <div className="contact-modal-field">
                            <label htmlFor="modal-dates">Proposed Dates (Optional)</label>
                            <input
                                type="text"
                                id="modal-dates"
                                name="dates"
                                placeholder="e.g. July 12 - July 19"
                                value={formData.dates}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-modal-field full-width">
                            <label htmlFor="modal-message">How can we help? *</label>
                            <textarea
                                id="modal-message"
                                name="message"
                                rows="4"
                                placeholder="Tell us about your trip plans or any questions you have..."
                                value={formData.message}
                                onChange={handleChange}
                                className={errors.message ? 'error' : ''}
                            ></textarea>
                            {errors.message && <span className="contact-modal-error">{errors.message}</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="contact-modal-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
