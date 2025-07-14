import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-red-900/20 via-orange-900/15 to-red-800/25 backdrop-blur-xl border-t border-red-500/20 relative overflow-hidden">
      {/* Frosted glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent backdrop-blur-sm"></div>
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,theme(colors.red.500),transparent_40%)] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,theme(colors.orange.500),transparent_40%)] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Brand Section */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 rounded-xl blur-lg group-hover:bg-red-600/30 transition-all duration-500"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 group-hover:border-red-500/30 transition-all duration-300">
                    <Image 
                      src="/Laced_in_Lust_Posters_Red.png" 
                      alt="Laced in Lust Logo" 
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl tracking-wide group-hover:text-red-400 transition-colors duration-300">
                    Laced in Lust
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Where passion meets rhythm
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                Experience unforgettable nights filled with energy, music, and passionate connections. 
                Join our community where every moment becomes a treasured memory.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                                  <a
                    href="https://discord.com/invite/egBjhyTFrp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    aria-label="Discord"
                  >
                    <div className="absolute inset-0 bg-red-600/20 rounded-lg blur group-hover:bg-red-600/40 transition-all duration-300"></div>
                    <div className="relative w-10 h-10 bg-gray-800/80 hover:bg-red-600/20 rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                      </svg>
                    </div>
                  </a>
                
                <a
                  href="https://x.com/MikaMasaki_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="Twitter"
                >
                  <div className="absolute inset-0 bg-red-600/20 rounded-lg blur group-hover:bg-red-600/40 transition-all duration-300"></div>
                  <div className="relative w-10 h-10 bg-gray-800/80 hover:bg-red-600/20 rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.7 12.7 0 0 1 3.1 4.86a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.4c-.34.09-.7.14-1.07.14-.26 0-.51-.02-.76-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.41-.01-.61a9.1 9.1 0 0 0 2.23-2.32z" />
                    </svg>
                  </div>
                </a>
                
                <a
                  href="https://www.instagram.com/mikamasaki.vrc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label="Instagram"
                >
                  <div className="absolute inset-0 bg-red-600/20 rounded-lg blur group-hover:bg-red-600/40 transition-all duration-300"></div>
                  <div className="relative w-10 h-10 bg-gray-800/80 hover:bg-red-600/20 rounded-lg flex items-center justify-center border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg relative">
                Quick Navigation
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/staff', label: 'Our Staff' },
                  { href: '/event-pictures', label: 'Event Gallery' },
                  { href: '/image-gallery', label: 'Photo Gallery' },
                ].map((link, index) => (
                  <li key={link.href} className="group" style={{animationDelay: `${index * 100}ms`}}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-1"
                    >
                      <div className="w-1 h-1 bg-red-600 rounded-full group-hover:w-2 group-hover:bg-red-400 transition-all duration-300"></div>
                      <span className="group-hover:text-red-400 transition-colors duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-lg relative">
                Legal & Support
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { href: '/privacy-policy', label: 'Privacy Policy' },
                  { href: '/terms-of-service', label: 'Terms of Service' },
                  { href: '/contact', label: 'Contact Us' },
                  { href: '/support', label: 'Support Center' },
                ].map((link, index) => (
                  <li key={link.href} className="group" style={{animationDelay: `${index * 100}ms`}}>
                    <Link 
                      href={link.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group-hover:translate-x-1"
                    >
                      <div className="w-1 h-1 bg-red-600 rounded-full group-hover:w-2 group-hover:bg-red-400 transition-all duration-300"></div>
                      <span className="group-hover:text-red-400 transition-colors duration-300">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500/30 bg-gradient-to-r from-red-900/30 via-orange-900/20 to-red-900/30 backdrop-blur-md">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Laced in Lust. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-500">Crafted with passion</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                <span className="text-gray-500">for unforgettable experiences</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}