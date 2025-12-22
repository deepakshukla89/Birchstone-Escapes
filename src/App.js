import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomepageScreen from "./component/homePage/homepageScreen";

// ScrollToTop component to handle scroll position on page navigation
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
      <Routes>
        <Route path="/" element={<HomepageScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
