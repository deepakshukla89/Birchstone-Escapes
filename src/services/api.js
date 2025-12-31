/**
 * API Service Layer - Frontend
 * 
 * Communicates with the backend server for Hospitable API integration.
 * All API calls go through our backend to avoid CORS issues.
 * 
 * @author Birchstone Escapes
 * @version 2.0.0
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const API_CONFIG = {
    // Backend server URL
    baseUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats a date to YYYY-MM-DD string
 */
export const formatDateToString = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Calculate number of nights between two dates
 */
export const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Fetches property availability data from backend
 */
export const getPropertyAvailability = async (propertyId, startDate, endDate) => {
    try {
        const start = formatDateToString(startDate);
        const end = formatDateToString(endDate);

        const response = await fetch(
            `${API_CONFIG.baseUrl}/availability?start=${start}&end=${end}`
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Availability Error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Calculates pricing for a stay from backend
 */
export const calculatePricing = async (propertyId, checkIn, checkOut, guests) => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/pricing`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                checkIn: formatDateToString(checkIn),
                checkOut: formatDateToString(checkOut),
                guests,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Pricing Error:', error);
        return { success: false, error: error.message };
    }
};

// =============================================================================
// INQUIRY API - Hospitable Integration
// =============================================================================

/**
 * Submits a contact inquiry to Hospitable via backend
 */
export const sendInquiry = async (inquiryData) => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/inquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiryData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Inquiry Error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Gets property data from backend
 */
export const getPropertyData = async () => {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/property`);
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Property Error:', error);
        return null;
    }
};

/**
 * Gets the configured property ID (now fetched from backend)
 */
export const getPropertyId = () => {
    // Property ID is now managed by backend
    return null;
};

// Export configuration for debugging
export const getApiConfig = () => ({
    ...API_CONFIG,
});
