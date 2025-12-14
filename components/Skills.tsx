import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-android-surface scroll-mt-28">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16 text-white flex justify-center items-center gap-3">
           <i className="fas fa-laptop-code text-android"></i>
           <span className="border-b-4 border-android pb-2">Skills & Abilities</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {SKILLS.map((skill, index) => (
                <div 
                    key={skill.name} 
                    className="group relative bg-android-card border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-android transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,220,132,0.3)] hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                    {/* Background Glow Effect */}
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-android/20 rounded-full blur-2xl group-hover:bg-android/40 transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-android/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon Wrapper with Funky Animation */}
                    <div className="relative w-20 h-20 rounded-full bg-android-bg border border-white/10 flex items-center justify-center group-hover:bg-android group-hover:border-android transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] shadow-lg z-10">
                        <i className={`${skill.icon} text-4xl text-android group-hover:text-black transition-colors duration-300`}></i>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-300 group-hover:text-white z-10 tracking-wide">{skill.name}</h3>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;