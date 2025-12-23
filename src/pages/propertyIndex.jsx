import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import PropertyHero from '../components/property/PropertyHero';
import PropertyHighlights from '../components/property/PropertyHighlights';
import PropertyOffers from '../components/property/PropertyOffers';
import FacilitiesSection from '../components/property/FacilitiesSection';
// Assuming the CSS was moved to src/components/property/
import '../components/property/FrostPineChaletPage.css';

const PropertyIndex = () => {
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
        bookingLink: "https://airbnb.com/birchstoneescapes"
    };

    // Offers data organized by rows with their specific icons (72 total amenities)
    const offersRows = [
        // Row 1: Scenic & Bathroom (9 items)
        [
            { name: 'Mountain view', icon: <><path d="M24 30H3L7.84 16.13C10.19 9.38 11.37 6 13.5 6C15.51 6 16.67 9 18.77 15" stroke="#FFFAEA" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 30H33L26.11 18.99C23.82 15.33 22.68 13.5 21 13.5C19.32 13.5 18.18 15.33 15.89 18.99L13.69 22.5" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></> },
            { name: 'Bathroom', icon: <path d="M6 27H30M6 27V21C6 18 9 15 18 15C27 15 30 18 30 21V27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Bath', icon: <path d="M6 27H30V30H6V27ZM9 12C9 9 12 6 18 6C24 6 27 9 27 12V27H9V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Hair dryer', icon: <path d="M24 12C24 9 21 6 18 6V12M18 12H12C9 12 6 15 6 18V24C6 27 9 30 12 30H24C27 30 30 27 30 24V18C30 15 27 12 24 12H18Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Cleaning products', icon: <path d="M12 30L15 6H21L24 30M9 18H27M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Shampoo', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Conditioner', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Hot water', icon: <path d="M12 30C12 27 15 24 18 24C21 24 24 27 24 30M9 18C9 13 13 9 18 9C23 9 27 13 27 18C27 20 26 22 24 24H12C10 22 9 20 9 18Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Shower gel', icon: <path d="M18 6V12M15 12H21V27C21 28.66 19.66 30 18 30C16.34 30 15 28.66 15 27V12Z" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> }
        ],
        // Row 2: Bedroom & Laundry (12 items)
        [
            { name: 'Washing machine', icon: <path d="M6 9H30V27H6V9ZM18 15C20 15 21 16 21 18C21 20 20 21 18 21C16 21 15 20 15 18C15 16 16 15 18 15Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Free dryer', icon: <path d="M6 9H30V27H6V9ZM18 15C20 15 21 16 21 18C21 20 20 21 18 21C16 21 15 20 15 18C15 16 16 15 18 15Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Essentials', icon: <path d="M6 30V18L18 6L30 18V30H6ZM12 24H24M12 18H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Towels & sheets', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Hangers', icon: <path d="M12 6L18 12L24 6M12 30V12H24V30" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Bed linen', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Cotton linen', icon: <path d="M6 12H30V30H6V12ZM12 18H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Extra pillows', icon: <path d="M6 27H30M9 27V15C9 12 12 9 18 9C24 9 27 12 27 15V27M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Room-darkening blinds', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Iron', icon: <path d="M18 6V30M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Drying rack', icon: <path d="M6 12H30V18M6 24H30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Clothes storage', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 3: Entertainment (7 items)
        [
            { name: 'TV', icon: <path d="M6 6H30V24H6V6ZM12 30H24M18 24V30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Sound system', icon: <path d="M6 12H30V24H6V12ZM12 6V12M24 6V12M12 24V30M24 24V30" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Pool table', icon: <path d="M6 15H30V21H6V15ZM12 12H24M12 24H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Arcade games', icon: <path d="M9 12H27V24H9V12ZM12 18H15M21 18H24M15 21H21" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Books', icon: <path d="M6 6H30V30H6V6ZM12 12H24M12 18H24M12 24H18" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Cinema', icon: <path d="M6 9H30V27H6V9ZM12 12H24M12 15H24M12 18H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Theme room', icon: <path d="M6 6H30V30H6V6ZM18 6V30M6 18H30" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 4: Family (5 items)
        [
            { name: 'Cot', icon: <path d="M9 12H27V30H9V12ZM12 12V9C12 6 15 6 18 6C21 6 24 6 24 9V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Travel cot', icon: <path d="M9 12H27V30H9V12ZM12 12V9C12 6 15 6 18 6C21 6 24 6 24 9V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Tableware', icon: <path d="M12 24H24M9 18H27M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Fireplace guards', icon: <path d="M6 30V18H30V30M12 18V12M24 18V12" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Board games', icon: <path d="M6 6H30V30H6V6ZM12 12H24V24H12V12Z" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 5: Heating, Cooling & Safety (10 items)
        [
            { name: 'AC', icon: <path d="M6 9H30V18H6V9ZM9 18V27M27 18V27M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Ceiling fan', icon: <path d="M18 6V30M6 18H30M10 10L26 26M26 10L10 26" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Portable fans', icon: <path d="M18 6V30M6 18H30M10 10L26 26M26 10L10 26" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Heating', icon: <path d="M18 30V12M12 18H24M15 24H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Noise monitors', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6ZM18 12V18L22 22" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Security cameras', icon: <path d="M24 6L30 12L24 18M6 12H27M18 30V18C18 15 21 12 24 12" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> },
            { name: 'Smoke alarm', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'CO alarm', icon: <path d="M18 6C12 6 6 12 6 18C6 24 12 30 18 30C24 30 30 24 30 18C30 12 24 6 18 6Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Fire extinguisher', icon: <path d="M12 30L18 6L24 30M15 21H21" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'First aid kit', icon: <path d="M6 6H30V30H6V6ZM12 15H24M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> }
        ],
        // Row 6: Internet, Kitchen & Dining (19 items)
        [
            { name: 'Wifi', icon: <path d="M6 27C8.5 24 12 21 18 21C24 21 27.5 24 30 27M9 21C11 18.5 14 15 18 15C22 15 25 18.5 27 21M12 15C13.5 13 15.5 10 18 10C20.5 10 22.5 13 24 15M18 6V8" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Workspace', icon: <path d="M6 27H30V30H6V27ZM9 12H27V27H9V12ZM12 15V24M18 15V24M24 15V24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Kitchen', icon: <path d="M3 30V12H33V30M3 12V6H12V12M12 6H24V12M24 6H33V12M9 18H27M9 24H27" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Fridge', icon: <path d="M6 6H30V30H6V6ZM12 12H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Microwave', icon: <path d="M6 6H30V30H6V6ZM12 15H24M12 21H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Cooking basics', icon: <path d="M9 6H27V30H9V6ZM15 12H21M15 18H21" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Dishes', icon: <path d="M12 24H24M9 18H27M12 12H24" stroke="#FFFAEA" strokeWidth="1.5" strokeLinecap="round" /> },
            { name: 'Freezer', icon: <path d="M6 6H30V30H6V6ZM12 18H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Dishwasher', icon: <path d="M6 6H30V30H6V6ZM18 12C21 12 24 15 24 18C24 21 21 24 18 24C15 24 12 21 12 18C12 15 15 12 18 12Z" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Cooker', icon: <path d="M6 12H30M6 24H30M12 12V24M24 12V24" stroke="#FFFAEA" strokeWidth="1.5" /> },
            { name: 'Oven', icon: <path d="M6 6H30V30H6V6ZM12 12H24M12 18H24" stroke="#FFFAEA" strokeWidth="1.5" /> },
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
                title={`${property.name} | Birchstone Escapes`}
                description={property.description}
                url={`https://birchstoneescapes.com/property/frost-pine-chalet`}
            />

            <main className="property-page">
                <PropertyHero property={property} schemaData={schemaData} />
                <PropertyHighlights />
                <FacilitiesSection />
                <PropertyOffers offersRows={offersRows} />
            </main>
        </>
    );
};

export default PropertyIndex;
