import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import AboutHero from '../components/about/AboutHero';
import OurPhilosophy from '../components/about/OurPhilosophy';
import WhatWeOffer from '../components/about/WhatWeOffer';
import MeetHost from '../components/about/MeetHost';
import OurPromise from '../components/about/OurPromise';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import BookingCard from '../components/common/BookingCard';

const About = () => {
    // About page testimonials
    const aboutTestimonials = [
        {
            text: "Our family absolutely loved this stay! The mountain views were breathtaking especially at sunrise and sunset. The home was spotless, cozy, and had everything we needed for a relaxing getaway. The host was friendly and responsive, making check-in and communication super easy. It was the perfect mix of peaceful nature and family comfort. We can’t wait to come back, highly recommend!",
            author: "Felix L."
        },
        {
            text: "We had an amazing stay! The house is beautiful, super private, and there’s so much to do. It’s peaceful, relaxing, and was exactly what we were hoping for for a weekend getaway. Vikas was an incredible host, super helpful and very responsive. We would definitely come back!",
            author: "Kath D."
        },
        {
            text: "A dream rental! The view is even better than the pictures, the amenities are amazing! This place is a gem. Vikas is an amazing host as well! Very proactive and has really thought of everything to create a peaceful and memorable stay. 10 stars!!!",
            author: "Meridith K."
        },
        {
            text: "The Airbnb was wonderful! We had an amazing stay. Everything was as described - even better in person. The house was fully renovated with all new appliances. Vikas was also a great host and very responsive if we had any questions. Highly recommend!",
            author: "Riya K."
        }
    ];

    const aboutFaqs = [
        {
            question: "Who is behind TimbrLux Stays?",
            answer: "TimbrLux Stays was created by host passionate about hospitality, design, and creating peaceful escapes where guests can truly unwind."
        },
        {
            question: "Are you hands-on hosts?",
            answer: "Yes. While we work with trusted local professionals, we remain closely involved in guest communication, property standards, and overall experience."
        },
        {
            question: "What kind of experience do you aim to provide?",
            answer: "A seamless, elevated stay that feels effortless—from booking to check-out—so guests can focus on enjoying their time away."
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
                <FAQ title="About Us FAQs" faqs={aboutFaqs} />
                <BookingCard />
            </main>
        </>
    );
};

export default About;
