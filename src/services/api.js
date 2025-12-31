/**
 * Hospitable API Service Layer
 * 
 * This module provides a clean abstraction for Hospitable API integration.
 * Currently uses mock data but is structured for easy real API integration.
 * 
 * @author Birchstone Escapes
 * @version 1.0.0
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const API_CONFIG = {
    baseUrl: 'https://api.hospitable.com/v2',
    // Token will be provided by user - leave empty for mock mode
    token: '',
    // When true, uses mock data instead of real API
    useMockData: true,
};

// =============================================================================
// MOCK DATA (Frost Pine Chalet)
// =============================================================================

const MOCK_PROPERTY = {
    id: 'frost-pine-chalet',
    name: 'Frost Pine Chalet',
    location: 'Newry, Maine',
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,

    // Pricing Configuration
    pricing: {
        baseRate: 250,          // $ per night
        cleaningFee: 150,       // One-time fee
        serviceFeePercent: 12,  // 12% service fee
        taxPercent: 10,         // 10% tax
        minNights: 3,
        maxNights: 30,
    },

    // Sample booked dates for testing (YYYY-MM-DD format)
    bookedDates: [
        // January bookings
        '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05',
        '2025-01-10', '2025-01-11', '2025-01-12', '2025-01-13', '2025-01-14',
        '2025-01-20', '2025-01-21', '2025-01-22',
        // February bookings
        '2025-02-14', '2025-02-15', '2025-02-16', '2025-02-17',
        '2025-02-25', '2025-02-26', '2025-02-27', '2025-02-28',
        // March bookings
        '2025-03-05', '2025-03-06', '2025-03-07', '2025-03-08',
        '2025-03-15', '2025-03-16', '2025-03-17', '2025-03-18', '2025-03-19',
    ],
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats a date to YYYY-MM-DD string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateToString = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Generates an array of dates between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date (exclusive)
 * @returns {string[]} Array of date strings
 */
export const getDateRange = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current < end) {
        dates.push(formatDateToString(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
};

/**
 * Calculate number of nights between two dates
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @returns {number} Number of nights
 */
export const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Generates a unique booking confirmation number
 * @returns {string} Confirmation number (e.g., "BE-2025-XXXX")
 */
const generateConfirmationNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BE-${year}-${random}`;
};

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Fetches property availability data
 * Returns booked dates and property configuration
 * 
 * @param {string} propertyId - The property identifier
 * @param {Date} startDate - Start of date range to check
 * @param {Date} endDate - End of date range to check
 * @returns {Promise<Object>} Availability data
 */
export const getPropertyAvailability = async (propertyId, startDate, endDate) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (API_CONFIG.useMockData || !API_CONFIG.token) {
        return {
            success: true,
            data: {
                propertyId: MOCK_PROPERTY.id,
                propertyName: MOCK_PROPERTY.name,
                bookedDates: MOCK_PROPERTY.bookedDates,
                minNights: MOCK_PROPERTY.pricing.minNights,
                maxNights: MOCK_PROPERTY.pricing.maxNights,
                maxGuests: MOCK_PROPERTY.maxGuests,
            }
        };
    }

    // Real API call (when token is provided)
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/properties/${propertyId}/calendar?start=${formatDateToString(startDate)}&end=${formatDateToString(endDate)}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) throw new Error('Failed to fetch availability');

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Availability API Error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Calculates pricing for a stay
 * 
 * @param {string} propertyId - The property identifier
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @param {number} guests - Number of guests
 * @returns {Promise<Object>} Pricing breakdown
 */
export const calculatePricing = async (propertyId, checkIn, checkOut, guests) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const nights = calculateNights(checkIn, checkOut);

    if (nights < MOCK_PROPERTY.pricing.minNights) {
        return {
            success: false,
            error: `Minimum stay is ${MOCK_PROPERTY.pricing.minNights} nights`,
        };
    }

    const { baseRate, cleaningFee, serviceFeePercent, taxPercent } = MOCK_PROPERTY.pricing;

    // Calculate pricing breakdown
    const accommodationTotal = baseRate * nights;
    const serviceFee = Math.round(accommodationTotal * (serviceFeePercent / 100));
    const subtotal = accommodationTotal + cleaningFee + serviceFee;
    const taxes = Math.round(subtotal * (taxPercent / 100));
    const total = subtotal + taxes;

    // Check for discounts (example: 10% off for 7+ nights)
    let discount = 0;
    let discountLabel = null;
    if (nights >= 7) {
        discount = Math.round(accommodationTotal * 0.10);
        discountLabel = 'Weekly discount (10%)';
    } else if (nights >= 14) {
        discount = Math.round(accommodationTotal * 0.15);
        discountLabel = 'Monthly discount (15%)';
    }

    const finalTotal = total - discount;

    return {
        success: true,
        data: {
            nights,
            baseRate,
            accommodationTotal,
            cleaningFee,
            serviceFee,
            serviceFeePercent,
            taxes,
            taxPercent,
            subtotal,
            discount,
            discountLabel,
            total: finalTotal,
            currency: 'USD',
            currencySymbol: '$',
        }
    };
};

/**
 * Submits a booking request
 * 
 * @param {Object} bookingData - Complete booking information
 * @returns {Promise<Object>} Booking confirmation
 */
export const createBooking = async (bookingData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const {
        propertyId,
        checkIn,
        checkOut,
        guests,
        guestInfo,
        pricing,
    } = bookingData;

    // Validate required fields
    if (!checkIn || !checkOut || !guestInfo?.name || !guestInfo?.email) {
        return {
            success: false,
            error: 'Missing required booking information',
        };
    }

    if (API_CONFIG.useMockData || !API_CONFIG.token) {
        // Mock successful booking
        const confirmationNumber = generateConfirmationNumber();

        return {
            success: true,
            data: {
                bookingId: `booking_${Date.now()}`,
                confirmationNumber,
                status: 'confirmed',
                propertyName: MOCK_PROPERTY.name,
                checkIn: formatDateToString(checkIn),
                checkOut: formatDateToString(checkOut),
                nights: calculateNights(checkIn, checkOut),
                guests: guests,
                guestName: guestInfo.name,
                guestEmail: guestInfo.email,
                guestPhone: `${guestInfo.countryCode}${guestInfo.phone}`,
                total: pricing.total,
                currency: pricing.currency,
                createdAt: new Date().toISOString(),
                message: 'Your booking has been confirmed! You will receive a confirmation email shortly.',
            }
        };
    }

    // Real API call (when token is provided)
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/reservations`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_id: propertyId,
                    check_in: formatDateToString(checkIn),
                    check_out: formatDateToString(checkOut),
                    guests: guests,
                    guest: {
                        name: guestInfo.name,
                        email: guestInfo.email,
                        phone: `${guestInfo.countryCode}${guestInfo.phone}`,
                    },
                }),
            }
        );

        if (!response.ok) throw new Error('Failed to create booking');

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Booking API Error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Submits a contact inquiry
 * 
 * @param {Object} inquiryData - Contact form information
 * @returns {Promise<Object>} Inquiry confirmation
 */
export const sendInquiry = async (inquiryData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const { name, email, phone, message } = inquiryData;

    // Validate required fields
    if (!name || !email || !message) {
        return {
            success: false,
            error: 'Missing required inquiry information',
        };
    }

    if (API_CONFIG.useMockData || !API_CONFIG.token) {
        // Mock successful inquiry
        return {
            success: true,
            data: {
                inquiryId: `inq_${Date.now()}`,
                status: 'sent',
                receivedAt: new Date().toISOString(),
                message: 'Thank you for your inquiry! Our team will get back to you shortly.',
            }
        };
    }

    // Real API call (when token is provided)
    // Note: Hospitable API for inquiries might vary depending on their current V2 spec.
    // This is structured as a standard message/inquiry POST request.
    try {
        const response = await fetch(
            `${API_CONFIG.baseUrl}/messages`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_CONFIG.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'inquiry',
                    contact: {
                        name,
                        email,
                        phone,
                    },
                    content: message,
                    // Additional inquiry data can be added here
                    metadata: inquiryData.dates ? { requested_dates: inquiryData.dates } : {},
                }),
            }
        );

        if (!response.ok) throw new Error('Failed to send inquiry');

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Inquiry API Error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Updates API configuration with real token
 * Call this when user provides the Hospitable API token
 * 
 * @param {string} token - Hospitable Personal Access Token
 */
export const setApiToken = (token) => {
    API_CONFIG.token = token;
    API_CONFIG.useMockData = false;
};

/**
 * Gets the current mock property data
 * Useful for getting property details before API is configured
 * 
 * @returns {Object} Property data
 */
export const getPropertyData = () => MOCK_PROPERTY;

// Export configuration for debugging
export const getApiConfig = () => ({
    ...API_CONFIG,
    token: API_CONFIG.token ? '***hidden***' : 'not set'
});
