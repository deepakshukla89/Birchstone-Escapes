import React, { useState } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dates: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsSubmitted(false);
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Here you can add your form submission logic (API call, etc.)
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', dates: '', message: '' });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <>
            {/* Chat Button */}
            <button
                className={`chat-widget-button ${isOpen ? 'open' : ''}`}
                onClick={toggleChat}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>

            {/* Chat Window */}
            <div className={`chat-widget-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-widget-header">
                    <h3>Send Us a Message</h3>
                    <p>We'd love to hear from you!</p>
                </div>

                <div className="chat-widget-body">
                    {isSubmitted ? (
                        <div className="success-message">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h4>Thank you!</h4>
                            <p>We'll get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="chat-widget-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="chat-name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="chat-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="error-text">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="chat-email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="chat-email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="chat-phone">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        id="chat-phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (xxx) xxx-xxxx"
                                        className={errors.phone ? 'error' : ''}
                                    />
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="chat-dates">Proposed Dates (Optional)</label>
                                    <input
                                        type="text"
                                        id="chat-dates"
                                        name="dates"
                                        value={formData.dates}
                                        onChange={handleChange}
                                        placeholder="e.g. July 12 - July 19"
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="chat-message">How can we help? *</label>
                                <textarea
                                    id="chat-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your trip plans or any questions you have..."
                                    rows="4"
                                    className={errors.message ? 'error' : ''}
                                ></textarea>
                                {errors.message && <span className="error-text">{errors.message}</span>}
                            </div>

                            <button type="submit" className="chat-submit-btn">
                                Send Inquiry
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChatWidget;

