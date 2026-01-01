import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/common/Layout";
import HomepageScreen from "./pages/homeIndex";
import AboutPage from "./pages/aboutIndex";
import FrostPineChaletPage from "./pages/propertyIndex";
import ContactPage from "./pages/Contact";
import BookingPage from "./pages/BookingPage";
import SearchPage from "./pages/SearchPage";

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
      <Layout>
        <Routes>
          <Route path="/" element={<HomepageScreen />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/property/:id" element={<FrostPineChaletPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
