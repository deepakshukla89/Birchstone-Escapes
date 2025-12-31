/**
 * Split-Screen Booking Modal
 * Left: Promotional Image | Right: Booking Content
 */

import React, { useState, useEffect, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays, parseISO, startOfDay, isSameDay, isWithinInterval } from 'date-fns';
import {
    getPropertyAvailability,
    calculatePricing,
    createBooking,
    getPropertyData,
    calculateNights,
} from '../services/api';
import './BookingModal.css';

const STEPS = {
    BOOKING: 1,
    DETAILS: 2,
    CONFIRMATION: 3,
};

const COUNTRY_CODES = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
];

const BookingModal = ({ isOpen, onClose, propertyName }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.BOOKING);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Property & Availability
    const [propertyData, setPropertyData] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);

    // Date Selection
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Guests
    const [guests, setGuests] = useState({
        adults: 2,
        children: 0,
        infants: 0,
    });

    // Pricing
    const [pricing, setPricing] = useState(null);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isGuestOpen, setIsGuestOpen] = useState(false);

    // Guest Information
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        specialRequests: '',
        termsAccepted: false,
    });
    const [formErrors, setFormErrors] = useState({});

    // Booking Confirmation
    const [bookingConfirmation, setBookingConfirmation] = useState(null);

    // Computed
    const nights = useMemo(() => {
        if (!startDate || !endDate) return 0;
        return calculateNights(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        if (isOpen) {
            fetchAvailability();
            document.body.style.overflow = 'hidden';
        } else {
            resetModal();
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (startDate && endDate) {
            fetchPricing();
        } else {
            setPricing(null);
        }
    }, [startDate, endDate, guests.adults, guests.children]);

    const fetchAvailability = async () => {
        setIsLoading(true);
        try {
            const result = await getPropertyAvailability(
                'frost-pine-chalet',
                new Date(),
                addDays(new Date(), 365)
            );
            if (result.success) {
                setBookedDates(result.data.bookedDates.map(d => parseISO(d)));
                setPropertyData(getPropertyData());
            }
        } catch (err) {
            console.error('Failed to fetch availability:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPricing = async () => {
        if (!startDate || !endDate) return;

        try {
            const totalGuests = guests.adults + guests.children;
            const result = await calculatePricing(
                'frost-pine-chalet',
                startDate,
                endDate,
                totalGuests
            );

            if (result.success) {
                setPricing(result.data);
                setError(null);
            } else {
                setError(result.error);
                setPricing(null);
            }
        } catch (err) {
            setError('Failed to calculate pricing');
            setPricing(null);
        }
    };

    const submitBooking = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await createBooking({
                propertyId: 'frost-pine-chalet',
                checkIn: startDate,
                checkOut: endDate,
                guests: {
                    adults: guests.adults,
                    children: guests.children,
                    infants: guests.infants,
                    total: guests.adults + guests.children,
                },
                guestInfo,
                pricing,
            });

            if (result.success) {
                setBookingConfirmation(result.data);
                setCurrentStep(STEPS.CONFIRMATION);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Failed to create booking. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetModal = () => {
        setCurrentStep(STEPS.BOOKING);
        setStartDate(null);
        setEndDate(null);
        setGuests({ adults: 2, children: 0, infants: 0 });
        setPricing(null);
        setIsPricingOpen(false);
        setGuestInfo({
            name: '',
            email: '',
            countryCode: '+1',
            phone: '',
            specialRequests: '',
            termsAccepted: false,
        });
        setFormErrors({});
        setBookingConfirmation(null);
        setError(null);
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;

        if (start && end) {
            // Check if range contains booked dates
            const hasBookedDate = bookedDates.some(bookedDate => {
                const booked = startOfDay(bookedDate);
                const startDay = startOfDay(start);
                const endDay = startOfDay(end);
                return isWithinInterval(booked, { start: startDay, end: endDay });
            });

            if (hasBookedDate) {
                setError('Selected range contains unavailable dates');
                return;
            }
        }

        setStartDate(start);
        setEndDate(end);
        setError(null);
    };

    const isDateBooked = (date) => {
        return bookedDates.some(bookedDate =>
            isSameDay(date, bookedDate)
        );
    };

    const updateGuests = (type, operation) => {
        setGuests(prev => {
            const newValue = operation === 'inc' ? prev[type] + 1 : prev[type] - 1;
            if (type === 'adults' && newValue < 1) return prev;
            if (newValue < 0) return prev;
            if (type !== 'infants' && (prev.adults + prev.children + (type === 'adults' ? newValue - prev.adults : newValue - prev.children)) > (propertyData?.maxGuests || 8)) {
                return prev;
            }
            return { ...prev, [type]: newValue };
        });
    };

    const validateForm = () => {
        const errors = {};

        if (!startDate || !endDate) {
            errors.dates = 'Please select check-in and check-out dates';
        }

        if (!guestInfo.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!guestInfo.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!guestInfo.phone.trim()) {
            errors.phone = 'Phone number is required';
        }

        if (!guestInfo.termsAccepted) {
            errors.terms = 'You must accept the terms and conditions';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGuestInfo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleContinue = () => {
        if (!startDate || !endDate) {
            setError('Please select check-in and check-out dates');
            return;
        }
        if (!pricing) {
            setError('Please wait for pricing to load');
            return;
        }
        setCurrentStep(STEPS.DETAILS);
        setError(null);
    };

    // Left Side Promotional Panel
    const renderPromoPanel = () => (
        <div className="promo-panel">
            <img
                src="/image/ready-to-book.png"
                alt="Book your stay"
                className="promo-image"
            />
            <div className="promo-content">
                <h3>Book & Save</h3>
                <p className="discount-text">up to 15% discount</p>
            </div>
        </div>
    );

    // Step 1: Date Selection
    const renderBookingStep = () => (
        <div className="content-panel">
            {/* Property Card */}
            <div className="property-card-compact">
                <img
                    src="/image/pd1.png"
                    alt={propertyName || 'Frost Pine Chalet'}
                    className="property-thumbnail"
                />
                <div className="property-details">
                    <h4>{propertyName || 'Frost Pine Chalet'}</h4>
                    <p>{propertyData?.location || 'Newry, Maine'}</p>
                    <div className="property-meta">
                        <span>{propertyData?.bedrooms || 4} Bedrooms</span>
                        <span>•</span>
                        <span>{propertyData?.bathrooms || 3} Bathrooms</span>
                        <span>•</span>
                        <span>Up to {propertyData?.maxGuests || 8} Guests</span>
                    </div>
                </div>
            </div>
            {/* <h3>Select Your Dates</h3> */}
            {/* Calendar */}
            <div className="calendar-section">
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    monthsShown={1}
                    minDate={new Date()}
                    excludeDates={bookedDates}
                    dayClassName={(date) => isDateBooked(date) ? 'booked-date' : null}
                    calendarClassName="booking-calendar"
                />
            </div>

            {/* Date Display */}
            {startDate && endDate && (
                <div className="date-display">
                    <div className="date-box">
                        <span className="date-label">Check-in</span>
                        <span className="date-value">{format(startDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="arrow">→</div>
                    <div className="date-box">
                        <span className="date-label">Check-out</span>
                        <span className="date-value">{format(endDate, 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="nights-count">
                        {nights} nights
                    </div>
                </div>
            )}

            {/* Guest Selection - Accordion */}
            <div className="guest-accordion">
                <button
                    className="guest-accordion-header"
                    onClick={() => setIsGuestOpen(!isGuestOpen)}
                >
                    <span>Guests</span>
                    <div className="guest-summary">
                        <span>{guests.adults + guests.children} guest{guests.adults + guests.children > 1 ? 's' : ''}{guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''}</span>
                        <svg
                            className={`chevron ${isGuestOpen ? 'open' : ''}`}
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </button>

                {isGuestOpen && (
                    <div className="guest-dropdown">
                        {[
                            { type: 'adults', label: 'Adults', desc: 'Age 13+' },
                            { type: 'children', label: 'Children', desc: 'Ages 2-12' },
                            { type: 'infants', label: 'Infants', desc: 'Under 2' },
                        ].map(({ type, label, desc }) => (
                            <div key={type} className="guest-item">
                                <div>
                                    <div className="guest-label">{label}</div>
                                    <div className="guest-desc">{desc}</div>
                                </div>
                                <div className="guest-controls">
                                    <button
                                        onClick={() => updateGuests(type, 'dec')}
                                        disabled={type === 'adults' ? guests.adults <= 1 : guests[type] <= 0}
                                    >
                                        −
                                    </button>
                                    <span>{guests[type]}</span>
                                    <button onClick={() => updateGuests(type, 'inc')}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pricing Accordion */}
            {pricing && (
                <div className="pricing-accordion">
                    <button
                        className="accordion-header"
                        onClick={() => setIsPricingOpen(!isPricingOpen)}
                    >
                        <div className="accordion-title">
                            <span>Total Price</span>
                            <span className="total-price">${pricing.total}</span>
                        </div>
                        <svg
                            className={`chevron ${isPricingOpen ? 'open' : ''}`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {isPricingOpen && (
                        <div className="accordion-content">
                            <div className="pricing-breakdown">
                                <div className="price-item">
                                    <span>${pricing.baseRate} × {pricing.nights} nights</span>
                                    <span>${pricing.accommodationTotal}</span>
                                </div>
                                <div className="price-item">
                                    <span>Cleaning fee</span>
                                    <span>${pricing.cleaningFee}</span>
                                </div>
                                <div className="price-item">
                                    <span>Service fee</span>
                                    <span>${pricing.serviceFee}</span>
                                </div>
                                <div className="price-item">
                                    <span>Taxes</span>
                                    <span>${pricing.taxes}</span>
                                </div>
                                {pricing.discount > 0 && (
                                    <div className="price-item discount">
                                        <span>{pricing.discountLabel}</span>
                                        <span>-${pricing.discount}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Continue Button */}
            <button
                className="btn-continue"
                onClick={handleContinue}
                disabled={!startDate || !endDate || !pricing}
            >
                Continue
            </button>
        </div>
    );

    // Step 2: Guest Details
    const renderDetailsStep = () => (
        <div className="content-panel">
            <h3>Your Information</h3>

            <div className="form-fields">
                <div className="form-group">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        value={guestInfo.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? 'error' : ''}
                    />
                    {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={guestInfo.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div className="phone-group-container">
                    <label>Phone Number *</label>
                    <div className="phone-group">
                        <select
                            name="countryCode"
                            value={guestInfo.countryCode}
                            onChange={handleInputChange}
                        >
                            {COUNTRY_CODES.map(cc => (
                                <option key={cc.code} value={cc.code}>
                                    {cc.flag} {cc.code}
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Primary contact number"
                            value={guestInfo.phone}
                            onChange={handleInputChange}
                            className={formErrors.phone ? 'error' : ''}
                        />
                    </div>
                    {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                    <label>Special Requests (Optional)</label>
                    <textarea
                        name="specialRequests"
                        placeholder="Any special needs or arrival details?"
                        value={guestInfo.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                    />
                </div>
            </div>

            <div className="form-group checkbox-group">
                <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={guestInfo.termsAccepted}
                        onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-label">
                        I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                    </span>
                </label>
                {formErrors.terms && <span className="error-text">{formErrors.terms}</span>}
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
                <h4>Booking Summary</h4>
                <div className="summary-item">
                    <span>Dates</span>
                    <span>{format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')}</span>
                </div>
                <div className="summary-item">
                    <span>Guests</span>
                    <span>{guests.adults + guests.children} guests</span>
                </div>
                <div className="summary-item total">
                    <span>Total</span>
                    <span>${pricing?.total}</span>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn-back" onClick={() => setCurrentStep(STEPS.BOOKING)}>
                    Back
                </button>
                <button
                    className="btn-confirm"
                    onClick={submitBooking}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </div>
        </div >
    );

    // Step 3: Confirmation
    const renderConfirmation = () => (
        <div className="content-panel confirmation">
            <div className="success-icon">
                <svg viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" />
                    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>

            <h2>Booking Confirmed!</h2>
            <p className="conf-number">#{bookingConfirmation?.confirmationNumber}</p>

            <div className="conf-details">
                <div className="detail-item">
                    <span>Property</span>
                    <strong>{bookingConfirmation?.propertyName}</strong>
                </div>
                <div className="detail-item">
                    <span>Check-in</span>
                    <strong>{bookingConfirmation?.checkIn}</strong>
                </div>
                <div className="detail-item">
                    <span>Check-out</span>
                    <strong>{bookingConfirmation?.checkOut}</strong>
                </div>
                <div className="detail-item">
                    <span>Total</span>
                    <strong>${bookingConfirmation?.total}</strong>
                </div>
            </div>

            <p className="conf-message">
                A confirmation email has been sent to <strong>{bookingConfirmation?.guestEmail}</strong>
            </p>

            <button className="btn-done" onClick={onClose}>Done</button>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-container ${currentStep === STEPS.CONFIRMATION ? 'confirmation-layout' : 'split-layout'}`}
                onClick={e => e.stopPropagation()}
            >
                <button className="close-btn" onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </button>

                {/* Left Panel - Promotional */}
                {currentStep !== STEPS.CONFIRMATION && renderPromoPanel()}

                {/* Right Panel - Content */}
                <div className="right-panel">
                    {error && (
                        <div className="error-alert">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {currentStep === STEPS.BOOKING && renderBookingStep()}
                    {currentStep === STEPS.DETAILS && renderDetailsStep()}
                    {currentStep === STEPS.CONFIRMATION && renderConfirmation()}
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
