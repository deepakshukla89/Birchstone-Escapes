import React, { useState, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { submitContactForm } from '../../services/api';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

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

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsSubmitted(false);
        setErrors({});
        setServerError('');
        setShowDatePicker(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Only allow numbers and max 10 digits for phone
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
        if (serverError) setServerError('');
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true; // Phone is optional
        // Exactly 10 digits required if phone is provided
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setServerError('');

        try {
            const result = await submitContactForm(formData);
            if (result.success) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', phone: '', dates: '', message: '' });
                // Reset form after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            } else {
                setServerError(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setServerError('Unable to connect to the server. Please check your internet connection.');
        } finally {
            setIsSubmitting(false);
        }
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
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="chat-phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="chat-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit phone number"
                                    className={errors.phone ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="chat-dates">Proposed Dates</label>
                                <div className="date-picker-input-wrapper">
                                    <button
                                        type="button"
                                        className={`date-picker-trigger ${showDatePicker ? 'active' : ''}`}
                                        onClick={() => setShowDatePicker(!showDatePicker)}
                                        disabled={isSubmitting}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span>{formData.dates || 'Select dates'}</span>
                                    </button>
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
                                    disabled={isSubmitting}
                                ></textarea>
                                {errors.message && <span className="error-text">{errors.message}</span>}
                            </div>
                            {serverError && <p className="error-message-text" style={{ color: '#E53E3E', fontSize: '14px', marginBottom: '10px' }}>{serverError}</p>}
                            <button type="submit" className="chat-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Calendar Popover - Outside body scroll to prevent clipping */}
                {showDatePicker && (
                    <div className="date-picker-dropdown" ref={datePickerRef}>
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
        </>
    );
};

export default ChatWidget;
