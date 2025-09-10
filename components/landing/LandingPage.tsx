'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CheckCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';

// Image assets - using local public folder and placeholders
const imgSkeletonIsShownComputerMonitor1 = "/skeleton-is-shown-computer-monitor.svg";

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-[#141414]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${imgSkeletonIsShownComputerMonitor1}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 lg:px-20 pt-[65px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#155dfc] rounded-[10px] w-8 h-8 flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <span className="text-white font-bold text-[19.063px]">Xray</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-white">
            <a href="#features" className="text-[15.125px] hover:text-blue-300 transition-colors">Features</a>
            <a href="#how-it-works" className="text-[15.125px] hover:text-blue-300 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-[15px] hover:text-blue-300 transition-colors">Testimonials</a>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-7">
            <button className="text-white text-[13.563px] hover:text-blue-300 transition-colors">Sign In</button>
            <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.016px] px-6 py-2 rounded-[8px]">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[69px] left-0 right-0 bg-[#141414] border-t border-gray-700 z-20">
            <div className="px-4 py-6 space-y-4">
              <a 
                href="#features" 
                className="block text-white text-[15.125px] hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block text-white text-[15.125px] hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="block text-white text-[15px] hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <div className="pt-4 border-t border-gray-700 space-y-3">
                <button className="block w-full text-left text-white text-[13.563px] hover:text-blue-300 transition-colors py-2">
                  Sign In
                </button>
                <Button className="w-full bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.016px] px-6 py-2 rounded-[8px]">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center z-10">
          <div className="flex justify-center px-4 sm:px-8 lg:px-20">
            <div className="text-center max-w-[818px] space-y-6">
              <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-[56.719px] leading-tight sm:leading-[60px] tracking-[-1.5px]">
                AI-Powered Chest <br />
                X-ray Analysis in Seconds
              </h1>
              
              <p className="text-white text-base sm:text-lg lg:text-[18.594px] leading-relaxed sm:leading-[28px] max-w-[563px] mx-auto">
                Upload your X-ray and receive instant insights powered by deep
                learning with medical-grade accuracy.
              </p>
              
              <Link href="/upload">
                <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-[13.125px] px-6 py-3 rounded-[8px] flex items-center gap-2 mx-auto">
                  <ArrowRight className="w-4 h-4" />
                  Upload Your X-ray
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-[8px]">
                <span className="text-[#155dfc] text-[11.063px] font-medium">Trusted by Medical Professionals</span>
              </div>
              
              {/* Title */}
              <h2 className="text-[#101828] font-bold text-2xl sm:text-3xl lg:text-[35.859px] leading-tight sm:leading-[40px]">
                Proven Results in Clinical <br />
                Settings
              </h2>
              
              {/* Description */}
              <p className="text-[#4a5565] text-sm sm:text-base lg:text-[16.594px] leading-relaxed sm:leading-[28px]">
                Healthcare professionals worldwide trust our AI-powered analysis for
                accurate and efficient chest X-ray diagnostics.
              </p>
              
              {/* Testimonials */}
              <div className="space-y-6">
                {/* Testimonial 1 */}
                <div className="bg-white p-6 rounded-[14px] shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#155dfc] text-[16px] font-medium">DS</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <p className="text-[#101828] text-[14.875px] leading-[24px] mb-2">
                        "This tool saved us hours of diagnostic review time."
                      </p>
                      <div className="text-[#101828] font-bold text-[15.875px]">Dr. Santos</div>
                      <div className="text-[#4a5565] text-[12.906px]">Pulmonologist • City Medical Center</div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-white p-6 rounded-[14px] shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#155dfc] text-[15.875px] font-medium">HC</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <p className="text-[#101828] text-[14.875px] leading-[24px] mb-2">
                        "Incredible accuracy for frontline screening."
                      </p>
                      <div className="text-[#101828] font-bold text-[15.5px]">Health Center Admin</div>
                      <div className="text-[#4a5565] text-[13.016px]">Healthcare Administrator • Regional Health Network</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Medical Image */}
            <div className="relative">
              <div className="relative rounded-[10px] overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center justify-center h-[400px] lg:h-[500px]">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700">Medical Professionals</h3>
                    <p className="text-gray-600">Trusted by healthcare professionals worldwide</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#155dfc] to-[#2d44e8] py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-[46.125px] leading-tight sm:leading-[48px]">
                Get Started Today
              </h2>
              
              <h3 className="text-blue-100 text-lg sm:text-xl lg:text-[22.5px] leading-relaxed sm:leading-[32px]">
                Upload Your Chest X-ray
              </h3>
              
              <p className="text-[#bedbff] text-sm sm:text-base lg:text-[16.734px] leading-relaxed sm:leading-[28px] max-w-[641px]">
                Join thousands of healthcare professionals who trust our AI-powered analysis for
                accurate, fast, and reliable chest X-ray diagnostics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/upload" className="w-full sm:w-auto">
                  <Button 
                    variant="outline"
                    className="w-full bg-white text-[#155dfc] hover:bg-gray-50 text-[13.125px] px-6 py-3 rounded-[8px] flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Upload Your X-ray
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  className="border-white text-[#155dfc] hover:bg-white hover:text-[#155dfc] text-[13.234px] px-6 py-3 rounded-[8px] flex items-center gap-2 w-full sm:w-auto"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-[13.453px]">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-[13.344px]">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-[12.906px]">24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Healthcare Technology Image */}
            <div className="relative">
              <div className="relative rounded-[10px] overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-center h-[300px] lg:h-[400px]">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white">AI Technology</h3>
                      <p className="text-blue-100">Advanced machine learning algorithms for medical imaging analysis</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">99.2%</div>
                        <div className="text-sm text-blue-200">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">2.3s</div>
                        <div className="text-sm text-blue-200">Analysis Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">50K+</div>
                        <div className="text-sm text-blue-200">Images Processed</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101828] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#155dfc] rounded-[10px] w-8 h-8 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-white font-bold text-[19.063px]">ChestAI</span>
              </div>
              
              <p className="text-[#99a1af] text-[14.75px] leading-[24px] max-w-[402px]">
                AI-powered chest X-ray analysis providing medical-grade
                accuracy for healthcare professionals worldwide.
              </p>
            </div>
            
            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-[15.625px]">Product</h3>
              <div className="space-y-3">
                <a href="#features" className="block text-[#99a1af] text-[15.125px] hover:text-white transition-colors">Features</a>
                <a href="#pricing" className="block text-[#99a1af] text-[15.125px] hover:text-white transition-colors">Pricing</a>
                <a href="#api" className="block text-[#99a1af] text-[16px] hover:text-white transition-colors">API</a>
                <a href="#docs" className="block text-[#99a1af] text-[14.875px] hover:text-white transition-colors">Documentation</a>
              </div>
            </div>
            
            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-[15.5px]">Company</h3>
              <div className="space-y-3">
                <a href="#about" className="block text-[#99a1af] text-[14.75px] hover:text-white transition-colors">About</a>
                <a href="#privacy" className="block text-[#99a1af] text-[15px] hover:text-white transition-colors">Privacy</a>
                <a href="#terms" className="block text-[#99a1af] text-[15.125px] hover:text-white transition-colors">Terms</a>
                <a href="#contact" className="block text-[#99a1af] text-[14.625px] hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            {/* Empty column for spacing */}
            <div></div>
          </div>
          
          {/* Bottom Border and Copyright */}
          <div className="border-t border-[#1e2939] mt-16 pt-8">
            <p className="text-[#99a1af] text-[14.875px] text-center">
              © 2024 ChestAI. All rights reserved. This is a demonstration application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
