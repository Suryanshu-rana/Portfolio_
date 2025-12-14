import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills'; 
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const Footer: React.FC = () => (
  <footer className="bg-black py-8 border-t border-white/10">
    <div className="container mx-auto px-6 text-center">
      <p className="text-white font-bold text-lg mb-2">Suryanshu's Portfolio</p>
      <p className="text-gray-500 text-sm mb-4">Thank you for visiting my personal portfolio website. Connect with me over socials.</p>
      <p className="text-gray-600 text-xs">
        Designed with <i className="fas fa-heart text-android mx-1"></i> by Suryanshu Rana
      </p>
    </div>
  </footer>
);

const App: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    // Select all sections except the first one (Hero) to animate them on scroll
    // Hero animates on load via its own internal logic or default css
    document.querySelectorAll('section:not(#home)').forEach((section) => {
      section.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-android-bg text-gray-300 font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;