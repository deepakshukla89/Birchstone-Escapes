import React, { useState, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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

    // Calendar State
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const datePickerRef = useRef(null);

    // Close calendar on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Update formData.dates when dateRange changes
    useEffect(() => {
        const start = format(dateRange[0].startDate, 'MMM dd, yyyy');
        const end = format(dateRange[0].endDate, 'MMM dd, yyyy');
        setFormData(prev => ({ ...prev, dates: `${start} - ${end}` }));
    }, [dateRange]);

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
        if (!phone.trim()) return false;
        // Exactly 10 digits required
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone.trim());
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

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Only allow numbers and max 10 digits for phone
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

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

                        <div className="contact-modal-field full-width">
                            <label htmlFor="modal-phone">Phone Number *</label>
                            <input
                                type="tel"
                                id="modal-phone"
                                name="phone"
                                placeholder="10-digit phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="contact-modal-error">{errors.phone}</span>}
                        </div>

                        <div className="contact-modal-field full-width" ref={datePickerRef}>
                            <label htmlFor="modal-dates">Proposed Dates</label>
                            <div className="modal-date-picker-wrapper">
                                <button
                                    type="button"
                                    className={`modal-date-picker-trigger ${showDatePicker ? 'active' : ''}`}
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span>{formData.dates}</span>
                                </button>

                                {showDatePicker && (
                                    <div className="modal-date-picker-dropdown">
                                        <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDateRange([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dateRange}
                                            minDate={new Date()}
                                            rangeColors={['#722F37']}
                                        />
                                    </div>
                                )}
                            </div>
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
