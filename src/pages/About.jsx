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
            text: "What sets TimbrLux apart is the genuine care you feel. It's not just about the beautiful property—it's about how they make you feel.",
            author: "Rachel K."
        },
        {
            text: "We've stayed at many vacation rentals, but nothing compares to the TimbrLux experience. Truly world-class hospitality.",
            author: "James & Emily"
        }
    ];

    // Schema.org structured data for About page
    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TimbrLux Stays",
        "description": "At TimbrLux Stays, we believe a great stay is more than a getaway — it's a feeling. A beautifully designed home, cared for with intention, and hosted with genuine warmth.",
        "url": "https://timbrluxstays.com/about",
        "founder": {
            "@type": "Person",
            "name": "Vikas"
        },
        "sameAs": [
            "https://instagram.com/timbrluxstays",
            "https://facebook.com/timbrluxstays"
        ]
    };

    return (
        <>
            <SEOMetaTags
                title="About Us | TimbrLux Stays"
                description="At TimbrLux Stays, we believe a great stay is more than a getaway — it's a feeling. A beautifully designed home, cared for with intention, and hosted with genuine warmth."
                url="https://timbrluxstays.com/about"
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
