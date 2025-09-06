export default function Footer() {
  return (
    <div 
      className="bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-tl-3xl rounded-tr-3xl shadow-2xl border-2 border-white/30 mt-14 relative overflow-hidden"
      style={{ fontFamily: "Space Mono" }}
    >
      {/* Double Card Effect */}
      <div className="absolute -inset-3 bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] rounded-3xl -z-10 opacity-70 blur-lg"></div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#8b5a2b] rounded-full filter blur-xl opacity-20"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#8b5a2b] rounded-full filter blur-xl opacity-20"></div>
      
      {/* Main Footer Content */}
      <footer className="footer p-12 text-[#5c3e1f] relative z-10">
        {/* Top Border */}
        <div className="absolute top-0 left-8 right-8 h-2 bg-gradient-to-r from-transparent via-[#8b5a2b]/50 to-transparent rounded-t-lg"></div>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">AI Services</h6>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Branding</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Design</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Marketing</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Analytics</a>
        </nav>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">Company</h6>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">About us</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Contact</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Research</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Press kit</a>
        </nav>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">Legal</h6>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Terms of use</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Privacy policy</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Ethics</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Cookie policy</a>
        </nav>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
            <a className="p-2 bg-[#8b5a2b]/10 rounded-full hover:bg-[#8b5a2b]/20 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current text-[#5c3e1f]">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Twitter</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Instagram</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Facebook</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">GitHub</a>
        </nav>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">Explore</h6>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Features</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Enterprise AI</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">AI Security</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Pricing</a>
        </nav>
        
        <nav className="space-y-3">
          <h6 className="footer-title text-xl font-bold pb-2 border-b border-[#8b5a2b]/30">AI Apps</h6>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Mac AI Suite</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Windows AI Tools</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">iPhone AI Assistant</a>
          <a className="link link-hover hover:text-[#8b5a2b] transition-colors duration-300">Android AI Apps</a>
        </nav>
      </footer>
      
      {/* Bottom Section with Copyright */}
      <div className="border-t border-[#8b5a2b]/30 p-6 text-center text-[#5c3e1f]/80">
        <p style={{ fontFamily: "Space Mono" }} className="text-sm">
          ©{new Date().getFullYear()} AI Solutions. All rights reserved. 
          <span className="block mt-1 text-xs">Powered by Artificial Intelligence</span>
        </p>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8b5a2b]/50 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8b5a2b]/50 rounded-tr-3xl"></div>
    </div>
  );
}