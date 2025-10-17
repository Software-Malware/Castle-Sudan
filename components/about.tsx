"use client";

import { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  minWidth?: string;
  maxWidth?: string;
  style?: any;
}

const Card = ({ 
  title, 
  description, 
  imageUrl, 
  buttonText = "Claim Reward",
  minWidth = "min-w-[280px]",
  maxWidth = "max-w-[380px]",
  style
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl
        ${minWidth} ${maxWidth} w-full h-full flex flex-col
        bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80
        shadow-3xl border-2 border-white/20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Double card effect */}
      <div className="absolute -inset-2 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-3xl -z-10 opacity-70 blur-md"></div>
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#3a2a1e]/70 via-[#6b4c2f]/40 to-[#9c7d5f]/20 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-90' : 'opacity-80'}`}></div>
      
      {/* Shine effect - simplified without mouse tracking */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.4 : 0,
        }}
      ></div>
      
      {/* Image container */}
      <figure className="relative h-48 overflow-hidden transition-transform duration-700 ease-out rounded-t-3xl">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-contain transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'} pt-4`}
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
  const rewardsData = [
    {
      title: "Gold Reward - $300",
      description: "Congratulations! You've earned our top-tier Gold Reward. This exclusive prize includes $300 cash reward, premium features access, and special recognition in our leaderboard.",
      imageUrl: "/trophy-1.svg",
      buttonText: "Claim Reward"
    },
    {
      title: "Silver Reward - $200",
      description: "Great achievement! You've earned our Silver Reward. Claim your $200 prize along with extended benefits and special access to our premium community features.",
      imageUrl: "/trophy-2.svg",
      buttonText: "Claim Now"
    },
    {
      title: "Bronze Reward - $100",
      description: "Well done! You've earned our Bronze Reward. Enjoy your $100 prize and exclusive content access. Keep progressing to unlock higher reward tiers!",
      imageUrl: "/trophy-3.svg",
      buttonText: "Redeem Prize"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-[#8b5a2b]/10 rounded-4xl mb-6">
            <div className="bg-[#8b5a2b]/20 rounded-xl px-4 py-2">
              <span style={{ "fontFamily": "Space Mono"}} className="text-[#5c3e1f] text-sm font-medium">Exclusive Rewards</span>
            </div>
          </div>
          
          <h1 style={{ "fontFamily": "Reno Mono"}} className="text-4xl md:text-5xl font-bold text-[#3a2a1e] mb-4">
            Claim Your <span className="text-[#8b5a2b]">Rewards</span>
          </h1>
          <p style={{ "fontFamily": "Space Mono"}} className="text-lg text-[#5c3e1f]/90 max-w-3xl mx-auto">
            You've earned these exclusive rewards through your dedication and achievements. Claim your prize and enjoy the benefits!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardsData.map((card, index) => (
            <div key={index} className="flex justify-center">
              <Card
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
              Want to Earn More?
            </h2>
            <p style={{ "fontFamily": "Space Mono"}} className="text-[#5c3e1f]/90 mb-6 max-w-2xl mx-auto">
              Participate in our challenges and activities to unlock even greater rewards and exclusive benefits.
            </p>
            <button style={{ "fontFamily": "Reno Mono"}} className="px-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#8b5a2b] to-[#6b4c2f] text-white border-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg shadow-[#8b5a2b]/40">
              Explore Challenges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;