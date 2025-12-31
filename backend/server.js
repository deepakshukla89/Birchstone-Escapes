/**
 * Birchstone Escapes - Backend Server
 * Handles Hospitable API integration for property and inquiries
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================================================
// MIDDLEWARE
// =============================================================================

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// =============================================================================
// CONFIGURATION
// =============================================================================

const HOSPITABLE_CONFIG = {
    baseUrl: (process.env.HOSPITABLE_API_BASE_URL || 'https://public.api.hospitable.com/v2').trim(),
    token: (process.env.HOSPITABLE_API_TOKEN || '').trim(),
    propertyId: (process.env.HOSPITABLE_PROPERTY_ID || '').trim(),
};

// Cache for property data (to avoid repeated API calls)
let cachedPropertyData = null;
let cacheExpiry = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for calendar data
let cachedCalendarData = null;
let calendarCacheExpiry = 0;
const CALENDAR_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
};

// Hospitable API helper
const hospitable = async (endpoint, options = {}) => {
    const url = `${HOSPITABLE_CONFIG.baseUrl}${endpoint}`;
    console.log(`📡 Calling Hospitable API: ${url}`);

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${HOSPITABLE_CONFIG.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
    });

    const responseText = await response.text();
    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
        console.error(`❌ Hospitable API Error: ${response.status} - ${responseText}`);
        throw new Error(`Hospitable API Error: ${response.status} - ${responseText}`);
    }

    return JSON.parse(responseText);
};

// Fetch property data from Hospitable API
const fetchPropertyFromHospitable = async () => {
    // Check cache first
    if (cachedPropertyData && Date.now() < cacheExpiry) {
        console.log('📦 Using cached property data');
        return cachedPropertyData;
    }

    console.log('🔄 Fetching property data from Hospitable...');

    try {
        // Fetch property details
        const propertyData = await hospitable(`/properties/${HOSPITABLE_CONFIG.propertyId}`);
        const property = propertyData.data;

        console.log('✅ Property data fetched:', property.name);
        console.log('📦 HOSPITABLE PROPERTY RESPONSE:', JSON.stringify(propertyData, null, 2));

        // Build normalized property object
        const normalizedData = {
            id: property.id,
            name: property.name || 'Vacation Property',
            location: property.address ?
                `${property.address.city || ''}, ${property.address.state || property.address.region || ''}`.trim().replace(/^,\s*|,\s*$/g, '')
                : 'Location not available',
            address: property.address || {},
            maxGuests: property.accommodates || property.guests || 8,
            bedrooms: property.bedrooms || 4,
            bathrooms: property.bathrooms || 3,
            description: property.summary || property.description || '',
            amenities: property.amenities || [],
            images: property.photos || property.images || [],
            pricing: {
                baseRate: property.base_price || property.price?.base || 250,
                cleaningFee: property.cleaning_fee || property.price?.cleaning || 150,
                serviceFeePercent: 12,
                taxPercent: property.tax_rate || 10,
                minNights: property.minimum_nights || property.min_nights || 3,
                maxNights: property.maximum_nights || property.max_nights || 30,
                currency: property.currency || 'USD',
            },
            checkInTime: property.check_in_time || '16:00',
            checkOutTime: property.check_out_time || '11:00',
            houseRules: property.house_rules || '',
        };

        // Cache the data
        cachedPropertyData = normalizedData;
        cacheExpiry = Date.now() + CACHE_DURATION;

        return normalizedData;
    } catch (error) {
        console.error('❌ Failed to fetch property from Hospitable:', error.message);

        // Return fallback data if API fails
        return {
            name: 'Frost Pine Chalet',
            location: 'Newry, Maine',
            maxGuests: 8,
            bedrooms: 4,
            bathrooms: 3,
            pricing: {
                baseRate: 250,
                cleaningFee: 150,
                serviceFeePercent: 12,
                taxPercent: 10,
                minNights: 3,
                maxNights: 30,
            },
            _fallback: true,
            _error: error.message
        };
    }
};

// =============================================================================
// API ROUTES
// =============================================================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        propertyId: HOSPITABLE_CONFIG.propertyId ? 'configured' : 'missing',
        hasToken: !!HOSPITABLE_CONFIG.token
    });
});

// Get property data from Hospitable API
app.get('/api/property', async (req, res) => {
    try {
        const propertyData = await fetchPropertyFromHospitable();
        console.log('🏠 /api/property - Sending response:', JSON.stringify(propertyData, null, 2));
        res.json({
            success: true,
            data: propertyData,
            cached: !!(cachedPropertyData && Date.now() < cacheExpiry)
        });
    } catch (error) {
        console.error('Property API Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get property availability/calendar from Hospitable
// Returns exact Hospitable calendar structure with caching
app.get('/api/availability', async (req, res) => {
    try {
        const { start, end } = req.query;
        const startDate = start || formatDate(new Date());
        // Limit to 30 days (1 month) from today
        const endDate = end || formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

        // Check calendar cache first
        if (cachedCalendarData && Date.now() < calendarCacheExpiry) {
            console.log('📅 Using cached calendar data');
            return res.json({
                success: true,
                data: cachedCalendarData
            });
        }

        console.log(`📅 Fetching calendar: ${startDate} to ${endDate}`);

        const calendarData = await hospitable(
            `/properties/${HOSPITABLE_CONFIG.propertyId}/calendar?start=${startDate}&end=${endDate}`
        );

        console.log('📅 HOSPITABLE CALENDAR RESPONSE:', JSON.stringify(calendarData, null, 2));

        const propertyData = await fetchPropertyFromHospitable();

        // Pass exact Hospitable calendar structure - no transformation
        const responseData = {
            propertyId: HOSPITABLE_CONFIG.propertyId,
            propertyName: propertyData.name,
            // Pass the entire days array exactly as-is from Hospitable
            calendar: calendarData.data?.days || [],
            minNights: propertyData.pricing?.minNights || 3,
            maxNights: propertyData.pricing?.maxNights || 30,
            maxGuests: propertyData.maxGuests || 8,
        };

        // Cache the calendar data
        cachedCalendarData = responseData;
        calendarCacheExpiry = Date.now() + CALENDAR_CACHE_DURATION;

        console.log(`📅 Returning ${responseData.calendar.length} days of calendar data (cached for 2 min)`);

        res.json({
            success: true,
            data: responseData
        });
    } catch (error) {
        console.error('Availability Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Calculate pricing (using Hospitable data)
app.post('/api/pricing', async (req, res) => {
    try {
        const { checkIn, checkOut, guests } = req.body;
        console.log('💰 /api/pricing - Request:', { checkIn, checkOut, guests });

        const propertyData = await fetchPropertyFromHospitable();
        console.log('💰 Property pricing data from Hospitable:', JSON.stringify(propertyData.pricing, null, 2));

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        if (nights < propertyData.pricing.minNights) {
            return res.status(400).json({
                success: false,
                error: `Minimum stay is ${propertyData.pricing.minNights} nights`
            });
        }

        const { baseRate, cleaningFee, serviceFeePercent, taxPercent } = propertyData.pricing;

        const accommodationTotal = baseRate * nights;
        const serviceFee = Math.round(accommodationTotal * (serviceFeePercent / 100));
        const subtotal = accommodationTotal + cleaningFee + serviceFee;
        const taxes = Math.round(subtotal * (taxPercent / 100));
        const total = subtotal + taxes;

        // Discounts
        let discount = 0;
        let discountLabel = null;
        if (nights >= 14) {
            discount = Math.round(accommodationTotal * 0.15);
            discountLabel = 'Monthly discount (15%)';
        } else if (nights >= 7) {
            discount = Math.round(accommodationTotal * 0.10);
            discountLabel = 'Weekly discount (10%)';
        }

        const pricingResponse = {
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
            total: total - discount,
            currency: propertyData.pricing.currency || 'USD',
            currencySymbol: '$',
        };

        console.log('💰 /api/pricing - Sending response:', JSON.stringify(pricingResponse, null, 2));

        res.json({
            success: true,
            data: pricingResponse
        });
    } catch (error) {
        console.error('Pricing Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// =============================================================================
// INQUIRY API - Local Logging (Hospitable doesn't support creating inquiries)
// =============================================================================

// Handle contact form inquiries
// Note: Hospitable API only supports GET for inquiries, not POST
// This endpoint logs the inquiry and can be extended to send emails
app.post('/api/inquiries', async (req, res) => {
    try {
        const { name, email, phone, dates, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, email, and message are required'
            });
        }

        // Log the inquiry (can be stored in database or sent via email)
        const inquiry = {
            id: `inq_${Date.now()}`,
            name,
            email,
            phone: phone || null,
            dates: dates || null,
            message,
            receivedAt: new Date().toISOString(),
        };

        console.log('📧 ═══════════════════════════════════════════════════════');
        console.log('📧 NEW INQUIRY RECEIVED');
        console.log('📧 ═══════════════════════════════════════════════════════');
        console.log(`📧 From: ${name} <${email}>`);
        if (phone) console.log(`📧 Phone: ${phone}`);
        if (dates) console.log(`📧 Dates: ${dates}`);
        console.log(`📧 Message: ${message}`);
        console.log('� ═══════════════════════════════════════════════════════');

        // TODO: Add email notification here using nodemailer if needed
        // await sendEmailNotification(inquiry);

        res.json({
            success: true,
            data: {
                inquiryId: inquiry.id,
                status: 'received',
                receivedAt: inquiry.receivedAt,
                message: 'Thank you for your inquiry! Our team will get back to you within 24 hours.',
            }
        });
    } catch (error) {
        console.error('❌ Inquiry Error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to submit inquiry'
        });
    }
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, async () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║         🏠 Birchstone Escapes Backend Server               ║
╠════════════════════════════════════════════════════════════╣
║  Status:      ✅ Running                                    ║
║  Port:        ${PORT}                                          ║
║  Property ID: ${HOSPITABLE_CONFIG.propertyId ? '✅ Configured' : '❌ Missing'}                              ║
║  API Token:   ${HOSPITABLE_CONFIG.token ? '✅ Configured' : '❌ Missing'}                              ║
╚════════════════════════════════════════════════════════════╝
    `);

    // Pre-fetch and cache property data on startup
    if (HOSPITABLE_CONFIG.propertyId && HOSPITABLE_CONFIG.token) {
        console.log('🔄 Pre-fetching property data...');
        try {
            const property = await fetchPropertyFromHospitable();
            console.log(`✅ Property loaded: ${property.name} - ${property.location}`);
        } catch (error) {
            console.error('❌ Failed to pre-fetch property:', error.message);
        }
    }
});
