import React from 'react';
import useLenis from './hooks/useLenis';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import CyberCursor from './components/CyberCursor';
import CyberMeshBackground from './components/CyberMeshBackground';

function App() {
  useLenis();

  return (
    <div style={{ backgroundColor: '#050510' }} className="min-h-screen relative overflow-hidden">
      {/* Global Background Particle Mesh */}
      <CyberMeshBackground />
      
      {/* Interactive Custom Reticle Cursor */}
      <CyberCursor />

      {/* Content wrapper with relative positioning to sit on top of background */}
      <div className="relative z-10">
        <Hero />
        <BentoGrid />

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.04] mt-12 text-center text-white/40 text-xs font-satoshi flex flex-col items-center gap-4">
        {/* Social Icons with brand-themed glow hover effects */}
        <div className="flex gap-6 items-center">
          <a 
            href="https://github.com/Cyber-aditii" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.12)] transition-all duration-300"
            title="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/aditi-tinker-8a0854367" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.18)] transition-all duration-300"
            title="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="mailto:adititinker88@gmail.com" 
            className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-purple-400 hover:border-purple-400/40 hover:bg-purple-500/5 hover:shadow-[0_0_15px_rgba(168,85,247,0.18)] transition-all duration-300"
            title="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
        
        {/* Copyright & Tagline */}
        <div className="flex flex-col items-center gap-1 opacity-45">
          <p>© 2026 Aditi Tinker. All rights reserved.</p>
          <p className="font-mono tracking-widest uppercase text-[9px] text-cyan-400">Hack ethically. Stay curious.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
