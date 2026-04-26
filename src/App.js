import React from 'react';
import Navbar from './components/Navbar';
import About from './components/Aboutt';
import SkillsPage from './components/skills';
import AboutMe from './components/AboutMe';
import ServicesSection from './components/service';
import ContactPage from './components/ContactPage';
import Footer from './components/footer';
import "./css/BackgroundSmoke.css";
import ProjectsCardsInfinite from './components/ProjectsCardsInfinitt.tsx';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden max-w-full">

      {/* ── Ambient background layer ── */}
      <div className="smoke-background" aria-hidden="true">
        {/* Grid overlay rendered as a child div for clarity */}
        <div className="grid-overlay" />
      </div>

      {/* ── Sticky navigation ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main className="relative z-10">

        {/* Hero / About */}
        <section id="Home" className="relative">
          <About />
        </section>

        {/* Hairline divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* About Me */}
        <section id="aboutme" className="relative">
          <AboutMe />
        </section>

        <div className="section-divider" aria-hidden="true" />
        <section id="Services" className="relative">
          <ServicesSection />
        </section>

        {/* Skills */}
        <section id="skills" className="relative">
          <SkillsPage />
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Services */}


        <div className="section-divider" aria-hidden="true" />

        {/* Projects */}
        <section id="Projects" className="relative">
          <ProjectsCardsInfinite />
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Contact */}
        <section id="ContactPage" className="relative">
          <ContactPage />
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default App;