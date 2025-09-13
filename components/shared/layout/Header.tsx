'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  variant?: 'landing' | 'upload';
}

export default function Header({ variant = 'landing' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLanding = variant === 'landing';

  return (
    <>
      {/* Navigation */}
      <nav className={`${isLanding ? 'absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 lg:px-20 pt-[65px]' : 'border-b border-gray-200 h-[69px] flex items-center justify-between px-8'}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#155dfc] rounded-[10px] w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold text-[14px] leading-[20px]">X</span>
          </div>
          <span className={`font-bold text-[19.063px] leading-[28px] ${isLanding ? 'text-white' : 'text-[#101828]'}`}>Xray</span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className={`hidden lg:flex items-center gap-8 ${isLanding ? 'text-white' : 'text-[#4a5565]'}`}>
          <a href="#features" className={`text-[15.125px] leading-[24px] transition-colors ${isLanding ? 'hover:text-blue-300' : 'hover:text-gray-700'}`}>Features</a>
          <a href="#how-it-works" className={`text-[15.125px] leading-[24px] transition-colors ${isLanding ? 'hover:text-blue-300' : 'hover:text-gray-700'}`}>How It Works</a>
          <a href="#testimonials" className={`text-[15px] leading-[24px] transition-colors ${isLanding ? 'hover:text-blue-300' : 'hover:text-gray-700'}`}>Testimonials</a>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-7">
          <button className={`text-[13.563px] leading-[20px] transition-colors ${isLanding ? 'text-white hover:text-blue-300' : 'text-[#4a5565] hover:text-gray-700'}`}>Sign In</button>
          <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.016px] leading-[20px] px-6 py-2 rounded-[8px] h-9">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={`lg:hidden p-2 ${isLanding ? 'text-white' : 'text-[#4a5565]'}`}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden ${isLanding ? 'absolute top-[69px] left-0 right-0 bg-[#141414] border-t border-gray-700 z-20' : 'absolute top-[69px] left-0 right-0 bg-white border-t border-gray-200 z-20'}`}>
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#features" 
              className={`block text-[15.125px] leading-[24px] transition-colors py-2 ${isLanding ? 'text-white hover:text-blue-300' : 'text-[#4a5565] hover:text-gray-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className={`block text-[15.125px] leading-[24px] transition-colors py-2 ${isLanding ? 'text-white hover:text-blue-300' : 'text-[#4a5565] hover:text-gray-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className={`block text-[15px] leading-[24px] transition-colors py-2 ${isLanding ? 'text-white hover:text-blue-300' : 'text-[#4a5565] hover:text-gray-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <div className={`pt-4 space-y-3 ${isLanding ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
              <button className={`block w-full text-left text-[13.563px] leading-[20px] transition-colors py-2 ${isLanding ? 'text-white hover:text-blue-300' : 'text-[#4a5565] hover:text-gray-700'}`}>
                Sign In
              </button>
              <Button className="w-full bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.016px] leading-[20px] px-6 py-2 rounded-[8px] h-9">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
