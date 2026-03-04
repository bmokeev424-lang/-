import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Directions from './sections/Directions';
import Trainers from './sections/Trainers';
import Schedule from './sections/Schedule';
import Pricing from './sections/Pricing';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Contacts from './sections/Contacts';
import Footer from './sections/Footer';
import DirectionPage from './pages/DirectionPage';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Home page component
const HomePage = () => {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <Trainers />
        <Schedule />
        <Pricing />
        <Gallery />
        <Testimonials />
        <Contacts />
      </main>
      <Footer />
    </>
  );
};

// Direction page with header
const DirectionPageWithHeader = () => {
  return (
    <>
      <Header />
      <DirectionPage />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/direction/:directionId" element={<DirectionPageWithHeader />} />
      </Routes>
    </Router>
  );
}

export default App;
