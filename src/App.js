import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/common/Layout";
import HomepageScreen from "./pages/homeIndex";
import AboutPage from "./pages/aboutIndex";
import FrostPineChaletPage from "./pages/propertyIndex";
import ContactPage from "./pages/Contact";
import BookingPage from "./pages/BookingPage";
import SearchPage from "./pages/SearchPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SignupOfferPopup from "./components/common/SignupOfferPopup";

// ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SignupOfferPopup />
      <Layout>
        <Routes>
          <Route path="/" element={<HomepageScreen />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/property/:id" element={<FrostPineChaletPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
