import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import Mobile from './components/Mobile';
import MobileDetector from './components/MobileDetector';

function App() {
  return (
    <Router>
      <MobileDetector>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/mobile" element={<Mobile />} />
        </Routes>
      </MobileDetector>
    </Router>
  );
}

export default App;
