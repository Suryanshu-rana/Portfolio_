import React, { useState, useEffect } from 'react';
import { USER_INFO } from '../constants';

interface Bug {
  id: number;
  x: number;
  y: number;
  isSquashed: boolean;
}

type GameState = 'broken' | 'playing' | 'booting' | 'working' | 'message';

const Contact: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('broken');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [isContactUnlocked, setIsContactUnlocked] = useState(false);
  
  // Game Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (gameState === 'playing' && score < 5) {
      interval = setInterval(() => {
        if (bugs.length < 4) {
          const newBug = {
            id: Date.now(),
            x: Math.random() * 80 + 10, // 10% to 90%
            y: Math.random() * 80 + 10,
            isSquashed: false
          };
          setBugs(prev => [...prev, newBug]);
        }
      }, 800);
    } else if (score >= 5 && gameState === 'playing') {
      // Win Condition Met
      setGameState('booting');
      setTimeout(() => {
        setGameState('working');
        // Delay for final message - Increased to 4 seconds as requested
        setTimeout(() => {
          setGameState('message');
          setIsContactUnlocked(true); // Unlock the form when message appears
        }, 4000);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [gameState, bugs, score]);

  const squashBug = (id: number) => {
    setBugs(prev => prev.map(bug => 
      bug.id === id ? { ...bug, isSquashed: true } : bug
    ));
    setScore(prev => prev + 1);
    
    // Remove squashed bug after animation
    setTimeout(() => {
      setBugs(prev => prev.filter(bug => bug.id !== id));
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate sending
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setBugs([]);
    setGameState('broken');
    // Note: We don't re-lock the form to avoid annoyance, 
    // but you could set setIsContactUnlocked(false) if desired.
  };

  return (
    <section id="contact" className="py-20 bg-android-bg scroll-mt-28 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-android/5 rounded-full filter blur-3xl opacity-20 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-16 text-white">
          <span className="border-b-4 border-android pb-2">Get In Touch</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          
          {/* LEFT SIDE: Interactive Game */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
             <div className="relative bg-android-surface border-4 border-gray-800 rounded-[2.5rem] p-2 shadow-2xl w-[320px] h-[580px] select-none transform transition-transform hover:scale-105 duration-500">
                {/* Phone Speaker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
                
                {/* Game Screen */}
                <div className={`w-full h-full rounded-[2rem] overflow-hidden relative font-mono text-center flex flex-col transition-colors duration-500 ${gameState === 'broken' ? 'bg-[#2a0000]' : 'bg-[#1a1a1a]'}`}>
                   
                   {/* Status Bar */}
                   <div className={`p-4 pt-8 border-b flex justify-between items-center z-10 transition-colors duration-300 ${gameState === 'broken' ? 'bg-red-900/50 border-red-500/30' : 'bg-gray-900 border-white/10'}`}>
                      <span className={`text-xs font-bold ${gameState === 'broken' ? 'text-red-400 animate-pulse' : 'text-android'}`}>
                        {gameState === 'broken' ? '! SYSTEM FAILURE' : '● SYSTEM STABLE'}
                      </span>
                      {gameState === 'playing' && <span className="text-white text-xs">Bugs: {5 - score} left</span>}
                   </div>

                   {/* Game Content Area */}
                   <div className="flex-1 relative cursor-crosshair overflow-hidden">
                      
                      {/* STATE: BROKEN (Start) */}
                      {gameState === 'broken' && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center flex-col z-20 cursor-pointer"
                          onClick={() => setGameState('playing')}
                        >
                           {/* Glitch Effects */}
                           <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 bg-cover mix-blend-overlay"></div>
                           <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                           
                           <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4 animate-bounce"></i>
                           <h3 className="text-red-400 font-bold text-2xl mb-2 tracking-widest uppercase">Crashing...</h3>
                           <button className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-pulse">
                             <i className="fas fa-wrench mr-2"></i> DEBUG NOW
                           </button>
                        </div>
                      )}

                      {/* STATE: PLAYING (Bugs) */}
                      {gameState === 'playing' && (
                        <>
                           {/* Code Background */}
                           <div className="absolute inset-0 p-4 opacity-30 text-[10px] text-left text-green-500 overflow-hidden pointer-events-none">
                             {Array(25).fill(0).map((_, i) => (
                               <div key={i} className="whitespace-nowrap font-mono">
                                 <span className="text-blue-400">fun</span> brokenLogic() {'{'} <span className="text-red-400">throw Error()</span> {'}'}
                               </div>
                             ))}
                           </div>

                           {/* Bugs */}
                           {bugs.map((bug) => (
                            <button
                              key={bug.id}
                              onClick={() => squashBug(bug.id)}
                              className={`absolute w-12 h-12 flex items-center justify-center transition-all duration-300 ${bug.isSquashed ? 'scale-150 rotate-180 opacity-0' : 'scale-100 animate-bounce'}`}
                              style={{ top: `${bug.y}%`, left: `${bug.x}%` }}
                              disabled={bug.isSquashed}
                            >
                              {bug.isSquashed ? (
                                <i className="fas fa-virus-slash text-android text-3xl"></i>
                              ) : (
                                <i className="fas fa-bug text-red-500 text-2xl filter drop-shadow-[0_0_8px_rgba(239,68,68,1)]"></i>
                              )}
                            </button>
                          ))}
                        </>
                      )}

                      {/* STATE: BOOTING */}
                      {gameState === 'booting' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black z-30">
                           <div className="flex flex-col items-center">
                             <i className="fab fa-android text-6xl text-android mb-6 animate-bounce"></i>
                             <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                               <div className="h-full bg-android w-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
                             </div>
                             <p className="text-android text-xs mt-2 font-mono">REBOOTING SYSTEM...</p>
                           </div>
                        </div>
                      )}

                      {/* STATE: WORKING (App UI) */}
                      {(gameState === 'working' || gameState === 'message') && (
                        <div className="absolute inset-0 bg-white z-20 flex flex-col animate-[fadeIn_0.5s_ease-out]">
                           {/* Fake App Header */}
                           <div className="h-32 bg-android flex flex-col justify-end p-4 rounded-b-[2rem] shadow-lg">
                              <div className="flex items-center space-x-3 text-black">
                                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                                  <i className="fas fa-user"></i>
                                </div>
                                <div>
                                  <h4 className="font-bold leading-none">Welcome Back</h4>
                                  <p className="text-xs opacity-70">App Status: Healthy</p>
                                </div>
                              </div>
                           </div>
                           
                           {/* Fake App Content */}
                           <div className="p-4 space-y-3">
                              <div className="h-24 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                                <div className="text-center">
                                  <h3 className="text-2xl font-bold text-gray-800">100%</h3>
                                  <p className="text-xs text-gray-500">Performance</p>
                                </div>
                              </div>
                              <div className="flex gap-3">
                                <div className="h-24 flex-1 bg-blue-50 rounded-xl shadow-sm"></div>
                                <div className="h-24 flex-1 bg-purple-50 rounded-xl shadow-sm"></div>
                              </div>
                              <div className="h-12 bg-gray-100 rounded-lg w-3/4"></div>
                              <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                           </div>
                        </div>
                      )}

                      {/* STATE: MESSAGE (Overlay) */}
                      {gameState === 'message' && (
                        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 text-center animate-[fadeIn_1s_ease-out]">
                           <div className="space-y-4">
                              <div className="w-16 h-16 bg-android rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(61,220,132,0.6)]">
                                <i className="fas fa-check text-black text-3xl"></i>
                              </div>
                              <h3 className="text-2xl font-bold text-white leading-tight">
                                "You now know the value of a <span className="text-android">bug-free</span> app."
                              </h3>
                              <p className="text-gray-400 text-sm">Communication link established.</p>
                              
                              <button 
                                onClick={resetGame}
                                className="mt-4 px-6 py-2 border border-white/20 hover:bg-white/10 rounded-full text-xs text-white transition-colors"
                              >
                                Replay Simulation
                              </button>
                           </div>
                        </div>
                      )}

                   </div>
                   
                   {/* Bottom App Bar */}
                   <div className="bg-gray-900 p-3 border-t border-white/10 flex justify-around items-center z-10">
                      <i className="fas fa-home text-gray-500"></i>
                      <i className="fas fa-search text-gray-500"></i>
                      <i className="fas fa-user text-gray-500"></i>
                   </div>
                </div>
             </div>
             
             <p className="mt-6 text-gray-500 text-sm font-mono text-center">
               <i className="fas fa-gamepad mr-2 text-android"></i>
               {isContactUnlocked ? "Simulation Complete" : "Debug the app to unlock contact info"}
             </p>
          </div>

          {/* RIGHT SIDE: Animated Form (Locked Initially) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
            
            {/* LOCKED OVERLAY */}
            <div 
                className={`absolute inset-0 z-20 bg-android-surface/60 backdrop-blur-md rounded-3xl flex items-center justify-center transition-all duration-1000 ${isContactUnlocked ? 'opacity-0 pointer-events-none translate-y-full' : 'opacity-100'}`}
            >
                <div className="text-center p-6 bg-black/80 rounded-2xl border border-red-500/30 shadow-2xl max-w-sm mx-auto transform hover:scale-105 transition-transform">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <i className="fas fa-lock text-red-500 text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Connection Locked</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Communication channels are currently offline due to bugs in the system.
                    </p>
                    <div className="text-android font-mono text-xs uppercase tracking-widest animate-pulse">
                        <i className="fas fa-arrow-left mr-2 hidden lg:inline"></i>
                        <i className="fas fa-arrow-up mr-2 lg:hidden"></i>
                        Fix the App to Unlock
                    </div>
                </div>
            </div>

            {/* FORM CONTAINER (Blur effect when locked) */}
            <div className={`bg-android-surface p-8 rounded-3xl border border-white/5 relative overflow-hidden group transition-all duration-1000 ${isContactUnlocked ? 'filter-none opacity-100' : 'filter blur-sm opacity-50'}`}>
               {/* Hover Glow Effect */}
               <div className="absolute -top-20 -right-20 w-40 h-40 bg-android/10 rounded-full blur-3xl group-hover:bg-android/20 transition-all duration-700"></div>

               <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
               <p className="text-gray-400 mb-8">Have a project in mind? Let's build something amazing together.</p>
               
               {/* Quick Copy Email */}
               <div 
                className="mb-8 flex items-center bg-black/30 p-3 rounded-lg border border-white/10 cursor-pointer hover:border-android transition-colors group/email"
                onClick={() => {
                   if (!isContactUnlocked) return;
                   navigator.clipboard.writeText(USER_INFO.social.email);
                   alert("Email copied to clipboard!");
                }}
               >
                 <div className="w-10 h-10 rounded-full bg-android/10 flex items-center justify-center text-android mr-3 group-hover/email:bg-android group-hover/email:text-black transition-all">
                    <i className="fas fa-envelope"></i>
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-gray-500">Official Email</p>
                    <p className="text-white font-mono text-sm truncate">{USER_INFO.social.email}</p>
                 </div>
                 <i className="fas fa-copy text-gray-500 group-hover/email:text-white transition-colors"></i>
               </div>

               <form className="space-y-5" onSubmit={handleFormSubmit}>
                  <div className="group/input">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block group-focus-within/input:text-android transition-colors">Name</label>
                    <input type="text" disabled={!isContactUnlocked} className="w-full bg-android-bg border-b-2 border-gray-700 focus:border-android text-white py-2 px-4 rounded-t-md outline-none transition-colors disabled:opacity-50" placeholder="StartUp Inc." />
                  </div>
                  
                  <div className="group/input">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block group-focus-within/input:text-android transition-colors">Message</label>
                    <textarea rows={3} disabled={!isContactUnlocked} className="w-full bg-android-bg border-b-2 border-gray-700 focus:border-android text-white py-2 px-4 rounded-t-md outline-none transition-colors resize-none disabled:opacity-50" placeholder="We need an app that..."></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus !== 'idle' || !isContactUnlocked}
                    className={`w-full py-4 rounded-xl font-bold text-black transition-all duration-500 relative overflow-hidden ${formStatus === 'idle' ? 'bg-android hover:bg-white hover:shadow-[0_0_20px_rgba(61,220,132,0.6)] transform hover:-translate-y-1' : 'bg-green-600 cursor-default'} disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                  >
                     {formStatus === 'idle' && (
                       <span className="flex items-center justify-center gap-2">
                         Launch Message <i className="fas fa-paper-plane"></i>
                       </span>
                     )}
                     
                     {formStatus === 'sending' && (
                       <span className="flex items-center justify-center gap-2">
                         <i className="fas fa-rocket animate-bounce"></i> Launching...
                       </span>
                     )}

                     {formStatus === 'sent' && (
                        <span className="flex items-center justify-center gap-2">
                          <i className="fas fa-check"></i> Message Sent!
                        </span>
                     )}
                     
                     {/* Progress bar for sending */}
                     <div className={`absolute bottom-0 left-0 h-1 bg-white transition-all duration-[2000ms] ease-out ${formStatus === 'sending' ? 'w-full' : 'w-0'}`}></div>
                  </button>
               </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;