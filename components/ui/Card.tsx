"use client";

import { useState, useRef, useEffect } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  minWidth?: string;
  maxWidth?: string;
  style?: any;
}

const AnimatedCard = ({ 
  title, 
  description, 
  imageUrl, 
  buttonText = "Explore More",
  minWidth = "min-w-[280px]",
  maxWidth = "max-w-[380px]",
  style
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (isHovered && cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl
        ${minWidth} ${maxWidth} w-full h-full flex flex-col
        bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80
        shadow-3xl border-2 border-white/20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 25}deg) rotateY(${(mousePosition.x - 200) / 25}deg) scale3d(1.03, 1.03, 1.03)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      }}
    >
      {/* Double card effect */}
      <div className="absolute -inset-2 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-3xl -z-10 opacity-70 blur-md"></div>
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#3a2a1e]/70 via-[#6b4c2f]/40 to-[#9c7d5f]/20 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-80'}`}></div>
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.4 : 0,
          transform: isHovered 
            ? `translateX(${mousePosition.x - 400}px) translateY(${mousePosition.y - 400}px) rotate(45deg)`
            : 'translateX(-100%) translateY(-100%) rotate(45deg)',
        }}
      ></div>
      
      {/* Image container */}
      <figure className="relative h-48 overflow-hidden transition-transform duration-700 ease-out rounded-t-3xl">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a1e]/90 via-transparent to-transparent opacity-70 z-10"></div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#8b5a2b]/50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#8b5a2b]/50 rounded-tr-3xl"></div>
      </figure>
      
      {/* Content */}
      <div className="card-body z-30 p-6 flex flex-col flex-grow transform transition-transform duration-500">
        <h2 style={{ "fontFamily": "Space Mono"}} className="text-[#5c3e1f] card-title text-2xl font-bold mb-3 transform transition-all duration-500 delay-150">
          {title} 
        </h2>
        
        <div style={{ "fontFamily": "Space Mono"}} className={`overflow-hidden transition-all duration-700 flex-grow ${isHovered ? 'max-h-40' : 'max-h-0'}`}>
          <p className="text-[#5c3e1f]/90 mb-4 transform transition-transform duration-700 delay-200">
            {description}
          </p>
        </div>
        
        <div style={{ "fontFamily": "Space Mono"}} className={`card-actions justify-end transform transition-all duration-500 delay-300 mt-auto ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button className="px-5 py-2.5 rounded-full font-medium bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f] text-white border-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-[#8b5a2b]/40">
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#8b5a2b]/20 backdrop-blur-sm flex items-center justify-center z-30 transform transition-transform duration-700 hover:rotate-12 border border-[#8b5a2b]/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#5c3e1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>

      {/* Bottom corner accents */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#8b5a2b]/50 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#8b5a2b]/50 rounded-br-3xl"></div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className={`absolute -inset-10 bg-gradient-to-r from-[#8b5a2b]/20 via-[#a67c52]/20 to-[#c9a87c]/20 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-70' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

const CardGrid = () => {
  const cardsData = [
    {
      title: "Castel Sudan",
      description: "The Castel Sudan project number one of Africa Ethereum developer. Show all project here with amazing features and innovations.",
      imageUrl: "/test6.jpg",
      buttonText: "View Project"
    },
    {
      title: "Web3 Innovation",
      description: "Revolutionary blockchain solutions for the modern world. Secure, decentralized, and efficient applications.",
      imageUrl: "/test1.jpg",
      buttonText: "Discover"
    },
    {
      title: "Smart Contracts",
      description: "Advanced smart contract development with security audits and comprehensive testing for enterprise solutions.",
      imageUrl: "/test2.jpg",
      buttonText: "Learn More"
    },
    {
      title: "DeFi Platform",
      description: "Decentralized finance platform offering lending, borrowing, and yield farming opportunities with high security.",
      imageUrl: "/test9.jpg",
      buttonText: "Invest Now"
    },
    {
      title: "NFT Marketplace",
      description: "Create, buy and sell unique digital assets on our cutting-edge NFT marketplace with low fees.",
      imageUrl: "/test7.jpg",
      buttonText: "Explore NFTs"
    },
    {
      title: "DAO Governance",
      description: "Community-driven governance models for decentralized autonomous organizations with transparent voting.",
      imageUrl: "/test4.jpg",
      buttonText: "Join DAO"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-[#8b5a2b]/10 rounded-2xl mb-6">
            <div className="bg-[#8b5a2b]/20 rounded-xl px-4 py-2">
              <span style={{ "fontFamily": "Space Mono"}} className="text-[#5c3e1f] text-sm font-medium">Featured Projects</span>
            </div>
          </div>
          
          <h1 style={{ "fontFamily": "Reno Mono"}} className="text-4xl md:text-5xl font-bold text-[#3a2a1e] mb-4">
            Our <span className="text-[#8b5a2b]">Blockchain</span> Innovations
          </h1>
          <p style={{ "fontFamily": "Space Mono"}} className="text-lg text-[#5c3e1f]/90 max-w-3xl mx-auto">
            Discover our innovative blockchain solutions and cutting-edge web3 projects that are shaping the future of decentralized technology.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', 'DeFi', 'NFT', 'DAO', 'Smart Contracts', 'Web3'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f] text-white shadow-lg' 
                  : 'bg-white/80 text-[#5c3e1f] hover:bg-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <div key={index} className="flex justify-center">
              <AnimatedCard
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                buttonText={card.buttonText}
                minWidth="min-w-[280px]"
                maxWidth="max-w-[380px]"
              />
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#8b5a2b]/10 to-[#a67c52]/10 p-8 rounded-3xl border-2 border-white/30">
            <h2 style={{ "fontFamily": "Reno Mono"}} className="text-2xl md:text-3xl font-bold text-[#3a2a1e] mb-4">
              Ready to Start Your Project?
            </h2>
            <p style={{ "fontFamily": "Space Mono"}} className="text-[#5c3e1f]/90 mb-6 max-w-2xl mx-auto">
              Join our ecosystem of innovators and developers building the future of decentralized technology.
            </p>
            <button className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f] text-white border-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-[#8b5a2b]/40">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;