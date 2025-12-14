import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If already triggered, stop observing
    if (hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Lower threshold to 0.2 to ensure it triggers easily on mobile/tablets
        if (entry.isIntersecting) {
          // Disconnect immediately to prevent re-triggering
          observer.disconnect();
          
          // Trigger animation after 500ms delay
          setTimeout(() => {
            setHasTriggered(true);
          }, 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasTriggered]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-android-surface/30 scroll-mt-28 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title (Fades in after split) */}
        <div className={`transition-all duration-1000 ease-out mb-12 ${hasTriggered ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-center text-white">
            <span className="border-b-4 border-android pb-2">Recent Projects</span>
          </h2>
        </div>

        <div className="relative min-h-[500px] flex items-center justify-center perspective-1000">
          
          {/* 
            TABLET VIEW 
            Visible initially, then expands, fades out and blurs to simulate 'splitting'
            Added onClick as a fallback trigger
          */}
          <div 
            onClick={() => setHasTriggered(true)}
            className={`absolute z-20 transition-all duration-1000 ease-[cubic-bezier(0.6,0.05,0.01,0.9)] transform cursor-pointer
            ${hasTriggered ? 'scale-[2] opacity-0 blur-xl pointer-events-none' : 'scale-100 opacity-100 blur-0'}`}
          >
             {/* Realistic Tablet Frame */}
             <div className="w-[300px] h-[200px] md:w-[500px] md:h-[340px] bg-gray-900 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative flex items-center justify-center p-3 border border-gray-700 ring-1 ring-white/10 group">
                
                {/* Screen Area */}
                <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative flex flex-col items-center justify-center z-10">
                    
                    {/* Screen Reflection Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20"></div>

                    {/* Tablet Header/Camera */}
                    <div className="absolute top-0 w-full h-6 flex justify-center z-20">
                         <div className="w-1 h-1 bg-gray-600 rounded-full mt-2 mx-1"></div>
                         <div className="w-20 h-3 bg-gray-900 rounded-b-xl border-b border-l border-r border-gray-800"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center space-y-3 relative z-10 p-6">
                        <div className="flex justify-center mb-2">
                             <div className="w-12 h-12 bg-android/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-android/20 shadow-[0_0_30px_rgba(61,220,132,0.2)] group-hover:scale-110 transition-transform">
                                 <i className="fab fa-android text-3xl text-android animate-pulse"></i>
                             </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                            Recent <span className="text-android">Projects</span>
                        </h1>
                        
                        <div className="flex flex-col items-center gap-2 mt-6 opacity-80">
                             <p className="text-gray-500 font-mono text-[9px] tracking-[0.3em] uppercase">System Locked</p>
                             {/* Improved Swipe Animation */}
                             <div className="w-32 h-1 bg-gray-800/50 rounded-full overflow-hidden relative backdrop-blur-sm">
                                <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-transparent via-android to-transparent animate-[shimmer_2s_infinite]"></div>
                             </div>
                             <p className="text-[9px] text-gray-600 animate-pulse">Initializing secure workspace...</p>
                        </div>
                    </div>

                    {/* Tech Grid Background (Faint) */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
             </div>
          </div>

          {/* 
            GRID VIEW (PHONE CARDS)
            Initially hidden/centered, then flies out to grid positions
          */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4 transition-all duration-500 ${hasTriggered ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {PROJECTS.map((project, index) => {
               // Calculate delay for explosion effect
               const delay = 500 + (index * 150);
               
               return (
                <div 
                  key={project.id} 
                  className={`group relative mx-auto w-full max-w-[260px] transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
                  ${hasTriggered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-50'}`}
                  style={{ transitionDelay: `${hasTriggered ? delay : 0}ms` }}
                >
                  {/* PHONE CHASSIS (Container) */}
                  {/* Reduced height from 580px to 400px (approx 30% reduction for compact look) */}
                  {/* Padding creates the bezel effect. Overflow hidden ensures nothing spills out of the chassis. */}
                  <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl border border-gray-800 transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] h-[400px]">
                      
                      {/* NOTCH (Sits on top of the screen) */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-30 pointer-events-none border-b border-l border-r border-gray-800"></div>
                      
                      {/* SIDE BUTTONS */}
                      <div className="absolute -right-[2px] top-20 w-[2px] h-10 bg-gray-700 rounded-r"></div>
                      <div className="absolute -left-[2px] top-16 w-[2px] h-6 bg-gray-700 rounded-l"></div>

                      {/* SCREEN (Inner Content) */}
                      {/* Adjusted radius to 1.75rem (28px) to match outer 2.5rem (40px) - p-3 (12px) for perfect concentricity */}
                      {/* WebkitMaskImage fixes the corner spill issue on hover in Webkit browsers */}
                      <div className="w-full h-full bg-android-surface rounded-[1.75rem] overflow-hidden relative z-10 flex flex-col" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                          
                          {/* Image Section */}
                          <div className="h-[45%] w-full relative overflow-hidden bg-gray-800">
                             <img 
                               src={project.image} 
                               alt={project.title} 
                               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                             />
                             {/* Glass Overlay on Image */}
                             <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                             
                             {/* Hover Actions */}
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                <a href={project.github} className="w-10 h-10 rounded-full bg-android flex items-center justify-center text-black hover:bg-white hover:scale-110 transition-all shadow-lg">
                                  <i className="fab fa-github text-lg"></i>
                                </a>
                                {project.live && (
                                  <a href={project.live} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-android hover:scale-110 transition-all shadow-lg">
                                    <i className="fas fa-external-link-alt text-lg"></i>
                                  </a>
                                )}
                             </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 p-4 flex flex-col bg-android-surface relative">
                             {/* Subtle gradient at top of content */}
                             <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

                             <div className="flex justify-between items-start mb-2">
                                <h3 className="text-base font-bold text-white group-hover:text-android transition-colors line-clamp-1">{project.title}</h3>
                                <div className="flex space-x-1 mt-1.5 shrink-0">
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                </div>
                             </div>
                             
                             <p className="text-gray-400 text-xs mb-3 line-clamp-3 leading-relaxed">
                               {project.description}
                             </p>
                             
                             <div className="mt-auto">
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] font-bold tracking-wide uppercase text-android bg-android/5 px-2 py-1 rounded-md border border-android/10">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* Home Bar Indicator */}
                                <div className="w-full flex justify-center mt-1">
                                    <div className="w-12 h-1 bg-gray-700/50 rounded-full group-hover:bg-android/50 transition-colors"></div>
                                </div>
                             </div>
                          </div>

                      </div>
                  </div>
                </div>
               );
            })}
          </div>

        </div>
        
        <div className={`text-center mt-12 transition-opacity duration-1000 delay-[1200ms] ${hasTriggered ? 'opacity-100' : 'opacity-0'}`}>
            <a href="https://github.com/Suryanshu-rana" className="inline-flex items-center space-x-2 text-gray-400 hover:text-android transition-colors border-b border-transparent hover:border-android pb-1 text-sm tracking-wide">
                <span>VIEW ARCHIVED PROJECTS</span>
                <i className="fas fa-arrow-right text-xs"></i>
            </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;