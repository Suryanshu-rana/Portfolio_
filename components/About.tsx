import React, { useEffect, useState } from 'react';
import { USER_INFO, SKILLS } from '../constants';

const About: React.FC = () => {
  // Simple state to trigger internal animations when component mounts/is viewed
  // Note: The parent App.tsx handles the intersection observer for the section fade-in
  // This is for internal staggered effects if we wanted to re-trigger them, 
  // but CSS transition delays works well with the parent's class switching.
  
  const cards = [
    { icon: "fas fa-code", title: "Development", desc: "Mobile & Web Apps", color: "text-android", border: "hover:border-android" },
    { icon: "fas fa-rocket", title: "Performance", desc: "Optimized Code", color: "text-blue-400", border: "hover:border-blue-400" },
    { icon: "fab fa-android", title: "Native", desc: "Kotlin Expert", color: "text-green-400", border: "hover:border-green-400" },
    { icon: "fas fa-layer-group", title: "Scalable", desc: "Robust Architecture", color: "text-purple-400", border: "hover:border-purple-400" }
  ];

  return (
    <section id="about" className="py-24 bg-android-surface/50 scroll-mt-28 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-android/5 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Animated Cards Grid */}
          <div className="md:w-1/2 w-full">
             <div className="grid grid-cols-2 gap-4 md:gap-6 perspective-1000">
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        className={`bg-android-card/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${card.border} group`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors`}>
                            <i className={`${card.icon} text-3xl ${card.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-android transition-colors">{card.title}</h3>
                        <p className="text-gray-400 text-xs font-mono">{card.desc}</p>
                    </div>
                ))}
             </div>
          </div>
          
          {/* Text Content */}
          <div className="md:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold text-white">
              About <span className="text-android">Me</span>
            </h2>
            
            <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-android backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed text-lg italic">
                "{USER_INFO.tagline}"
                </p>
            </div>

            <p className="text-gray-400 leading-relaxed">
              {USER_INFO.bio}
              <br /><br />
              I specialize in building high-quality mobile applications with <span className="text-white font-bold">Kotlin</span> and <span className="text-white font-bold">Flutter</span>, as well as modern web apps using <span className="text-white font-bold">React</span> and <span className="text-white font-bold">Node.js</span>. My goal is to write clean, maintainable code that solves real-world problems.
            </p>

            <div className="pt-2">
               <h4 className="text-white font-bold mb-4 flex items-center">
                   <i className="fas fa-bolt text-yellow-400 mr-2"></i> Tech Stack Highlights
               </h4>
               <div className="flex flex-wrap gap-3">
                 {SKILLS.slice(0, 6).map((skill, idx) => (
                   <span 
                        key={skill.name} 
                        className="px-4 py-2 bg-android-surface rounded-lg text-sm font-medium border border-white/10 text-gray-300 hover:text-white hover:border-android transition-all duration-300 hover:scale-105 cursor-default"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                     <i className={`${skill.icon} mr-2 text-android`}></i>
                     {skill.name}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;