import React from 'react';
// Imports des composants
import Navbar from './components/Navbar';
import About from './components/Aboutt';
import SkillsPage from './components/skills';
import AboutMe from './components/AboutMe';
import ServicesSection from './components/service';
import ContactPage from './components/ContactPage';
import Footer from './components/footer';
import "./css/BackgroundSmoke.css";
// import Projects from './components/projects';
import ProjectsCardsInfinite from './components/ProjectsCardsInfinitt.tsx';
import TestimonialCarousel from './components/pr.jsx'

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden max-w-full">
      <div className="smoke-background" />
      <Navbar />

      <main className="relative z-10">

        <section id="Home">
          <About />
        </section>

        <section id="aboutme">
          <AboutMe />
        </section>

        <section id="skills">
          <SkillsPage />
        </section>

        <section id="Services">
          <ServicesSection />
        </section>

        <section id="Projects">
          <ProjectsCardsInfinite />
        </section>

        <section id="ContactPage">
          <ContactPage />
        </section>

      </main>

      <Footer />
    </div>
  );
}


export default App;