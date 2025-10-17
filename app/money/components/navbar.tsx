"use client";

import { useState, useEffect } from 'react';

interface NavbarProps {
  isScrolled?: boolean;
}

export default function Navbar({ isScrolled: initialScrolled = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(initialScrolled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-br from-[#f8e6c9]/95 to-[#e9d3ae]/95 backdrop-blur-sm rounded-br-3xl rounded-bl-3xl shadow-lg py-2' 
        : 'bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-br-3xl rounded-bl-3xl py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center shadow-md">
            <img src="/money2.png" alt="Castle Sudan" className="w-6 h-6" />
          </div>
          <span 
            className="ml-3 text-amber-900 font-black text-2xl"
            style={{ fontFamily: 'Space Mono' }}
          >
            CS-MONEY
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {['home', 'Token', 'Deploy', 'Money', 'Account'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-amber-900 hover:text-amber-700 transition-colors font-medium capitalize"
              style={{ fontFamily: 'Space Mono' }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-amber-900 focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col space-y-3 px-4 py-4 bg-gradient-to-b from-[#f8e6c9] to-[#e9d3ae] rounded-b-2xl">
          {['home', 'Token', 'Deploy', 'Money', 'Account'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-amber-900 hover:bg-amber-700 hover:text-white px-4 py-3 rounded-md transition-colors font-medium text-left capitalize"
              style={{ fontFamily: 'Space Mono' }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}