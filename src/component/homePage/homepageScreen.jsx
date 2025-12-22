import React from 'react';
import SEOMetaTags from '../common/SEOMetaTags';
import Hero from '../common/Hero';
import AboutSection from '../common/AboutSection';
import FeaturesSection from '../common/FeaturesSection';
import HowToBook from '../common/HowToBook';
import ExperienceSection from '../common/ExperienceSection';
import Testimonials from '../common/Testimonials';
import FAQ from '../common/FAQ';
import BookingCard from '../common/BookingCard';
import './homepageScreen.css';

export default function HomepageScreen() {
  // Custom FAQs
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
      answer: "You can reach us anytime through the Airbnb messaging system, or via email at hello@birchstoneescapes.com. We typically respond within a few hours."
    }
  ];

  return (
    <>
      <SEOMetaTags
        title="Birchstone Escapes | Luxury Vacation Rentals"
        description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation homes hosted with genuine warmth."
        url="https://birchstoneescapes.com"
      />

      <main className="homepage">
        {/* Hero Section */}
        <Hero />

        {/* About Us */}
        <AboutSection />

        {/* Features/Amenities */}
        <FeaturesSection />

        {/* How To Book */}
        <HowToBook />

        {/* How It Works - Experience */}
        <ExperienceSection />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ faqs={homeFaqs} />

        {/* Booking Card - Above Footer */}
        <BookingCard />
      </main>
    </>
  );
}
