export default function Footer() {
  return (
    <div className="relative mt-20" style={{ "fontFamily": "Space Mono"}}>
      {/* Main Footer Container */}
      <footer className="bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-tl-[3rem] rounded-tr-[3rem] shadow-2xl border-2 border-white/30 relative overflow-hidden">
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#8b5a2b]/50 rounded-tl-3xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#8b5a2b]/50 rounded-tr-3xl"></div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#8b5a2b] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8b5a2b] rounded-full"></div>
        </div>
        
        {/* Top Border Accent */}
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-[#8b5a2b]/50 to-transparent rounded-t-lg"></div>
        
        {/* Footer Content */}
        <div className="relative z-10 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {/* Services Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">AI Services</h6>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Branding</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Design</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Marketing</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Analytics</a>
          </div>
          
          {/* Company Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">Company</h6>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">About us</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Contact</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Research</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Press kit</a>
          </div>
          
          {/* Legal Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">Legal</h6>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Terms of use</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Privacy policy</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Ethics</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Cookie policy</a>
          </div>
          
          {/* Social Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">Social</h6>
            <div className="flex space-x-3 mb-3">
              <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Twitter</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Instagram</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Facebook</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">GitHub</a>
          </div>
          
          {/* Explore Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">Explore</h6>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Features</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Enterprise AI</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">AI Security</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Pricing</a>
          </div>
          
          {/* Apps Column */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-[#5c3e1f] border-b border-[#8b5a2b]/30 pb-2">AI Apps</h6>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Mac AI Suite</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Windows AI Tools</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">iPhone AI Assistant</a>
            <a className="block text-[#5c3e1f] hover:text-[#8b5a2b] transition-colors duration-300">Android AI Apps</a>
          </div>
        </div>
        
        {/* Bottom Section with Copyright */}
        <div className="border-t border-[#8b5a2b]/30 p-6 text-center text-[#5c3e1f]">
          <p className="text-sm">
            ©{new Date().getFullYear()} AI Solutions. All rights reserved.
          </p>
          <p className="text-xs mt-1 opacity-80">Powered by Artificial Intelligence</p>
        </div>
      </footer>
    </div>
  );
}