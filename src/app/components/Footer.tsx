// This is a simple footer component for the site.
// It is styled to match the dark theme and uses Tailwind CSS utility classes.

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black/80 border-t border-white/10 py-8 mt-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/80 text-center md:text-left text-sm">
          © {new Date().getFullYear()} Laced in Lust. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <Link 
            href="/privacy-policy" 
            className="text-white/60 hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms-of-service" 
            className="text-white/60 hover:text-white transition-colors"
          >
            Terms of Service
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 5.92c-.8.36-1.67.6-2.58.71a4.48 4.48 0 0 0 1.97-2.48 8.94 8.94 0 0 1-2.83 1.08 4.48 4.48 0 0 0-7.63 4.08A12.7 12.7 0 0 1 3.1 4.86a4.48 4.48 0 0 0 1.39 5.98c-.73-.02-1.42-.22-2.02-.56v.06a4.48 4.48 0 0 0 3.6 4.4c-.34.09-.7.14-1.07.14-.26 0-.51-.02-.76-.07a4.48 4.48 0 0 0 4.18 3.11A9 9 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.41-.01-.61a9.1 9.1 0 0 0 2.23-2.32z" />
            </svg>
          </a>
          <a
            href="mailto:info@lacedinlust.com"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Email"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
