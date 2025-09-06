import Footer from "@/components/footer";
import AnimatedCard from "@/components/ui/Card";
import Table from "@/components/table";
import Price from "@/components/price";


export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-auto bg-no-repeat">
      <div className="w-full overflow-hidden shadow-2xl">
        {/* Image Container */}
        <div className="relative">
          <img 
            src={"/main.png"} 
            alt="Castle Sudan" 
            className="w-full h-full"
          />
          
          {/* Text Overlay at Top */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent p-6">
            <h1 className="text-2xl md:text-6xl font-black text-italic text-amber-300 text-center drop-shadow-lg tracking-wide" style={{ fontFamily: "Reno Mono"}}>
              Castle Sudan
            </h1>
          </div>
          
          {/* Decorative Castle Elements */}
          <div className="absolute top-4 left-6 text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7l5 5h-3v4h-4v-4H7l5-5zm10 10h-2V7h2v10zm-2 2v2h-2v-2h2zm-4 0v2h-4v-2h4zm-6 0v2H8v-2h2zm-4 0v2H4v-2h2zm18 4H2v-2h20v2zM2 5h20V3H2v2z"/>
            </svg>
          </div>
          
          <div className="absolute top-4 right-6 text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10V7c0-1.103-.897-2-2-2h-3c0-1.103-.897-2-2-2S10 3.897 10 5H7c-1.103 0-2 .897-2 2v3c-1.103 0-2 .897-2 2s.897 2 2 2v3c0 1.103.897 2 2 2h3c0 1.103.897 2 2 2s2-.897 2-2h3c1.103 0 2-.897 2-2v-3c1.103 0 2-.897 2-2s-.897-2-2-2zm-4 7H7V7h8v10zm-5-9c0 .551-.449 1-1 1s-1-.449-1-1 .449-1 1-1 1 .449 1 1zm0 8c0 .551-.449 1-1 1s-1-.449-1-1 .449-1 1-1 1 .449 1 1zm6-4c0 .551-.449 1-1 1s-1-.449-1-1 .449-1 1-1 1 .449 1 1z"/>
            </svg>
          </div>
        </div>
      </div>
      <div  className="w-full bg-[#ecd9bc] text-center items-center">
        <div className="container max-w-auto lg:max-w-7xl m-auto py-8 lg:py-20 lg:pl-20 flex flex-col-reverse lg:flex-row items-center lg:items-start lg:gap-10">
          {/* Quote image */}
          <div className="flex flex-col items-center max-w-md lg:max-w-xl lg:mt-0">
            <img
              src="/avatar.jpg"
              alt="software malware"
              width={140}
              height={140}
              className="rounded-[150px] shadow-xl bottom-4"
            />
          </div>
          {/* Quote Text */}
          <div className=" text-black md:max-w-[80%] lg:max-w-[70%] flex flex-col items-center lg:items-start">
            <p  style={{ fontFamily: "Space Mono"}} className="font-thin text-xl lg:text-2xl text-center lg:text-left mb-10 lg:mb-4">
              “The Castel Sudan project number one of africa ethereum 
              developer show all project here!”
              </p>
                <p className="m-0 text-xl font-medium" style={{ fontFamily: "InputMono"}}>Castel Sudan</p>
                <p className="m-0 mb-4 text-md font-black" style={{ fontFamily: "InputMono"}}>Eth-Builder  Founder</p>
              </div>
            </div>
        </div>
        <div  className="py-2 w-full bg-[#e9d3ae]/96 text-center items-center">
          <div className="flex flex-col w-full min-h-screen items-center p-8 lg:p-12 relative overflow-hidden">
  {/* Background image with overlay */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 bg-gradient-to-b  from-black/80 z-10"></div>
    <div className="absolute inset-0 bg-[url('/test.jpg')] bg-cover bg-center"></div>
  </div>
  
  <div className="w-full max-w-6xl z-10">
    <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16 text-white" style={{ fontFamily: "InputMono" }}>
      Event Timeline
    </h1>
    
    <div className="relative" style={{ fontFamily: "Reno Mono"}}>
      {/* Main timeline line */}
      <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-500 shadow-lg"></div>
      
      {/* Timeline items */}
      <div className="space-y-12 lg:space-y-0">
        {/* Item 1 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center">
          <div className="flex-1 lg:pr-8 lg:text-right order-2 lg:order-1">
            <div className="lg:mr-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-cyan-300">Hackathon Castle</h2>
              <p className="text-lg text-gray-200 mt-2">Registration opens and coding begins</p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-cyan-900/40 text-cyan-100 rounded-full text-sm font-medium border border-cyan-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {new Date().getFullYear()}-9-29
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute w-16 h-16 rounded-full bg-cyan-400/30 animate-ping"></div>
            <div className="h-6 w-1 bg-gradient-to-b from-cyan-400 to-transparent lg:h-1 lg:w-6 lg:bg-gradient-to-r lg:from-cyan-400 lg:to-transparent"></div>
          </div>
          
          <div className="flex-1 lg:pl-8 order-3 hidden lg:block"></div>
        </div>
        
        {/* Item 2 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center">
          <div className="flex-1 lg:pr-8 order-2 hidden lg:block"></div>
          
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <div className="absolute w-16 h-16 rounded-full bg-purple-400/30 animate-ping"></div>
            <div className="h-6 w-1 bg-gradient-to-t from-purple-400 to-transparent lg:h-1 lg:w-6 lg:bg-gradient-to-l lg:from-purple-400 lg:to-transparent"></div>
          </div>
          
          <div className="flex-1 lg:pl-8 order-3 lg:order-3">
            <div className="lg:ml-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-purple-300">Submissions Closed</h2>
              <p className="text-lg text-gray-200 mt-2">All project submissions must be completed</p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-purple-900/40 text-purple-100 rounded-full text-sm font-medium border border-purple-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {new Date().getFullYear()}-10-16
              </div>
            </div>
          </div>
        </div>
        
        {/* Item 3 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center">
          <div className="flex-1 lg:pr-8 lg:text-right order-2 lg:order-1">
            <div className="lg:mr-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-amber-300">Winners Announcement</h2>
              <p className="text-lg text-gray-200 mt-2">Judging completed and winners will be announced</p>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-amber-900/40 text-amber-100 rounded-full text-sm font-medium border border-amber-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                2025-11-9
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-white shadow-lg z-10 relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="absolute w-16 h-16 rounded-full bg-amber-400/30 animate-ping"></div>
            <div className="h-6 w-1 bg-gradient-to-b from-amber-400 to-transparent lg:h-1 lg:w-6 lg:bg-gradient-to-r lg:from-amber-400 lg:to-transparent"></div>
          </div>
          
          <div className="flex-1 lg:pl-8 order-3 hidden lg:block"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="mb-15 mt-15  flex justify-center">
  <AnimatedCard />
 </div>
  </div>
  <div className="bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae]">
    <Table />
    <Price />
    <Footer />
    </div>
  </div>
  );
}