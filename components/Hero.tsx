import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Android Development";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isTyping) {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length - 1));
        }, 50);
      } else {
        timeout = setTimeout(() => setIsTyping(true), 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 md:pt-32 relative overflow-hidden bg-android-light-bg dark:bg-android-bg transition-colors duration-300">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-android/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        {/* Left Content - Left Aligned */}
        <div className="order-2 md:order-1 space-y-6 z-20 text-left flex flex-col items-start justify-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-wide">Hi There,</h3>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            I'm <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-android to-android-light pb-2">
              {USER_INFO.name}
              {/* Refined Underline: Simple, thick, rounded, glowing */}
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-android rounded-full shadow-[0_0_15px_rgba(61,220,132,0.5)]"></span>
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-medium">
            I Am Into <span className="text-android font-mono font-bold">{text}</span>
            <span className="animate-pulse text-android">|</span>
          </h2>

          {/* Action Buttons & Socials - Left Aligned */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-start gap-8">
            <a
              href="#about"
              className="px-8 py-3 bg-android hover:bg-android-dark text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(61,220,132,0.4)] hover:shadow-[0_0_30px_rgba(61,220,132,0.6)] transform hover:-translate-y-1"
            >
              About Me <i className="fas fa-arrow-down ml-2"></i>
            </a>

            <div className="flex items-center space-x-6">
              <a href={USER_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0077b5] transition-all transform hover:scale-110">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href={USER_INFO.social.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] transition-all transform hover:scale-110">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href={USER_INFO.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1DA1F2] transition-all transform hover:scale-110">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${USER_INFO.social.email}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#EA4335] transition-all transform hover:scale-110">
                <i className="fas fa-envelope text-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Image with Phone Background - Centered in Column */}
        <div className="order-1 md:order-2 flex justify-center items-center relative min-h-[400px] md:min-h-[500px]">
          {/* Main Animated Wrapper for Synchronization */}
          <div className="relative w-[280px] h-[500px] md:w-[320px] md:h-[580px] lg:w-[360px] lg:h-[640px] animate-float group perspective-1000">

            {/* Tilt Container - Rotates both phone and image together on hover */}
            <div className="w-full h-full relative transform -rotate-6 transition-transform duration-700 ease-out group-hover:rotate-0">

              {/* Phone Body - Z-Index 0 */}
              {/* Explicit border-gray-800 to prevent any hover color changes */}
              <div className="absolute inset-0 bg-black border-[12px] border-gray-800 group-hover:border-gray-800 rounded-[3rem] shadow-2xl z-0 overflow-hidden transition-colors duration-0">
                {/* Screen Content */}
                <div className="w-full h-full bg-[#111] relative">
                  <div className="absolute top-0 left-0 w-full h-6 bg-black z-20 flex justify-center">
                    <div className="w-32 h-full bg-black rounded-b-xl"></div>
                  </div>
                  {/* Code Wallpaper */}
                  <div className="p-6 pt-14 font-mono text-[10px] md:text-xs text-android/40 leading-relaxed select-none opacity-80">
                    <span className="text-purple-400">class</span> <span className="text-yellow-400">Suryanshu</span> {'{'}
                    <br />
                    &nbsp;&nbsp;<span className="text-blue-400">@AndroidEntryPoint</span>
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">fun</span> <span className="text-blue-400">onCreate</span>() {'{'}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Building future</span>
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;super.cool()
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;coffee.drink()
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;code.write()
                    <br />
                    &nbsp;&nbsp;{'}'}
                    <br />
                    {'}'}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-android/20 to-transparent"></div>
                </div>
              </div>

              {/* Phone Buttons (Siblings to body to avoid overflow hidden) */}
              <div className="absolute -right-3 top-24 w-1 h-16 bg-gray-700 rounded-r-md"></div>
              <div className="absolute -left-3 top-24 w-1 h-10 bg-gray-700 rounded-l-md"></div>

              {/* The User Image - Z-Index 10 (Above screen, below bottom bezel overlay) */}
              <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 z-10 w-[110%] h-auto pointer-events-none">
                <img
                  src={USER_INFO.heroImage}
                  alt={USER_INFO.name}
                  className="w-full h-auto object-cover drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))"
                  }}
                />
              </div>

              {/* Bottom Bezel Overlay - Z-Index 20 (Sits on top of image bottom) */}
              {/* This simulates the image being 'tucked' behind the bottom of the phone frame */}
              <div className="absolute bottom-0 left-0 right-0 h-24 border-[12px] border-t-0 border-gray-800 rounded-b-[3rem] z-20 pointer-events-none"></div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;