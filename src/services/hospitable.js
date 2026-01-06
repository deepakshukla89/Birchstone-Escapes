/**
 * Hospitable API Service
 * Professional service layer for Hospitable API interactions
 */

const getHeaders = () => {
    const API_KEY = process.env.REACT_APP_HOSPITAL_API_KEY;
    if (!API_KEY) throw new Error('Hospitable API Key not found');

    return {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
};

// 1. Property Details
export const fetchPropertyDetails = async (propertyId) => {
    try {
        const response = await fetch(`/api/hospitable/v2/properties/${propertyId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error(`Property Details API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching property details:', error);
        return null;
    }
};

// 2. Property Images
export const fetchPropertyImages = async (propertyId) => {
    try {
        console.log(`Fetching images for: ${propertyId}`);
        const response = await fetch(`/api/hospitable/v2/properties/${propertyId}/images`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error(`Property Images API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching property images:', error);
        return null;
    }
};

/**
 * Combined review fetcher for property reviews (more common for general dashboards)
 */
export const fetchPropertyReviews = async (propertyId) => {
    try {
        const response = await fetch(`/api/hospitable/v2/properties/${propertyId}/reviews`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching property reviews:', error);
        return null;
    }
};

