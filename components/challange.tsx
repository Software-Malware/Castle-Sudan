export default function Challenge() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 
            style={{ fontFamily: "Space Mono" }}
            className="mt-10 bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] rounded-4xl py-4 px-8 text-1xl md:text-4xl font-bold text-white shadow-xl"
          >
            FLAG CHALLENGE
          </h1>

        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CTF Challenges Column */}
          <div style={{ fontFamily: "InputMono" }} className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-3xl border-[#8b5a2b]/80 border-2 p-6 shadow-lg mb-8">
              <h2 style={{ fontFamily: "Space Mono" }} className="text-xl md:text-4xl font-bold mb-6 text-[#5c3e1f] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#8b5a2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Available Challenges
              </h2>
              
              <div style={{ fontFamily: "InputMono" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Challenge Card 1 */}
                <div className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4 justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Web Exploitation</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">200 points</span>
                  </div>
                  <h3 style={{ fontFamily: "InputMono" }} className="text-xl font-bold mb-2 text-[#5c3e1f]">SQL Injection Master</h3>
                  <p className="text-[#5c3e1f] mb-4">Bypass authentication and extract the flag from the database.</p>
                  <div className="flex items-center text-sm text-[#8b5a2b] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    32 solves • 4 hours ago
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white py-2.5 rounded-xl font-medium transition-all duration-300">
                    Start Challenge
                  </button>
                </div>
                
                {/* Challenge Card 2 */}
                <div style={{ fontFamily: "InputMono" }} className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4 justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Forensics</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">300 points</span>
                  </div>
                  <h3 style={{ fontFamily: "InputMono" }} className="text-xl font-bold mb-2 text-[#5c3e1f]">Image Metadata Mystery</h3>
                  <p className="text-[#5c3e1f] mb-4">Find the hidden flag within image metadata and steganography.</p>
                  <div className="flex items-center text-sm text-[#8b5a2b] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    18 solves • 1 day ago
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white py-2.5 rounded-xl font-medium transition-all duration-300">
                    Start Challenge
                  </button>
                </div>
                
                {/* Challenge Card 3 */}
                <div style={{ fontFamily: "InputMono" }} className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Cryptography</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">250 points</span>
                  </div>
                  <h3 style={{ fontFamily: "InputMono" }} className="text-xl font-bold mb-2 text-[#5c3e1f]">RSA Decryption</h3>
                  <p className="text-[#5c3e1f] mb-4">Break the RSA encryption to reveal the secret message.</p>
                  <div className="flex items-center text-sm text-[#8b5a2b] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    27 solves • 12 hours ago
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white py-2.5 rounded-xl font-medium transition-all duration-300">
                    Start Challenge
                  </button>
                </div>
                
                {/* Challenge Card 4 */}
                <div style={{ fontFamily: "InputMono" }} className=" hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4 justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">Reverse Engineering</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">400 points</span>
                  </div>
                  <h3 style={{ fontFamily: "InputMono" }} className="text-xl font-bold mb-2 text-[#5c3e1f]">Binary Analysis</h3>
                  <p className="text-[#5c3e1f] mb-4">Reverse engineer this binary to find the hidden flag.</p>
                  <div className="flex items-center text-sm text-[#8b5a2b] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    9 solves • 2 days ago
                  </div>
                  <button style={{ fontFamily: "InputMono" }} className="w-full bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white py-2.5 rounded-xl font-medium transition-all duration-300">
                    Start Challenge
                  </button>
                </div>
              </div>
            </div>
            
            {/* Challenge Images Section */}
            <div className="hover:shadow-4xl border-[#8b5a2b]/80 border-2 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-3xl p-6 shadow-lg">
              <h2 style={{ fontFamily: "InputMono" }} className="text-2xl font-bold mb-6 text-[#5c3e1f]">Challenge Previews</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-[#8b5a2b]/80 border-2 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl  overflow-hidden shadow-md">
                  <div className=" h-48 bg-gradient-to-r from-[#e9d3ae] to-[#d4b98a] flex items-center justify-center overflow-hidden">
                    <img src="/les1.png" alt="Castle Sudan CTF" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 style={{ fontFamily: "InputMono" }} className="font-bold text-lg mb-2 text-[#5c3e1f]">Castle Sudan Challenge</h3>
                    <p style={{ fontFamily: "InputMono" }} className="text-[#5c3e1f] text-sm">Web security challenge with medieval theme</p>
                  </div>
                </div>
                <div className="border-[#8b5a2b]/80 border-2 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl overflow-hidden shadow-md">
                  <div className="h-48 bg-gradient-to-r from-[#e9d3ae] to-[#d4b98a] flex items-center justify-center overflow-hidden">
                    <img src="/les2.png" alt="Hackathon" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 style={{ fontFamily: "InputMono" }} className="font-bold text-lg mb-2 text-[#5c3e1f]">Hackathon Event</h3>
                    <p style={{ fontFamily: "InputMono" }} className="text-[#5c3e1f] text-sm">24-hour coding and security competition</p>
                  </div>
                </div>
                <div className="border-[#8b5a2b]/80 border-2 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl overflow-hidden shadow-md">
                  <div className="h-48 bg-gradient-to-r from-[#e9d3ae] to-[#d4b98a] flex items-center justify-center overflow-hidden">
                    <img src="/les3.png" alt="CTF Competition" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 style={{ fontFamily: "InputMono" }} className="font-bold text-lg mb-2 text-[#5c3e1f]">CTF Competition</h3>
                    <p style={{ fontFamily: "InputMono" }}  className="text-[#5c3e1f] text-sm">International capture the flag event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Shop and Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* User Stats Card */}
            <div className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-3xl p-6 shadow-lg">
              <h2 style={{ fontFamily: "InputMono" }} className="navbar text-2xl font-bold mb-4 text-[#5c3e1f] flex items-center">
                <img src="/avatar.jpg" alt="zengo" className="rounded-full w-9 query:w-8 mr-2" />
                Software Overflow
              </h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[#5c3e1f]">Rank</p>
                  <p className="text-2xl font-bold text-[#5c3e1f]">#1</p>
                </div>
                <div className="text-right">
                  <p className="text-[#5c3e1f]">Points</p>
                  <p className="text-2xl font-bold text-[#5c3e1f]">3240</p>
                </div>
              </div>
              <div className="mt-6" style={{ fontFamily: "InputMono" }}>
                <p className="text-[#5c3e1f] mb-2">Challenges Completed</p>
                <div className="w-full bg-[#e9d3ae] rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] h-2.5 rounded-full" style={{ width: '79%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-[#5c3e1f] mt-2">
                  <span>32/40</span>
                  <span>79%</span>
                </div>
              </div>
            </div>
            
            {/* CTF Shop */}
            <div className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-3xl p-6 shadow-lg">
              <h2 style={{ fontFamily: "InputMono" }} className="text-2xl font-bold mb-4 text-[#5c3e1f] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#8b5a2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                CTF Shop
              </h2>
              <p style={{ fontFamily: "InputMono" }} className="text-[#5c3e1f] mb-4">Spend your points on hints and resources</p>
              
              <div className="space-y-4 ">
                {/* Shop Item 1 */}
                <div className="hover:shadow-4xl border-2 border-[#8b5a2b]/20 flex items-center justify-between p-4 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl shadow-sm ">
                  <div>
                    <h3 style={{ fontFamily: "InputMono" }} className="font-semibold text-[#5c3e1f]">NumPy Guidebook</h3>
                    <p className="text-sm text-[#5c3e1f]">Advanced data analysis techniques</p>
                  </div>
                  <button className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
                    $29.99
                  </button>
                </div>
                
                {/* Shop Item 2 */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl shadow-smhover:shadow-4xl border-2 border-[#8b5a2b]/20">
                  <div>
                    <h3 style={{ fontFamily: "InputMono" }} className="font-semibold text-[#5c3e1f]">Python for Security</h3>
                    <p className="text-sm text-[#5c3e1f]">Essential programming skills</p>
                  </div>
                  <button className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
                    $24.99
                  </button>
                </div>
                
                {/* Shop Item 3 */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl shadow-sm hover:shadow-4xl border-2 border-[#8b5a2b]/20">
                  <div>
                    <h3 style={{ fontFamily: "InputMono" }} className="font-semibold text-[#5c3e1f]">CTF Strategy Guide</h3>
                    <p className="text-sm text-[#5c3e1f]">Win more competitions</p>
                  </div>
                  <button className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
                    $19.99
                  </button>
                </div>
                
                {/* Shop Item 4 */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 rounded-2xl shadow-sm hover:shadow-4xl border-2 border-[#8b5a2b]/20">
                  <div>
                    <h3 style={{ fontFamily: "InputMono" }} className="font-semibold text-[#5c3e1f]">Crypto Handbook</h3>
                    <p className="text-sm text-[#5c3e1f]">Encryption and decryption techniques</p>
                  </div>
                  <button className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] hover:from-[#6d451c] hover:to-[#5c3e1f] text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
                    $34.99
                  </button>
                </div>
              </div>
            </div>
            
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-[#e9d3ae]/90 to-[#d4b98a]/80 hover:shadow-4xl border-2 border-[#8b5a2b]/20 rounded-3xl p-6 shadow-lg" style={{ fontFamily: "InputMono" }}>
              <h2 style={{ fontFamily: "InputMono" }} className="text-2xl font-bold mb-4 text-[#5c3e1f] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#8b5a2b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Your Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div style={{ fontFamily: "InputMono" }} className="flex justify-between text-sm text-[#5c3e1f] mb-1">
                    <span>Web Exploitation</span>
                    <span>4/6</span>
                  </div>
                  <div className="w-full bg-[#e9d3ae] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-[#5c3e1f] mb-1">
                    <span>Cryptography</span>
                    <span>3/5</span>
                  </div>
                  <div className="w-full bg-[#e9d3ae] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-[#5c3e1f] mb-1">
                    <span>Forensics</span>
                    <span>2/4</span>
                  </div>
                  <div className="w-full bg-[#e9d3ae] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-[#5c3e1f] mb-1">
                    <span>Reverse Engineering</span>
                    <span>1/3</span>
                  </div>
                  <div className="w-full bg-[#e9d3ae] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#8b5a2b] to-[#6d451c] h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}