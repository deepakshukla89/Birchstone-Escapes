/**
 * Split-Screen Booking Modal
 * Left: Promotional Image | Right: Booking Content
 * Uses direct Hospitable calendar data with frontend pricing calculation
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays } from 'date-fns';
import {
    getPropertyAvailability,
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

    // Property & Calendar Data (complete Hospitable structure)
    const [propertyData, setPropertyData] = useState(null);
    const [calendarData, setCalendarData] = useState([]); // Full calendar from Hospitable

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

    // Fetch calendar data from backend (exact Hospitable structure)
    const fetchAvailability = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getPropertyAvailability(
                null,
                new Date(),
                addDays(new Date(), 30) // 1 month only
            );
            if (result.success) {
                setCalendarData(result.data.calendar || []);
                setPropertyData(await getPropertyData());
                console.log('📅 Loaded calendar:', result.data.calendar?.length || 0, 'days');
            } else {
                // API failed - close modal
                console.error('API failed:', result.error);
                setError('Failed to load availability');
                onClose(); // Close modal on API fail
            }
        } catch (err) {
            console.error('Failed to fetch availability:', err);
            setError('Failed to load availability');
            onClose(); // Close modal on API fail
        } finally {
            setIsLoading(false);
        }
    };

    // =========================================================================
    // CALENDAR HELPER FUNCTIONS
    // =========================================================================

    // Get day data from calendar for a specific date
    const getDayData = useCallback((date) => {
        if (!date || !calendarData.length) return null;
        const dateStr = format(date, 'yyyy-MM-dd');
        return calendarData.find(d => d.date === dateStr);
    }, [calendarData]);

    // Check if date is beyond 1-month range
    const maxBookingDate = useMemo(() => addDays(new Date(), 30), []);

    // Check if date is "Checkout only" (closed_for_checkin but available)
    const isCheckoutOnly = useCallback((date) => {
        const dayData = getDayData(date);
        if (!dayData) return false;
        return dayData.status?.available && dayData.closed_for_checkin;
    }, [getDayData]);

    // Get array of unavailable dates for excludeDates prop
    const unavailableDates = useMemo(() => {
        if (!calendarData.length) return [];

        return calendarData
            .filter(day => !day.status?.available) // RESERVED, BLOCKED, etc.
            .map(day => new Date(day.date + 'T00:00:00')); // Convert to Date objects
    }, [calendarData]);

    // Check if date should be disabled in calendar
    const isDateDisabled = useCallback((date) => {
        // Beyond 2-month range
        if (date > maxBookingDate) return true;

        const dayData = getDayData(date);

        // Not in calendar = disabled
        if (!dayData) return true;

        // Not available (RESERVED, BLOCKED, etc.)
        if (!dayData.status?.available) return true;

        // If selecting check-in date:
        // Disable if closed_for_checkin (but will show as "Checkout only")
        if (!startDate && dayData.closed_for_checkin) return true;

        // If selecting check-out date:
        // Disable if closed_for_checkout
        if (startDate && !endDate && dayData.closed_for_checkout) return true;

        return false;
    }, [startDate, endDate, maxBookingDate, getDayData]);

    // Validate date range (min_stay, no unavailable dates in between)
    const validateDateRange = useCallback((start, end) => {
        if (!start || !end) return { valid: false, error: 'Select dates' };

        const startDayData = getDayData(start);
        if (!startDayData) return { valid: false, error: 'Invalid start date' };

        const nightsCount = calculateNights(start, end);
        const minStay = startDayData.min_stay || 1;

        // Check minimum stay requirement
        if (nightsCount < minStay) {
            return { valid: false, error: `Minimum stay is ${minStay} nights` };
        }

        // Check if any date in range is unavailable
        const currentDate = new Date(start);
        while (currentDate < end) {
            const dayData = getDayData(currentDate);
            if (!dayData || !dayData.status?.available) {
                return { valid: false, error: 'Selected range contains unavailable dates' };
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return { valid: true };
    }, [calendarData, getDayData]);

    // =========================================================================
    // FRONTEND PRICING CALCULATION (No API call)
    // =========================================================================

    const calculatedPricing = useMemo(() => {
        if (!startDate || !endDate || !calendarData.length) return null;

        const nightsCount = calculateNights(startDate, endDate);
        let accommodationTotal = 0;

        // Sum up daily prices from calendar data
        const currentDate = new Date(startDate);
        for (let i = 0; i < nightsCount; i++) {
            const dayData = getDayData(currentDate);
            if (dayData?.price?.amount) {
                // Price is in cents, convert to dollars
                accommodationTotal += dayData.price.amount / 100;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Simple 10% tax
        const taxes = Math.round(accommodationTotal * 0.10);
        const total = Math.round(accommodationTotal + taxes);

        return {
            nights: nightsCount,
            accommodationTotal: Math.round(accommodationTotal),
            taxes,
            taxPercent: 10,
            total,
            currency: 'USD',
            currencySymbol: '$'
        };
    }, [startDate, endDate, calendarData, getDayData]);

    // Update pricing when calculated
    useEffect(() => {
        setPricing(calculatedPricing);
    }, [calculatedPricing]);

    const submitBooking = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);

        // API call removed - showing static confirmation
        setTimeout(() => {
            const confirmationNumber = `BE-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            setBookingConfirmation({
                confirmationNumber,
                propertyName: propertyName || 'Frost Pine Chalet',
                checkIn: format(startDate, 'yyyy-MM-dd'),
                checkOut: format(endDate, 'yyyy-MM-dd'),
                guestEmail: guestInfo.email,
                total: pricing?.total || 0,
            });
            setCurrentStep(STEPS.CONFIRMATION);
            setIsLoading(false);
        }, 1000);
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
            // Validate the date range using our new validation
            const validation = validateDateRange(start, end);
            if (!validation.valid) {
                setError(validation.error);
                return;
            }
        }

        setStartDate(start);
        setEndDate(end);
        setError(null);
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
                    maxDate={maxBookingDate}
                    excludeDates={unavailableDates}
                    dayClassName={(date) => {
                        const dayData = getDayData(date);
                        // No data for this date = disabled
                        if (!dayData) return 'unavailable-date';
                        // Not available (RESERVED, BLOCKED)
                        if (!dayData.status?.available) return 'unavailable-date';
                        // Checkout only
                        if (isCheckoutOnly(date)) return 'checkout-only-date';
                        return null;
                    }}
                    renderDayContents={(day, date) => {
                        const dayData = getDayData(date);
                        const checkoutOnly = isCheckoutOnly(date);
                        const isUnavailable = !dayData || !dayData.status?.available;

                        return (
                            <div className={`day-content ${checkoutOnly ? 'has-tooltip' : ''} ${isUnavailable ? 'is-unavailable' : ''}`}>
                                <span>{day}</span>
                                {checkoutOnly && <span className="checkout-tooltip">Checkout only</span>}
                            </div>
                        );
                    }}
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
                                    <span>{pricing.nights} nights accommodation</span>
                                    <span>${pricing.accommodationTotal}</span>
                                </div>
                                <div className="price-item">
                                    <span>Taxes ({pricing.taxPercent}%)</span>
                                    <span>${pricing.taxes}</span>
                                </div>
                                <div className="price-item total">
                                    <span>Total (USD)</span>
                                    <span>${pricing.total}</span>
                                </div>
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
