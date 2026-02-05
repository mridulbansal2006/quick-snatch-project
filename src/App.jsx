import React, { useLayoutEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import Flashback from "./components/Flashback";
import Registration from "./components/Registration";
import About from "./components/About";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => (
  <>
    <section id="hero">
      <Hero />
    </section>

    <section id="details">
      <EventDetails />
    </section>

    <section id="flashback">
      <Flashback />
    </section>
  </>
);

const AboutPage = () => (
  <section id="about-page" style={{ minHeight: "100vh", paddingTop: "80px" }}>
    <About />
  </section>
);

const JoinPage = () => (
  <section id="join-page" style={{ minHeight: "100vh" }}>
    <Registration />
  </section>
);

function App() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={mainRef} style={{ width: "100%", overflowX: "hidden" }}>
      {/* NAVBAR ALWAYS PRESENT */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
