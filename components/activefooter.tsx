'use client';

import { useState, useEffect, useRef } from 'react';

const ActiveFooter = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      const progress = Math.floor((scrollTop / trackLength) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) return null;

  return (
    <div className="" ref={footerRef}>
      <div className="py-4 px-2 border border-orange-300/30 backdrop-blur-lg bg-orange-200/60 rounded-3xl shadow-2xl fixed bottom-4 z-50
                      w-[calc(100%-2rem)] max-w-auto min-w-auto
                      left-1/2 transform -translate-x-1/2
                      sm:min-w-auto md:min-w-auto lg:min-w-auto
                      sm:max-w-auto md:max-w-auto lg:max-w-auto
                      hover:shadow-orange-400/20 hover:scale-[1.02] transition-all duration-500
                      group 3d-perspective">
        
        {/* 3D top edge effect */}
        <div className="absolute -top-1 left-4 right-4 h-2 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent 
                        rounded-t-lg transform group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="flex flex-col items-center space-y-3">
          {/* Visual indicators only - no text */}
          <div className="flex justify-between items-center w-full px-2">
            {/* Left indicator - circles */}
            <div className="flex space-x-1.5 font-black text-xl text-orange-700" style={{ "fontFamily": "InputMono"}}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl group-hover:scale-105 transition-transform duration-300">
                BY <span className='underline decoration-orange-500/60'>SOFTWARE MALWARE</span>
              </p>
            </div>
            
            {/* Center indicator - dynamic dots based on scroll */}
            <div className="flex space-x-1 text-2xl text-base-200" style={{ "fontFamily": "Reno Mono"}}>
              {/* Scroll progress indicator (only visible on larger screens) */}
              <div className="hidden md:flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      scrollProgress >= (i * 20) + 10 
                        ? 'bg-orange-700 shadow-[0_0_5px_rgba(234,88,12,0.7)]' 
                        : 'bg-orange-700/60'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Right indicator - social media icons */}
            <div className="flex space-x-3 items-center">
              <nav>
                <div className="grid grid-flow-col gap-4">
                  {/* Twitter Icon */}
                  <a 
                    href="https://x.com/Hackathon3301?t=S67TMqSCfXO5LJ9HxYef_A&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/twitter"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-orange-400/20 rounded-full blur opacity-0 group-hover/twitter:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-orange-700 relative z-10 group-hover/twitter:drop-shadow-[0_0_4px_rgba(234,88,12,0.6)] transition-all duration-300"
                      >
                        <path
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  
                  {/* GitHub Icon */}
                  <a 
                    href="https://github.com/Software-Malware" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/github"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-orange-400/20 rounded-full blur opacity-0 group-hover/github:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-orange-700 relative z-10 group-hover/github:drop-shadow-[0_0_4px_rgba(234,88,12,0.6)] transition-all duration-300"
                      >
                        <path
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  
                  {/* Facebook Icon */}
                  <a 
                    href="https://www.facebook.com/share/1FxbJFduMH/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/facebook"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-orange-400/20 rounded-full blur opacity-0 group-hover/facebook:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-orange-700 relative z-10 group-hover/facebook:drop-shadow-[0_0_4px_rgba(234,88,12,0.6)] transition-all duration-300"
                      >
                        <path
                          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                        ></path>
                      </svg>
                    </div>
                  </a>
                  
                  {/* WhatsApp Icon */}
                  <a 
                    href="https://wa.me/+249918946937" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="transition-all duration-300 hover:scale-110 group/whatsapp"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-orange-400/20 rounded-full blur opacity-0 group-hover/whatsapp:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="fill-current text-orange-700 relative z-10 group-hover/whatsapp:drop-shadow-[0_0_4px_rgba(234,88,12,0.6)] transition-all duration-300"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297a11.815 11.815 0 00-8.415-3.488c-6.627 0-12.014 5.389-12.014 12.01 0 2.14.563 4.225 1.634 6.058l-1.747 6.38 6.527-1.706a12.043 12.043 0 005.6 1.387c6.63 0 12.012-5.389 12.012-12.012 0-3.205-1.247-6.219-3.515-8.487"
                        ></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>

        
        {/* 3D bottom edge effect */}
        <div className="absolute -bottom-1 left-4 right-4 h-2 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent 
                        rounded-b-lg transform group-hover:scale-110 transition-transform duration-500"></div>
      </div>

    </div>
  );
};

export default ActiveFooter;