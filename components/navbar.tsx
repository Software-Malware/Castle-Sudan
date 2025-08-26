// components/ActiveNavbar.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const ActiveNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      const progress = Math.floor((scrollTop / trackLength) * 100);
      setScrollProgress(progress);

      // Check if scrolled beyond 50px for navbar effect
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'Debug', href: '/Debug', id: 'debug' },
  ];

 const handleNavigation = (href: string) => {
  router.push(href);
  setIsMobileMenuOpen(false);
};

  return (
  <div className="mb-30">
      <nav className={`py-4 px-4 mb-20 transition-all duration-500 ease-out fixed z-50 flex items-center justify-between
                      w-[calc(100%-2rem)] max-w-auto
                      left-1/2 transform -translate-x-1/2
                      ${isScrolled 
                        ? 'top-4 border-lime-400/30 bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border' 
                        : 'top-0 border-transparent bg-transparent backdrop-blur-none rounded-none shadow-none border-b border-lime-400/10'}`}>

        {/* Logo/Brand */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleNavigation('/Home')}>
          <div className="w-10 h-10 bg-lime-400/10 rounded-full flex items-center justify-center 
                        transition-all duration-300 group-hover:bg-lime-400/20 group-hover:scale-110 
                        border border-lime-400/20">
            <span className="text-lime-400 font-bold text-xl" style={{ fontFamily: "InputMono" }}>
              <Image
                src="/eth.png"
                alt="Ethereum Logo"
                width={24}
                height={24}
              />
            </span>
          </div>
          <span className="text-lime-200 font-bold text-3xl hidden sm:block tracking-tight 
                         transition-all duration-300 group-hover:text-lime-400" 
                style={{ fontFamily: "InputMono" }}>
            eth-builder
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-lime-400 text-black shadow-lg'
                  : 'text-lime-300 hover:bg-lime-400/20 hover:text-lime-400'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Connect Button and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <div className="custom-connect-button">
            <ConnectButton
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              chainStatus={{
                smallScreen: 'icon',
                largeScreen: 'full',
              }}
              label="Connect Wallet"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-lime-400 hover:bg-lime-400/20 focus:outline-none focus:ring-2 focus:ring-lime-400"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full z-40 bg-black/95 backdrop-blur-lg pt-20">
          <div className="flex flex-col items-center space-y-6 px-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-lime-400 text-black shadow-lg'
                    : 'text-lime-300 border border-lime-400/30 hover:bg-lime-400/20 hover:text-lime-400'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Connect Button */}
          

            {/* Close Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 py-2 px-6 text-lime-400/70 hover:text-lime-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scroll Progress Bar */}
      
    </div>
  );
};

export default ActiveNavbar;