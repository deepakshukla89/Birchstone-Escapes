const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || `Server Error: ${response.status}` };
        }
        return data;
    } catch (error) {
        console.error('API Error (Contact):', error);
        return { success: false, message: 'Could not connect to the backend. Is the server running?' };
    }
};

export const subscribeNewsletter = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (!response.ok) {
            return { success: false, message: data.message || `Server Error: ${response.status}` };
        }
        return data;
    } catch (error) {
        console.error('API Error (Subscribe):', error);
        return { success: false, message: 'Could not connect to the backend. Is the server running?' };
    }
};
