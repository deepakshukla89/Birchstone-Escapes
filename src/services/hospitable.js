const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// 1. Property Details
export const fetchPropertyDetails = async (propertyId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/hospitable/properties/${propertyId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
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
        const response = await fetch(`${API_BASE_URL}/hospitable/properties/${propertyId}/images`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`Property Images API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching property images:', error);
        return null;
    }
};

/**
 * Combined review fetcher for property reviews
 */
export const fetchPropertyReviews = async (propertyId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/hospitable/properties/${propertyId}/reviews`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching property reviews:', error);
        return null;
    }
};

