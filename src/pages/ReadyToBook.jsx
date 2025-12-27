import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import SEOMetaTags from '../components/common/SEOMetaTags';
import './ReadyToBook.css';

const ReadyToBook = ({ isOpen, onClose, propertyName }) => {
    // Country codes list
    const countryCodes = [
        { code: '+1', country: 'US/CA' },
        { code: '+44', country: 'UK' },
        { code: '+91', country: 'IN' },
        { code: '+61', country: 'AU' },
        { code: '+49', country: 'DE' },
        { code: '+33', country: 'FR' },
        { code: '+39', country: 'IT' },
        { code: '+34', country: 'ES' },
        { code: '+81', country: 'JP' },
        { code: '+86', country: 'CN' },
        { code: '+971', country: 'UAE' },
        { code: '+65', country: 'SG' },
        { code: '+60', country: 'MY' },
        { code: '+66', country: 'TH' },
        { code: '+82', country: 'KR' },
        { code: '+7', country: 'RU' },
        { code: '+55', country: 'BR' },
        { code: '+52', country: 'MX' },
        { code: '+27', country: 'ZA' },
        { code: '+64', country: 'NZ' }
    ];

    // Form State
    const [formData, setFormData] = useState({
        property: '',
        startDate: null,
        endDate: null,
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        termsAccepted: false
    });

    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0
    });

    const [errors, setErrors] = useState({});
    const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);
    const endDateRef = React.useRef(null);

    // Reset or update property when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                property: propertyName || 'Frost Pine Chalet'
            }));
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, propertyName]);

    const handleStartDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            startDate: date,
            endDate: null // Reset end date when start changes
        }));
        // Auto-open end date picker
        setTimeout(() => {
            setIsEndDateOpen(true);
        }, 100);
    };

    const handleEndDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            endDate: date
        }));
        setIsEndDateOpen(false);
    };

    const updateGuests = (type, operation) => {
        setGuests(prev => {
            const newValue = operation === 'inc' ? prev[type] + 1 : prev[type] - 1;
            if (type === 'adults' && newValue < 1) return prev;
            if (newValue < 0) return prev;
            return { ...prev, [type]: newValue };
        });
    };

    const getTotalGuestsLabel = () => {
        const total = guests.adults + guests.children;
        const mainLabel = `${total} guest${total > 1 ? 's' : ''}`;
        const infantLabel = guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : '';
        return mainLabel + infantLabel;
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!formData.startDate) {
            newErrors.startDate = 'Check-in date is required';
        }
        if (!formData.endDate) {
            newErrors.endDate = 'Check-out date is required';
        }
        if (formData.startDate && formData.endDate) {
            const nights = Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24));
            if (nights < 3) {
                newErrors.endDate = 'Minimum stay is 3 nights';
            }
        }
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        if (!formData.termsAccepted) {
            newErrors.terms = 'You must accept the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Booking Request:', { ...formData, guests });
            alert('Thank you! We will contact you shortly.');
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="rtb-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="rtb-modal-content" onClick={e => e.stopPropagation()}>
                <header className="rtb-modal-header">
                    <h1 className="rtb-modal-title">Ready to Book?</h1>
                    <button
                        className="rtb-close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </header>

                <div className="rtb-content">
                    {/* Left Column: Visuals */}
                    <div className="rtb-visual-column">
                        <img
                            src="/image/ready-to-book.png"
                            alt="Book & Save upto 15% discount"
                            className="rtb-visual-image"
                        />
                        <h2 className="rtb-offer-text">
                            Book & Save upto <br /> 15% discount
                        </h2>
                    </div>

                    {/* Right Column: Form */}
                    <div className="rtb-form-column">
                        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>

                            {/* Property Dropdown (Only if no propertyName provided) */}
                            {!propertyName && (
                                <div className="form-group">
                                    <label className="rtb-label">Select Property</label>
                                    <div className="input-wrapper">
                                        <select
                                            name="property"
                                            className="rtb-input"
                                            value={formData.property}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Select a property</option>
                                            <option value="Frost Pine Chalet">Frost Pine Chalet</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Dates Selection - Separate Check-in & Checkout */}
                            <div className="form-row dates-row">
                                <div className="form-group">
                                    <label className="rtb-label">Check-in</label>
                                    <DatePicker
                                        selected={formData.startDate}
                                        onChange={handleStartDateChange}
                                        minDate={new Date()}
                                        placeholderText="Add date"
                                        className="rtb-input"
                                        dateFormat="MMM d, yyyy"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="rtb-label">Check-out</label>
                                    <DatePicker
                                        selected={formData.endDate}
                                        onChange={handleEndDateChange}
                                        minDate={formData.startDate || new Date()}
                                        placeholderText="Add date"
                                        className="rtb-input"
                                        dateFormat="MMM d, yyyy"
                                        open={isEndDateOpen}
                                        onClickOutside={() => setIsEndDateOpen(false)}
                                        onInputClick={() => setIsEndDateOpen(true)}
                                    />
                                </div>
                            </div>
                            {formData.startDate && formData.endDate && (
                                <div className="min-stay-note">Minimum stay: 3 nights</div>
                            )}

                            {/* Guests Selection */}
                            <div className="form-group rtb-guest-group">
                                <label className="rtb-label">Guests</label>
                                <div
                                    className={`guests-selector-input ${isGuestPickerOpen ? 'open' : ''}`}
                                    onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                                >
                                    <div className="guest-display">
                                        <span className="guest-count-label">{getTotalGuestsLabel()}</span>
                                    </div>
                                    <span className={`chevron ${isGuestPickerOpen ? 'up' : 'down'}`}>
                                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>

                                {isGuestPickerOpen && (
                                    <div className="guests-dropdown" onClick={e => e.stopPropagation()}>
                                        <div className="guest-type-row">
                                            <div className="guest-info">
                                                <span className="type-title">Adults</span>
                                                <span className="type-desc">Age 13+</span>
                                            </div>
                                            <div className="guest-controls">
                                                <button type="button" onClick={() => updateGuests('adults', 'dec')} disabled={guests.adults <= 1}>-</button>
                                                <span>{guests.adults}</span>
                                                <button type="button" onClick={() => updateGuests('adults', 'inc')}>+</button>
                                            </div>
                                        </div>
                                        <div className="guest-type-row">
                                            <div className="guest-info">
                                                <span className="type-title">Children</span>
                                                <span className="type-desc">Ages 2–12</span>
                                            </div>
                                            <div className="guest-controls">
                                                <button type="button" onClick={() => updateGuests('children', 'dec')} disabled={guests.children <= 0}>-</button>
                                                <span>{guests.children}</span>
                                                <button type="button" onClick={() => updateGuests('children', 'inc')}>+</button>
                                            </div>
                                        </div>
                                        <div className="guest-type-row">
                                            <div className="guest-info">
                                                <span className="type-title">Infants</span>
                                                <span className="type-desc">Under 2</span>
                                            </div>
                                            <div className="guest-controls">
                                                <button type="button" onClick={() => updateGuests('infants', 'dec')} disabled={guests.infants <= 0}>-</button>
                                                <span>{guests.infants}</span>
                                                <button type="button" onClick={() => updateGuests('infants', 'inc')}>+</button>
                                            </div>
                                        </div>
                                        <div className="guest-dropdown-actions">
                                            <button
                                                type="button"
                                                className="close-guest-dropdown"
                                                onClick={() => setIsGuestPickerOpen(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <div className="form-group">
                                <label className="rtb-label">Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        className={`rtb-input ${errors.name ? 'input-error' : ''}`}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label className="rtb-label">Email Id</label>
                                <div className="input-wrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter email id"
                                        className={`rtb-input ${errors.email ? 'input-error' : ''}`}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            {/* Contact No */}
                            <div className="form-group">
                                <label className="rtb-label">Contact no</label>
                                <div className="phone-input-container">
                                    <select
                                        name="countryCode"
                                        className="country-code-select"
                                        value={formData.countryCode}
                                        onChange={handleInputChange}
                                    >
                                        {countryCodes.map(cc => (
                                            <option key={cc.code} value={cc.code}>
                                                {cc.code} {cc.country}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="phone-number-wrapper">
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter contact no."
                                            className={`rtb-input ${errors.phone ? 'input-error' : ''}`}
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="terms-group">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="termsAccepted"
                                    className={`terms-checkbox ${errors.terms ? 'input-error' : ''}`}
                                    checked={formData.termsAccepted}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="terms" className="terms-label">
                                    Read terms and <span className="terms-highlight">condition before booking</span>
                                </label>
                            </div>
                            {errors.terms && <span className="error-message">{errors.terms}</span>}

                            {/* Buttons */}
                            <div className="form-actions">
                                <button type="button" className="btn-message">
                                    Message Us!
                                </button>
                                <button type="submit" className="btn-book-now">
                                    Book Now!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadyToBook;
