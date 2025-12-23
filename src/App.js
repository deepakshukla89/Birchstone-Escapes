import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/common/Layout";
import HomepageScreen from "./pages/homeIndex";
import AboutPage from "./pages/aboutIndex";
import FrostPineChaletPage from "./pages/propertyIndex";

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
          <Route path="/property/frost-pine-chalet" element={<FrostPineChaletPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
