import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import AboutHero from '../components/about/AboutHero';
import OurPhilosophy from '../components/about/OurPhilosophy';
import WhatWeOffer from '../components/about/WhatWeOffer';
import MeetHost from '../components/about/MeetHost';
import OurPromise from '../components/about/OurPromise';
import Testimonials from '../components/common/Testimonials';
import BookingCard from '../components/common/BookingCard';

const About = () => {
    // About page testimonials
    const aboutTestimonials = [
        {
            text: "From the moment we booked, we knew this would be special. The attention to detail and personal touch made our vacation unforgettable.",
            author: "Sarah & Tom"
        },
        {
            text: "Vikas is an incredible host! He went above and beyond to make sure everything was perfect. We've already booked our next stay.",
            author: "The Miller Family"
        },
        {
            text: "What sets Birchstone apart is the genuine care you feel. It's not just about the beautiful properties—it's about how they make you feel.",
            author: "Rachel K."
        },
        {
            text: "We've stayed at many vacation rentals, but nothing compares to the Birchstone experience. Truly world-class hospitality.",
            author: "James & Emily"
        }
    ];

    // Schema.org structured data for About page
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Birchstone Escapes",
        "description": "At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed homes, cared for with intention, and hosted with genuine warmth.",
        "url": "https://birchstoneescapes.com/about",
        "founder": {
            "@type": "Person",
            "name": "Vikas"
        },
        "sameAs": [
            "https://instagram.com/birchstoneescapes",
            "https://facebook.com/birchstoneescapes"
        ]
    };

    return (
        <>
            <SEOMetaTags
                title="About Us | Birchstone Escapes"
                description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed homes, cared for with intention, and hosted with genuine warmth."
                url="https://birchstoneescapes.com/about"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />

            <main className="about-page">
                <AboutHero />
                <OurPhilosophy />
                <WhatWeOffer />
                <MeetHost />
                <OurPromise />
                <Testimonials testimonials={aboutTestimonials} />
                <BookingCard />
            </main>
        </>
    );
};

export default About;
