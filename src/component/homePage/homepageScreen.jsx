import React from 'react';
import SEOMetaTags from '../common/SEOMetaTags';
import BookingCard from '../common/BookingCard';
import './homepageScreen.css';

export default function HomepageScreen() {
  return (
    <>
      <SEOMetaTags
        title="Birchstone Escapes"
        description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation homes hosted with genuine warmth."
        url="https://birchstoneescapes.com"
      />

      <div className="homepage">
        {/* Hero and other sections will go here */}
        <p style={{ padding: '100px 20px', textAlign: 'center' }}>Home page content coming soon...</p>

        {/* Booking Card - Above Footer */}
        <BookingCard />
      </div>
    </>
  );
}
