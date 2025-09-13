'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Image assets - using local public folder and placeholders
const imgSkeletonIsShownComputerMonitor1 = "/skeleton-is-shown-computer-monitor.svg";
const imgMedicalProfessionalsInHospital = "/Medical-professionals-in-hospital.svg";
const imgHealthcareTechnologyAi = "/Healthcare-technology-Ai.svg";

export default function LandingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#141414] flex items-center justify-center">
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
        <div className="absolute inset-0 bg-black/52" />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-[56.719px] leading-tight lg:leading-[60px] tracking-[-1.5px]">
              AI-Powered Chest <br />
              X-ray Analysis in Seconds
            </h1>
            
            <p className="text-white font-normal text-lg sm:text-xl lg:text-[18.594px] leading-relaxed lg:leading-[28px] max-w-2xl mx-auto">
              Upload your X-ray and receive instant insights powered by deep
              learning with medical-grade accuracy.
            </p>
            
            <Link href="/upload" className="inline-block">
              <Button className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white text-sm lg:text-[13.125px] px-6 py-3 rounded-[8px] flex items-center gap-2 mx-auto">
                <Upload className="w-4 h-4" />
                Upload Your X-ray
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 border border-[#bedbff] rounded-[8px]">
                <span className="text-[#155dfc] font-normal text-[11.063px] leading-[16px]">Trusted by Medical Professionals</span>
              </div>
              
              {/* Title */}
              <h2 className="text-[#101828] font-bold text-3xl sm:text-4xl lg:text-[35.859px] leading-tight lg:leading-[40px]">
                Proven Results in Clinical <br />
                Settings
              </h2>
              
              {/* Description */}
              <p className="text-[#4a5565] font-normal text-base lg:text-[16.594px] leading-relaxed lg:leading-[28px]">
                Healthcare professionals worldwide trust our AI-powered analysis for
                accurate and efficient chest X-ray diagnostics.
              </p>
              
              {/* Testimonials */}
              <div className="space-y-6">
                {/* Testimonial 1 */}
                <div className="bg-white p-6 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-start gap-4">
                    {/* Quotation mark SVG */}
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/quotient.svg"
                        alt="Quotation mark"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#101828] font-normal text-[14.875px] leading-[24px] mb-2">
                        This tool saved us hours of diagnostic review time.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#155dfc] font-normal text-[16px] leading-[24px]">DS</span>
                        </div>
                        <div>
                          <div className="text-[#101828] font-bold text-[15.875px] leading-[24px]">Dr. Santos</div>
                          <div className="text-[#4a5565] font-normal text-[12.906px] leading-[20px]">Pulmonologist • City Medical Center</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial 2 */}
                <div className="bg-white p-6 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
                  <div className="flex items-start gap-4">
                    {/* Quotation mark SVG */}
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/quotient.svg"
                        alt="Quotation mark"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#101828] font-normal text-[14.875px] leading-[24px] mb-2">
                        Incredible accuracy for frontline screening.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[#155dfc] font-normal text-[15.875px] leading-[24px]">HC</span>
                        </div>
                        <div>
                          <div className="text-[#101828] font-bold text-[15.5px] leading-[24px]">Health Center Admin</div>
                          <div className="text-[#4a5565] font-normal text-[13.016px] leading-[20px]">Healthcare Administrator • Regional Health Network</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Medical Image */}
            <div className="relative">
              <Image
                src={imgMedicalProfessionalsInHospital}
                alt="Medical professionals in hospital"
                width={592}
                height={890}
                className="w-full h-[600px] lg:h-[890px] object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#155dfc] to-[#2d44e8] py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-[46.125px] leading-tight lg:leading-[48px]">
                Get Started Today
              </h2>
              
              <h3 className="text-blue-100 text-lg sm:text-xl lg:text-[22.5px] leading-relaxed lg:leading-[32px]">
                Upload Your Chest X-ray
              </h3>
              
              <p className="text-[#bedbff] text-sm sm:text-base lg:text-[16.734px] leading-relaxed lg:leading-[28px] max-w-2xl">
                Join thousands of healthcare professionals who trust our AI-powered analysis for
                accurate, fast, and reliable chest X-ray diagnostics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/upload" className="w-full sm:w-auto">
                  <Button 
                    className="w-full sm:w-auto bg-white text-[#155dfc] hover:bg-gray-50 text-sm lg:text-[13.125px] px-6 py-3 rounded-[8px] flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Now
                  </Button>
                </Link>
                
                <Button 
                  className="w-full sm:w-auto bg-white border border-white text-[#2d44e8] hover:bg-white hover:text-[#155dfc] text-sm lg:text-[13.234px] px-6 py-3 rounded-[8px] flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-xs lg:text-[13.453px]">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-xs lg:text-[13.344px]">ISO 27001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-2 h-2 text-[#05df72]" />
                  <span className="text-[#bedbff] text-xs lg:text-[12.906px]">24/7 Support</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Healthcare Technology Image */}
            <div className="relative">
              <Image
                src={imgHealthcareTechnologyAi}
                alt="Healthcare technology AI"
                width={592}
                height={325}
                className="w-full h-[300px] lg:h-[325px] object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101828] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#155dfc] rounded-[10px] w-8 h-8 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-white font-bold text-[19.063px] leading-[28px]">ChestAI</span>
              </div>
              
              <p className="text-[#99a1af] text-[14.75px] leading-[24px] max-w-md">
                AI-powered chest X-ray analysis providing medical-grade
                accuracy for healthcare professionals worldwide.
              </p>
            </div>
            
            {/* Product Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-[15.625px] leading-[24px]">Product</h3>
              <div className="space-y-3">
                <a href="#features" className="block text-[#99a1af] text-[15.125px] leading-[24px] hover:text-white transition-colors cursor-pointer">Features</a>
                <a href="#pricing" className="block text-[#99a1af] text-[15.125px] leading-[24px] hover:text-white transition-colors cursor-pointer">Pricing</a>
                <a href="#api" className="block text-[#99a1af] text-[16px] leading-[24px] hover:text-white transition-colors cursor-pointer">API</a>
                <a href="#docs" className="block text-[#99a1af] text-[14.875px] leading-[24px] hover:text-white transition-colors cursor-pointer">Documentation</a>
              </div>
            </div>
            
            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-[15.5px] leading-[24px]">Company</h3>
              <div className="space-y-3">
                <a href="#about" className="block text-[#99a1af] text-[14.75px] leading-[24px] hover:text-white transition-colors cursor-pointer">About</a>
                <a href="#privacy" className="block text-[#99a1af] text-[15px] leading-[24px] hover:text-white transition-colors cursor-pointer">Privacy</a>
                <a href="#terms" className="block text-[#99a1af] text-[15.125px] leading-[24px] hover:text-white transition-colors cursor-pointer">Terms</a>
                <a href="#contact" className="block text-[#99a1af] text-[14.625px] leading-[24px] hover:text-white transition-colors cursor-pointer">Contact</a>
              </div>
            </div>
          </div>
          
          {/* Bottom Border and Copyright */}
          <div className="border-t border-[#1e2939] mt-16 pt-8">
            <p className="text-[#99a1af] text-[14.875px] leading-[24px] text-center">
              © 2024 ChestAI. All rights reserved. This is a demonstration application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}