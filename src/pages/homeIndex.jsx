import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowToBook from '../components/home/HowToBook';
import ExperienceSection from '../components/common/ExperienceSection';
import AccommodationsSection from '../components/home/AccommodationsSection';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import BookingCard from '../components/common/BookingCard';
// If homepageScreen.css was moved to home/
import '../components/home/homepageScreen.css';

const HomeIndex = () => {
    const homeFaqs = [
        {
            question: "What is included in my stay?",
            answer: "Every stay includes fresh linens, towels, toiletries, a fully equipped kitchen, high-speed WiFi, and access to all property amenities. We also provide a welcome guide with local recommendations."
        },
        {
            question: "What is the check-in and check-out time?",
            answer: "Check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
        },
        {
            question: "Is the property pet-friendly?",
            answer: "Some of our properties welcome pets! Please check the individual property listing for pet policies, or contact us directly with questions about your furry friend."
        },
        {
            question: "How do I contact the host?",
            answer: "You can reach us anytime through the Airbnb messaging system, or via email at hello@timbrluxstays.com. We typically respond within a few hours."
        }
    ];

    return (
        <>
            <SEOMetaTags
                title="TimbrLux Stays | Luxury Vacation Rentals"
                description="At TimbrLux Stays, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation home hosted with genuine warmth."
                url="https://timbrluxstays.com"
            />

            <main className="homepage">
                <Hero />
                <AccommodationsSection />
                <AboutSection />
                <FeaturesSection />
                <HowToBook />
                <ExperienceSection />
                <Testimonials />
                <FAQ faqs={homeFaqs} />
                <BookingCard />
            </main>
        </>
    );
};

export default HomeIndex;
