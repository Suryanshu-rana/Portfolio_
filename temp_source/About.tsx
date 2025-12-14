import React, { useState } from 'react';
import { USER_INFO, SKILLS } from '../constants';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'main' | 'journey' | 'personal'>('main');

  return (
    <section id="about" className="py-24 bg-android-surface/50 scroll-mt-28 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-android/5 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
            About <span className="text-android">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-16 items-start justify-center">
          
          {/* LEFT: Static Profile Card - Visible on ALL screens */}
          <div className="w-full md:w-1/3 flex justify-center">
             <div className="w-full max-w-sm bg-android-card rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col items-center hover:border-android transition-colors duration-300 group">
                
                {/* 3D Pop-out Profile Image Container */}
                <div className="relative w-40 h-40 mb-8 mt-4 mx-auto cursor-pointer">
                    {/* 1. Animated Gradient Glow/Border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-android via-blue-500 to-purple-600 animate-[spin_4s_linear_infinite] blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* 2. Dark Background Circle (The Frame Interior) */}
                    <div className="absolute inset-[3px] rounded-full bg-gray-900 border border-white/10 z-0"></div>
                    
                    {/* 3. The Image - Scaled & Positioned to Pop Out */}
                    <img 
                      src={USER_INFO.heroImage} 
                      alt="Profile" 
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-[85%] h-[130%] object-cover object-top rounded-b-full transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    />

                    {/* 4. Bottom overlay to blend the base */}
                    <div className="absolute inset-[3px] rounded-full border-[3px] border-transparent border-b-black/60 z-20 pointer-events-none"></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{USER_INFO.name}</h3>
                <p className="text-android font-mono text-sm mb-6">&lt;Senior Developer /&gt;</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-android/30 transition-colors">
                       <div className="text-3xl font-bold text-white mb-1">3+</div>
                       <div className="text-xs text-gray-400 uppercase tracking-wider">Years Exp.</div>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl text-center border border-white/5 hover:border-android/30 transition-colors">
                       <div className="text-3xl font-bold text-white mb-1">15+</div>
                       <div className="text-xs text-gray-400 uppercase tracking-wider">Projects</div>
                    </div>
                </div>
             </div>
          </div>
          
          {/* RIGHT: Tabbed Content */}
          <div className="w-full md:w-1/2">
            
            {/* Tab Navigation */}
            <div className="flex space-x-2 bg-black/20 p-1 rounded-xl mb-8 border border-white/5 backdrop-blur-sm">
                {['main', 'journey', 'personal'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-300 capitalize ${activeTab === tab ? 'bg-android text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {tab === 'main' ? 'Overview' : tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[300px]">
                {activeTab === 'main' && (
                    <div className="animate-[slideUp_0.5s_ease-out]">
                        <h3 className="text-2xl font-bold text-white mb-4">Hello, I'm Suryanshu.</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            {USER_INFO.bio}
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            I specialize in building high-quality mobile applications with <span className="text-white font-bold">Kotlin</span> and <span className="text-white font-bold">Flutter</span>, as well as modern web apps using <span className="text-white font-bold">React</span>. My goal is to write clean, maintainable code.
                        </p>
                        
                        <h4 className="text-android font-bold mb-3 uppercase text-xs tracking-widest">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS.slice(0, 8).map(skill => (
                                <span key={skill.name} className="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-gray-300 border border-white/10 hover:border-android hover:text-android transition-colors cursor-default">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'journey' && (
                    <div className="animate-[slideUp_0.5s_ease-out] space-y-6">
                        <div className="relative pl-8 border-l-2 border-android/30 space-y-8">
                            {/* Timeline Item 1 */}
                            <div className="relative">
                                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-android border-4 border-android-bg"></div>
                                <div className="text-sm text-android font-bold mb-1">2023 - Present</div>
                                <h4 className="text-white font-bold text-lg">Senior Android Developer</h4>
                                <p className="text-gray-500 text-sm">Freelance & Open Source</p>
                                <p className="text-gray-400 text-sm mt-2">Building complex mobile applications and contributing to major open-source libraries.</p>
                            </div>
                            {/* Timeline Item 2 */}
                            <div className="relative">
                                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gray-600 border-4 border-android-bg group-hover:bg-android transition-colors"></div>
                                <div className="text-sm text-gray-500 font-bold mb-1">2021 - 2023</div>
                                <h4 className="text-white font-bold text-lg">Web Developer</h4>
                                <p className="text-gray-500 text-sm">Tech Startup</p>
                                <p className="text-gray-400 text-sm mt-2">Full-stack web development using MERN stack. Optimized backend performance by 40%.</p>
                            </div>
                            {/* Timeline Item 3 */}
                            <div className="relative">
                                <div className="absolute -left-[37px] w-4 h-4 rounded-full bg-gray-600 border-4 border-android-bg"></div>
                                <div className="text-sm text-gray-500 font-bold mb-1">2019 - 2021</div>
                                <h4 className="text-white font-bold text-lg">Computer Science Student</h4>
                                <p className="text-gray-500 text-sm">University</p>
                                <p className="text-gray-400 text-sm mt-2">Specialized in Mobile Computing and Algorithms. Graduated with Honors.</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'personal' && (
                    <div className="animate-[slideUp_0.5s_ease-out] grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-android/50 transition-colors group">
                            <i className="fas fa-gamepad text-2xl text-purple-400 mb-2 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="text-white font-bold">Gamer</h4>
                            <p className="text-xs text-gray-400 mt-1">FPS & RPG enthusiast. Ranking high in competitive leagues.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-android/50 transition-colors group">
                            <i className="fas fa-music text-2xl text-blue-400 mb-2 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="text-white font-bold">Music Lover</h4>
                            <p className="text-xs text-gray-400 mt-1">Playing guitar and collecting vintage vinyl records.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-android/50 transition-colors group">
                            <i className="fas fa-coffee text-2xl text-yellow-700 mb-2 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="text-white font-bold">Coffee Addict</h4>
                            <p className="text-xs text-gray-400 mt-1">Powered by dark roast. Exploring new brewing methods.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-android/50 transition-colors group">
                            <i className="fas fa-plane text-2xl text-green-400 mb-2 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="text-white font-bold">Traveler</h4>
                            <p className="text-xs text-gray-400 mt-1">Visited 10+ countries. Always looking for the next adventure.</p>
                        </div>
                    </div>
                )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;