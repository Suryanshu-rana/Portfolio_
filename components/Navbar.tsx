import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'light' || stored === 'dark' ? (stored as 'light' | 'dark') : 'dark';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const smoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId.replace('#', ''));
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80; // 80px offset for navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // Duration in ms
    let start: number | null = null;

    // Cubic Easing function for a unique "heavy" smooth feel
    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-[#15171c]/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => smoothScroll(e, 'home')}
          className="text-2xl font-bold font-mono text-gray-900 dark:text-white tracking-tighter group relative z-50"
        >
          <span className="text-android">&lt;</span>
          {USER_INFO.name.split(' ')[0]}
          <span className="text-android"> /&gt;</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className="text-gray-600 dark:text-gray-300 hover:text-android dark:hover:text-android font-medium text-sm tracking-wide relative group transition-colors cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-android transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button onClick={toggleTheme} className="ml-4 text-gray-600 dark:text-gray-300 hover:text-android transition-colors">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-android focus:outline-none z-50"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl transition-all duration-300`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-android-surface/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              className="text-2xl font-bold text-gray-600 dark:text-gray-300 hover:text-android transition-all transform hover:scale-110"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-android transition-colors">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;