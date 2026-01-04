import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Link as LinkIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gray-100 pt-20">
      {/* Wavy Background Decoration */}
      <div className="w-full overflow-hidden leading-0 rotate-180">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full  fill-[#1a2e44]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V49.75C51.26,80.88,160.41,86.09,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="bg-[#1a2e44] text-white px-8 pb-8 pt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          
          {/* Left Section: Illustration */}
          <div className="hidden md:flex md:col-span-4 justify-center items-center">
             {/* Replace with your specific illustration SVG or Image */}
            <img 
              src='../../public/Contact-Illustration.png' 
              alt="Contact Illustration" 
              className="w-full h-auto opacity"
            />
          </div>

          {/* Right Section: Form */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <Input 
                  placeholder="Your Name *" 
                  className="bg-[#2a3f55] border-none text-white placeholder:text-gray-400 h-12"
                />
                <Input 
                  placeholder="Your Mail *" 
                  type="email"
                  className="bg-[#2a3f55] border-none text-white placeholder:text-gray-400 h-12"
                />
                <Button className="bg-white text-[#1a2e44] hover:bg-gray-200 px-8 py-6 rounded-md font-semibold transition-colors">
                  Send Message
                </Button>
              </div>
              
              <div>
                <Textarea 
                  placeholder="Your Message *" 
                  className="bg-[#2a3f55] border-none text-white placeholder:text-gray-400 min-h-[112px] resize-none"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="border-gray-600 mt-16 mb-8" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between text-sm text-gray-400">
          <p>Copyright ©Abhimanyu . 2025. All Rights Reserved</p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-white font-medium">Follow Us</span>
            <div className="flex gap-2">
              {[Linkedin, LinkIcon, Twitter, Facebook].map((Icon, idx) => (
                <div key={idx} className="p-2 bg-white rounded-full text-[#1a2e44] hover:scale-110 cursor-pointer transition-transform">
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;