import React from 'react';
import SEOMetaTags from '../common/SEOMetaTags';
import Header from '../common/header';
import Footer from '../common/footer';
import './homepageScreen.css';

export default function HomepageScreen() {
  return (
    <>
      <SEOMetaTags
        title="Birchstone Escapes"
        description="At Birchstone Escapes, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation homes hosted with genuine warmth."
        url="https://birchstoneescapes.com"
      />
      <Header />

      Home page
      <Footer />
    </>
  );
}
