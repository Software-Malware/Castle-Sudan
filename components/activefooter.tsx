'use client';

import { useState, useEffect, useRef } from 'react';

const ActiveFooter = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide footer based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) return null;

  return (
    <div className="lg:fixed lg:bottom-4 lg:w-[calc(100%-2rem)] fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl" ref={footerRef}>
      {/* Main Footer Card */}
      <div className={`
        relative bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 
        border-2 border-white/30 backdrop-blur-lg rounded-3xl shadow-2xl
        p-4 transition-all duration-500 ease-out
        group 3d-perspective hover:shadow-orange-400/30
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}
      `}>
        
        {/* Double Card Effect - Outer Shadow */}
        <div className="absolute -inset-3 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-3xl -z-10 opacity-70 blur-lg"></div>
        
        {/* 3D Top Edge */}
        <div className="absolute -top-2 left-6 right-6 h-3 bg-gradient-to-r from-transparent via-[#8b5a2b]/50 to-transparent 
                        rounded-t-lg transform group-hover:scale-110 transition-transform duration-500"></div>
        
        {/* Content Container */}
        <div className="flex flex-col items-center space-y-3 relative z-10">
          {/* Branding Section */}
          <div className="flex justify-between items-center w-full px-2">
            {/* Left Section - Brand */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                {/* Animated Logo/Badge */}
                <div className="w-8 h-8 bg-gradient-to-br from-[#8b5a2b] to-[#6b4c2f] rounded-full 
                                flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
                  <span style={{ fontFamily: "Space Mono" }} className="text-[#e9d3ae] text-sm font-bold"><img src="/avatar.jpg" alt="zengo" className="rounded-full" /></span>
                </div>
                {/* Pulsing Animation */}
                <div className="absolute -inset-2 bg-[#8b5a2b]/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              
              <p 
                style={{ fontFamily: "Space Mono" }} 
                className="text-sm sm:text-base md:text-lg text-[#5c3e1f] font-medium group-hover:scale-105 transition-transform duration-300"
              >
                 <span className='underline decoration-[#8b5a2b]/60'></span>
              </p>
            </div>
            
            {/* Right Section - Social Media Icons */}
            <div className="flex space-x-3 items-center">
              <nav>
                <div className="grid grid-flow-col gap-4">
                  {/* Twitter Icon */}
                  <a 
                    href="https://x.com/Hackathon3301?t=S67TMqSCfXO5LJ9HxYef_A&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/twitter relative"
                    aria-label="Follow us on Twitter"
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#8b5a2b]/20 rounded-full blur opacity-0 group-hover/twitter:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 p-2 bg-gradient-to-br from-[#e9d3ae] to-[#d4b98a] rounded-full border border-[#8b5a2b]/30 
                                      group-hover/twitter:bg-[#8b5a2b] transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-current text-[#5c3e1f] group-hover/twitter:text-[#e9d3ae] 
                                     transition-colors duration-300"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  {/* GitHub Icon */}
                  <a 
                    href="https://github.com/Software-Malware" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/github relative"
                    aria-label="View our GitHub"
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#8b5a2b]/20 rounded-full blur opacity-0 group-hover/github:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 p-2 bg-gradient-to-br from-[#e9d3ae] to-[#d4b98a] rounded-full border border-[#8b5a2b]/30 
                                      group-hover/github:bg-[#8b5a2b] transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-current text-[#5c3e1f] group-hover/github:text-[#e9d3ae] 
                                     transition-colors duration-300"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  {/* Facebook Icon */}
                  <a 
                    href="https://www.facebook.com/share/1FxbJFduMH/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/facebook relative"
                    aria-label="Follow us on Facebook"
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#8b5a2b]/20 rounded-full blur opacity-0 group-hover/facebook:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 p-2 bg-gradient-to-br from-[#e9d3ae] to-[#d4b98a] rounded-full border border-[#8b5a2b]/30 
                                      group-hover/facebook:bg-[#8b5a2b] transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-current text-[#5c3e1f] group-hover/facebook:text-[#e9d3ae] 
                                     transition-colors duration-300"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                  
                  {/* WhatsApp Icon */}
                  <a 
                    href="https://wa.me/+249918946937" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/whatsapp relative"
                    aria-label="Message us on WhatsApp"
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-[#8b5a2b]/20 rounded-full blur opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 p-2 bg-gradient-to-br from-[#e9d3ae] to-[#d4b98a] rounded-full border border-[#8b5a2b]/30 
                                      group-hover/whatsapp:bg-[#8b5a2b] transition-colors duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="fill-current text-[#5c3e1f] group-hover/whatsapp:text-[#e9d3ae] 
                                     transition-colors duration-300"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297a11.815 11.815 0 00-8.415-3.488c-6.627 0-12.014 5.389-12.014 12.01 0 2.14.563 4.225 1.634 6.058l-1.747 6.38 6.527-1.706a12.043 12.043 0 005.6 1.387c6.63 0 12.012-5.389 12.012-12.012 0-3.205-1.247-6.219-3.515-8.487"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* 3D Bottom Edge */}
        <div className="absolute -bottom-2 left-6 right-6 h-3 bg-gradient-to-r from-transparent via-[#8b5a2b]/50 to-transparent 
                        rounded-b-lg transform group-hover:scale-110 transition-transform duration-500"></div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8b5a2b]/50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8b5a2b]/50 rounded-tr-3xl"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#8b5a2b]/50 rounded-bl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#8b5a2b]/50 rounded-br-3xl"></div>
      </div>
    </div>
  );
};

export default ActiveFooter;