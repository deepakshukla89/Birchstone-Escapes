import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOMetaTags from '../components/common/SEOMetaTags';
import PropertyHero from '../components/property/PropertyHero';
import PropertyHighlights from '../components/property/PropertyHighlights';
import PropertyOffers from '../components/property/PropertyOffers';
import HouseRules from '../components/property/HouseRules';
import FacilitiesSection from '../components/property/FacilitiesSection';
import VisualJournal from '../components/property/VisualJournal';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import BookingCard from '../components/common/BookingCard';
import PropertyBookingSection from '../components/property/PropertyBookingSection';
import { fetchPropertyDetails, fetchPropertyImages } from '../services/hospitable';
import '../components/property/FrostPineChaletPage.css';
import BookingModal from './BookingModal';

const PropertyIndex = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [propertyImages, setPropertyImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const loadApiDashboard = async () => {
        const PROPERTY_ID = process.env.REACT_APP_PROPERTY_ID;
        setIsLoading(true);
        setError(null);

        console.log("=== INITIATING PARALLEL API DASHBOARD LOGS ===");
        console.log("Using Property ID:", PROPERTY_ID);

        try {
            // Execute both API calls in parallel
            const [details, imagesResponse] = await Promise.all([
                fetchPropertyDetails(PROPERTY_ID),
                fetchPropertyImages(PROPERTY_ID)
            ]);

            console.log("1. PROPERTY DETAILS RESPONSE:", details);
            console.log("2. PROPERTY IMAGES RESPONSE:", imagesResponse);

            if (imagesResponse && imagesResponse.data) {
                setPropertyImages(imagesResponse.data);
            } else if (!imagesResponse) {
                throw new Error("Failed to load images from API");
            }

            setIsLoading(false);
        } catch (error) {
            console.error("Error in parallel dashboard load:", error);
            setError(error.message || "Something went wrong while fetching data");
            setIsLoading(false);
        }

        console.log("=== API DASHBOARD LOGS COMPLETE ===");
    };

    // Fetch API Data on mount
    useEffect(() => {
        loadApiDashboard();
    }, []);

    const handleOpenBooking = () => setIsBookingModalOpen(true);
    const handleCloseBooking = () => setIsBookingModalOpen(false);

    // Auto-open booking modal if search params are present (coming from search page)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has('checkin') || params.has('checkout')) {
            setIsBookingModalOpen(true);
        }
    }, [location.search]);

    // Property data
    const property = {
        name: "Frost Pine Chalet",
        tagline: "where contemporary comfort meets mountain serenity.",
        description: `This thoughtfully designed retreat invites you to slow down and breathe deeply. Wake to misty mornings framed by pines, unwind by the crackling fire, soak under starry skies in the private hot tub. With panoramic windows, cozy corners, and modern amenities, every detail is designed for genuine rest and connection. 
        Perfect for families, couples, or friends seeking an authentic mountain escape—away from screens, closer to nature, and completely yours.`,
        rating: 5.0,
        reviews: 9,
        location: "Entire home in Newry, Maine",
        image: `${process.env.PUBLIC_URL}/image/pd1.png`,
        bookingLink: "/ready-to-book/frost-pine-chalet"
    };

    // Property-specific testimonials
    const propertyTestimonials = [
        {
            text: "This is an outstanding home! Came upon this cabin by chance when we were looking for a family vacation. It's a true gem! The views are breathtaking, and the place has such a calm and private feel. It was spotless! The kitchen is fully stocked for meal prep which was important to us. Enjoyed quiet mornings drinking coffee on the deck watching the beautiful light in the trees. There was an amazing sense of peace all around. We really didn't want to leave to visit the town. There were so many amenities. There is a hot tub, game room, and sauna we enjoyed. We spent evenings at the fire pit with our family. Vikas was a wonderland responsive host. We're definitely coming back!",
            author: "Sangeeta P."
        },
        {
            text: "Met a couple of other families to reconnect and take advantage of the outdoor activities in the area. The house is great for that. it provides large communal areas to hang out with family/friends and it's close to local activities. The house does not disappoint. It looks as good as the pictures. The view of the mountain is amazing. We enjoyed watching New Year's fireworks from the living room.",
            author: "Kevin H."
        },
        {
            text: "Amazing view! My family had a lot fun and everything was great.",
            author: "Diogo L."
        },
        {
            text: "My family and I had a great weekend during our stay, the environment was extremely clean, we received all the instructions and arrived at the place easily, they always responded to us kindly and quickly, very comfortable, great view, we are looking forward to returning, the price is very fair with everything they offer, we loved it, thank you and see you soon.",
            author: "Kerollen S."
        },
        {
            text: "We had such a great experience staying here! The home was private and luxurious. The home was spotless, beautifully decorated, and had everything we needed for a relaxing stay. We especially loved the deck with lovely view of the mountains. The location was perfect—close to Sunday river, peaceful and quiet. Communication with the host was easy and quick, and check-in was seamless. We will love to come back and stay here again.",
            author: "Christina K."
        },
        {
            text: "Such a beautiful, warm, welcoming house! Has everything you need for a relaxing mountain or ski getaway! We absolutely would come back and just lovedddd this house! Host was easy to reach, answered any questions quickly, check in was easy!",
            author: "Maddy B."
        }
    ];

    // Property-specific FAQs
    const propertyFaqs = [
        {
            question: "What is the check-in and check-out time at Frost Pine Chalet?",
            answer: "Check-in is at 4:00 PM EST and check-out is at 10:00 AM EST. Early check-in or late check-out may be available upon request, subject to availability. We use a smart lock for self check-in, so you'll receive a unique code before your arrival."
        },
        {
            question: "Is the hot tub available year-round?",
            answer: "Yes! The private hot tub is available year-round and is regularly maintained. It's especially magical during winter with snow falling around you, or in summer under the starry mountain sky."
        },
        {
            question: "How far is Frost Pine Chalet from the nearest ski resort?",
            answer: "The chalet is located just 13 mins from Sunday River Ski Resort, making it perfect for ski trips. We provide a ski storage area and boot warmers for your convenience."
        },
        {
            question: "Is the property pet-friendly?",
            answer: "For the comfort and safety of all our guests, pets are not permitted at Frost Pine Chalet. We maintain a strict no-pet policy to ensure the highest standards of cleanliness and to accommodate guests with allergies."
        },
        {
            question: "What's included in the kitchen?",
            answer: "The fully-equipped kitchen features Fisher & Paykel appliances, a built-in wine fridge, Nespresso coffee maker, high-end cookware, and all the essentials for preparing meals. We also provide basic pantry items like coffee, tea, oil, and spices."
        },
        {
            question: "Is there WiFi and what's the speed like?",
            answer: "Yes, we have high-speed WiFi (100+ Mbps) throughout the property. It's perfect for streaming, video calls, or remote work. We also have a dedicated workspace area if you need to get some work done."
        }
    ];

    // Offers data organized by rows with their specific icons (72 total amenities)
    const offersRows = [
        // Row 1: Scenic & Bathroom (8 items - removed Hot water)
        [

            { name: 'Bathroom', icon: <path d="M6 27H30M6 27V21C6 18 9 15 18 15C27 15 30 18 30 21V27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Bath', icon: <path d="M6 27H30V30H6V27ZM9 12C9 9 12 6 18 6C24 6 27 9 27 12V27H9V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Hair dryer', icon: <path d="M24 12C24 9 21 6 18 6V12M18 12H12C9 12 6 15 6 18V24C6 27 9 30 12 30H24C27 30 30 27 30 24V18C30 15 27 12 24 12H18Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Cleaning products', icon: <path d="M12 30L15 6H21L24 30M9 18H27M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Shampoo', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Conditioner', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Shower gel', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> }
        ],
        // Row 2: Bedroom & Laundry (12 items)
        [
            { name: 'Washing machine', icon: <path d="M6 9H30V27H6V9ZM18 15C20 15 21 16 21 18C21 20 20 21 18 21C16 21 15 20 15 18C15 16 16 15 18 15Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Dryer', icon: <path d="M6 9H30V27H6V9ZM18 15C20 15 21 16 21 18C21 20 20 21 18 21C16 21 15 20 15 18C15 16 16 15 18 15Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Essentials', icon: <path d="M6 30V18L18 6L30 18V30H6ZM12 24H24M12 18H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Towels & sheets', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Hangers', icon: <path d="M12 6L18 12L24 6M12 30V12H24V30" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Bed linen', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Cotton linen', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },

            { name: 'Room-darkening blinds', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Iron', icon: <path d="M18 6V30M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Drying rack', icon: <path d="M6 12H30V18M6 24H30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Clothes storage', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 3: Entertainment (5 items - removed Books, Cinema)
        [
            { name: 'TV', icon: <path d="M6 6H30V24H6V6ZM12 30H24M18 24V30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Sound system', icon: <path d="M6 12H30V24H6V12ZM12 6V12M24 6V12M12 24V30M24 24V30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Pool table', icon: <path d="M6 15H30V21H6V15ZM12 12H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Arcade games', icon: <path d="M9 12H27V24H9V12ZM12 18H15M21 18H24M15 21H21" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Theme room', icon: <path d="M6 6H30V30H6V6ZM18 6V30M6 18H30" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 4: Family (4 items - removed Cot)
        [
            { name: 'Travel cot', icon: <path d="M9 12H27V30H9V12ZM12 12V9C12 6 15 6 18 6C21 6 24 6 24 9V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Tableware', icon: <path d="M12 24H24M9 18H27M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Fireplace guards', icon: <path d="M6 30V18H30V30M12 18V12M24 18V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Board games', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 5: Heating, Cooling & Safety (10 items)
        [
            { name: 'AC', icon: <path d="M6 9H30V18H6V9ZM9 18V27M27 18V27M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Ceiling fan', icon: <path d="M18 6V30M6 18H30M10 10L26 26M26 10L10 26" stroke="#FFFAEA" strokeWidth="1.5" /> },

            { name: 'Heating', icon: <path d="M18 30V12M12 18H24M15 24H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Noise monitors', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6ZM18 12V18L22 22" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Outdoor Security Cameras', icon: <path d="M24 6L30 12L24 18M6 12H27M18 30V18C18 15 21 12 24 12" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Smoke alarm', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'CO alarm', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Fire extinguisher', icon: <path d="M12 30L18 6L24 30M15 21H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'First aid kit', icon: <path d="M6 6H30V30H6V6ZM12 15H24M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 6: Internet, Kitchen & Dining (17 items - removed Cooker, Cooking basics; renamed Fridge)
        [
            { name: 'Wifi', icon: <path d="M6 27C8.5 24 12 21 18 21C24 21 27.5 24 30 27M9 21C11 18.5 14 15 18 15C22 15 25 18.5 27 21M12 15C13.5 13 15.5 10 18 10C20.5 10 22.5 13 24 15M18 6V8" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Workspace', icon: <path d="M6 27H30V30H6V27ZM9 12H27V27H9V12ZM12 15V24M18 15V24M24 15V24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Kitchen', icon: <path d="M3 30V12H33V30M3 12V6H12V12M12 6H24V12M24 6H33V12M9 18H27M9 24H27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Refrigerator', icon: <path d="M6 6H30V30H6V6ZM12 12H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Microwave', icon: <path d="M6 6H30V30H6V6ZM12 15H24M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Dishes', icon: <path d="M12 24H24M9 18H27M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },

            { name: 'Dishwasher', icon: <path d="M6 6H30V30H6V6ZM18 12C21 12 24 15 24 18C24 21 21 24 18 24C15 24 12 21 12 18C12 15 15 12 18 12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },

            { name: 'Kettle', icon: <path d="M12 6H24V18H12V6ZM9 18H27V30H9V18Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Coffee maker', icon: <path d="M12 6H24V24H12V6ZM15 24V30M21 24V30M9 30H27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Wine glasses', icon: <path d="M12 6C12 12 6 18 6 24C6 27 9 30 12 30H24C27 30 30 27 30 24C30 18 24 12 24 6" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Toaster', icon: <path d="M6 6H30V18H6V6ZM12 18V30M24 18V30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Blender', icon: <path d="M12 6H24V24H12V6ZM12 24L6 30M24 24L30 30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'BBQ utensils', icon: <path d="M18 6V30M12 12H24M12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Dining table', icon: <path d="M6 12H30V24H6V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Coffee', icon: <path d="M18 6V12M15 12H21L18 30" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> }
        ],
        // Row 7: Outdoor (7 items)
        [
            { name: 'Private entrance', icon: <path d="M9 30V18L18 9L27 18V30H9ZM15 24H21M15 18H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Patio', icon: <path d="M6 24H30V30H6V24ZM9 12H27V24H9V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Garden', icon: <path d="M6 30H30M12 24V30M24 24V30M9 24H27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Firepit', icon: <path d="M18 12C12 18 9 24 9 27C9 30 12 30 18 30C24 30 27 30 27 27C27 24 24 18 18 12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Outdoor furniture', icon: <path d="M6 18H30V30H6V18ZM12 18V12M24 18V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Outdoor dining', icon: <path d="M6 12H30V24H6V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'BBQ grill', icon: <path d="M18 6V12M18 18C12 18 6 21 6 27H30C30 21 24 18 18 18ZM18 18V12" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> }
        ],
        // Row 8: Parking & Services (6 items)
        [
            { name: 'Free parking', icon: <path d="M27 12V9C27 7.34 25.66 6 24 6H12C10.34 6 9 7.34 9 9V12M6 12H30V27C30 28.66 28.66 30 27 30H9C7.34 30 6 28.66 6 27V12ZM12 18H12.01M24 18H24.01M12 24H12.01M24 24H24.01" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Street parking', icon: <path d="M27 12V9C27 7.34 25.66 6 24 6H12C10.34 6 9 7.34 9 9V12M6 12H30V27C30 28.66 28.66 30 27 30H9C7.34 30 6 28.66 6 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Hot tub', icon: <path d="M12 30C12 27 15 24 18 24C21 24 24 27 24 30M9 18C9 13 13 9 18 9C23 9 27 13 27 18C27 20 26 22 24 24H12C10 22 9 20 9 18Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Private sauna', icon: <path d="M6 30V18H30V30H6ZM12 18V12C12 9 15 6 18 6C21 6 24 9 24 12V18M15 24H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Self check-in', icon: <path d="M9 30V18L18 9L27 18V30H9ZM15 24H21M15 18H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Smart lock', icon: <path d="M18 6V12M12 18H6M30 18H24M18 24V30M12 12L9 9M24 12L27 9M12 24L9 27M24 24L27 27" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> }
        ]
    ];

    // Schema.org structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": property.name,
        "description": property.description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Newry",
            "addressRegion": "Maine",
            "addressCountry": "United States"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": property.rating,
            "reviewCount": property.reviews
        },
        "image": property.image
    };

    return (
        <>
            <SEOMetaTags
                title={`${property.name} | TimbrLux Stays`}
                description={property.description}
                url={`https://timbrluxstays.com/property/1967238`}
            />

            <main className="property-page">
                <PropertyHero
                    property={property}
                    images={propertyImages}
                    isLoading={isLoading}
                    error={error}
                    onReload={loadApiDashboard}
                    schemaData={schemaData}
                    onBookNow={handleOpenBooking}
                />
                <PropertyHighlights />
                <FacilitiesSection />
                <PropertyOffers offersRows={offersRows} />
                <HouseRules />
                <PropertyBookingSection
                    onBookNow={handleOpenBooking}
                    propertyName={property.name}
                />
                <VisualJournal images={propertyImages} isLoading={isLoading} />
                <Testimonials testimonials={propertyTestimonials} />
                <FAQ title="Frost Pine Chalet FAQs" faqs={propertyFaqs} />
                <BookingCard onBookNow={handleOpenBooking} />
            </main>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={handleCloseBooking}
                propertyName={property.name}
            />
        </>
    );
};

export default PropertyIndex;

