import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecryptedText from './DecryptedText';
import { useSound } from '../hooks/useSound';

gsap.registerPlugin(ScrollTrigger);

const fonts = {
  header: 'font-syne',
  body: 'font-satoshi'
};

const Hero = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const textRef = useRef(null);
  const { muted, toggleMute, playClick } = useSound();

  useEffect(() => {
    const bg = bgImageRef.current;
    const text = textRef.current;
    const container = containerRef.current;

    if (!bg || !container) return;

    // Create parallax and fade animation on scroll
    const ctx = gsap.context(() => {
      gsap.to(bg, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 1.45,
        opacity: 0.12,
        filter: "blur(10px)",
        yPercent: 8,
        ease: "none"
      });

      gsap.to(".cyber-grid", {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 1.6,
        yPercent: -20,
        opacity: 0.45,
        ease: "none"
      });

      // Disperse floating cyber cards on scroll
      gsap.to(".floating-card-1", {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        xPercent: -60,
        yPercent: -30,
        opacity: 0,
        ease: "none"
      });

      gsap.to(".floating-card-2", {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        xPercent: 60,
        yPercent: -40,
        opacity: 0,
        ease: "none"
      });

      gsap.to(".floating-card-3", {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 40,
        opacity: 0,
        ease: "none"
      });

      if (text) {
        gsap.to(text, {
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          yPercent: -20,
          opacity: 0,
          ease: "none"
        });
      }

      // Mouse-move 3D Parallax & Rotation
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { width, height } = container.getBoundingClientRect();
        
        // Offset relative to center (-0.5 to 0.5)
        const xOffset = (clientX / width) - 0.5;
        const yOffset = (clientY / height) - 0.5;

        // Smooth background shift (moves in opposite direction)
        gsap.to(bg, {
          x: xOffset * -25,
          y: yOffset * -25,
          duration: 1.2,
          ease: "power2.out"
        });

        // Floating cyber cards parallax (move in opposite directions/depths)
        gsap.to(".floating-card-1", {
          x: xOffset * 55,
          y: yOffset * 55,
          rotationY: xOffset * 18,
          rotationX: yOffset * -18,
          duration: 0.8,
          ease: "power2.out"
        });

        gsap.to(".floating-card-2", {
          x: xOffset * -45,
          y: yOffset * -45,
          rotationY: xOffset * -15,
          rotationX: yOffset * 15,
          duration: 0.9,
          ease: "power2.out"
        });

        gsap.to(".floating-card-3", {
          x: xOffset * 30,
          y: yOffset * -30,
          rotationY: xOffset * 10,
          rotationX: yOffset * -10,
          duration: 0.7,
          ease: "power2.out"
        });
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050510' }} className="relative h-screen w-full overflow-hidden">
      {/* Background Image Container */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center select-none pointer-events-none scale-105"
        style={{ 
          backgroundImage: "url('/bg_rooftop.jpg')",
        }}
      />

      {/* 3D Cyber Grid Overlay reacting to Scroll */}
      <div 
        className="cyber-grid absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 210, 255, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 210, 255, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center',
          transform: 'perspective(600px) rotateX(65deg) translateY(-20px)',
          transformOrigin: 'top center',
        }}
      />

      {/* Cyberpunk Scanlines */}
      <div className="absolute inset-0 z-10 bg-repeat pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 4px, 6px 100%" }} />

      {/* Modern overlays for premium dark feel */}
      <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      
      {/* Radial vignette overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at center, transparent 38%, rgba(5,5,16,0.72) 75%, #050510 100%)'
        }} 
      />

      {/* Pulsing center glow behind the user's face */}
      <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-cyan-500/[0.04] blur-[90px] pointer-events-none z-10 animate-pulse" />

      {/* Laser Scanning Line */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent animate-scan z-15 pointer-events-none" />

      {/* Telemetry Target Reticle */}
      <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none z-10 opacity-[0.06] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 animate-[spin_60s_linear_infinite]">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.25" fill="none" />
          <path d="M 50 2 L 50 15 M 50 98 L 50 85 M 2 50 L 15 50 M 98 50 L 85 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Telemetry HUD overlays */}
      <div className="absolute top-28 left-8 z-15 font-mono text-[9px] text-cyan-400/40 tracking-widest hidden lg:block leading-relaxed select-none pointer-events-none">
        <p>NODE // JPR.SEC_CENTRAL</p>
        <p>LOC // 26.9124° N, 75.7873° E</p>
        <p>ALT // 431M.MSL</p>
      </div>
      <div className="absolute top-28 right-8 z-15 font-mono text-[9px] text-purple-400/40 tracking-widest text-right hidden lg:block leading-relaxed select-none pointer-events-none">
        <p>SYS_STATUS // ACTIVE_MONITOR</p>
        <p>STREAMS // OK.MUTATING</p>
        <p>WAF_MODE // BYPASS_ENGAGED</p>
      </div>

      {/* Smooth bottom fade into Bento grid */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#050510] to-transparent z-15" />

      {/* 3D Floating Interactive Cyber Cards */}
      <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none">
        
        {/* Floating Card 1: System Console */}
        <div className="floating-card-1 absolute top-[28%] left-[8%] hidden md:flex flex-col gap-1.5 bg-black/55 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 shadow-[0_0_25px_rgba(6,182,212,0.12)] max-w-[190px] text-white">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
            <span className="text-[9px] uppercase text-cyan-400 tracking-wider font-mono font-bold">MONITOR ACTIVE</span>
          </div>
          <div className="font-mono text-[9px] text-white/50 leading-tight space-y-0.5">
            <p>SHELL: bash-5.2#</p>
            <p className="text-green-400/80">&gt; nmap -sC target.org</p>
            <p>PORTS: 22, 80, 443 OPEN</p>
            <p className="text-yellow-500/70">SEC_LEVEL: EXPOSED</p>
          </div>
        </div>

        {/* Floating Card 2: WRAITH XSS Engine Status */}
        <div className="floating-card-2 absolute top-[45%] right-[10%] hidden md:flex flex-col gap-1.5 bg-black/55 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 shadow-[0_0_25px_rgba(168,85,247,0.12)] max-w-[210px] text-white">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-[9px] uppercase text-purple-400 tracking-wider font-mono font-bold">WRAITH XSS ENGINE</span>
          </div>
          <div className="font-mono text-[9px] text-white/50 leading-tight space-y-0.5">
            <p>DOM_CRW: 147 URLs</p>
            <p>PAYLOAD: &lt;img src=x onerror=alert()&gt;</p>
            <p className="text-purple-300">WAF_BYPASS: OK</p>
            <p className="text-cyan-400">STATE: MUTATING...</p>
          </div>
        </div>

        {/* Floating Card 3: Cyber Security Badges */}
        <div className="floating-card-3 absolute bottom-[22%] left-[28%] hidden md:flex flex-col gap-1 bg-black/60 backdrop-blur-md border border-green-500/25 rounded-xl px-3 py-2 shadow-[0_0_15px_rgba(34,197,94,0.1)] text-white">
          <div className="flex items-center gap-1.5 text-[8px] font-mono text-green-400 font-bold uppercase tracking-widest">
            <span className="w-1 h-1 bg-green-400 rounded-full" /> NVIDIA DLI CERTIFIED // NETWORKING
          </div>
        </div>

      </div>

      {/* Content */}
      <div ref={textRef} className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 text-white">
        {/* Top Header Links */}
        <div className="flex justify-between items-start w-full">
          {/* Logo / Tag */}
          <div className="flex items-center gap-3">
            {/* Custom Circular Mesh Logo */}
            <div className="w-9 h-9 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-400/5 relative overflow-hidden group-hover:border-cyan-400/60 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400 animate-[spin_12s_linear_infinite]">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v20M2 12h20M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6" opacity="0.6" />
              </svg>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 opacity-85">
              <DecryptedText text="ADITI.SEC_PORTAL" hoverOnly={true} />
            </div>
          </div>
          {/* Top Right Links with Circular Button */}
          <div className="flex items-center gap-4 text-sm md:text-base font-satoshi opacity-85">
            <div className="flex flex-col items-end text-xs font-mono tracking-wider text-white/60">
              <a href="https://linkedin.com/in/aditi-tinker-8a0854367" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors uppercase">LinkedIn ↗</a>
              <a href="mailto:adititinker88@gmail.com" className="hover:text-cyan-400 transition-colors uppercase">Get in touch</a>
            </div>
            {/* Procedural Sound Toggle / Waveform Visualizer */}
            <button 
              onClick={() => { playClick(); toggleMute(); }}
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-400/45 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all"
              title={muted ? "Unmute system sounds" : "Mute system sounds"}
            >
              {muted ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
                </svg>
              ) : (
                <div className="flex gap-0.5 items-end h-3">
                  <span className="w-[2px] bg-cyan-400 rounded-full animate-[music-bar-1_0.8s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-cyan-400 rounded-full animate-[music-bar-2_0.8s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-cyan-400 rounded-full animate-[music-bar-3_0.8s_ease-in-out_infinite]" />
                </div>
              )}
            </button>
            {/* Cyan Diagonal Arrow Button */}
            <a href="mailto:adititinker88@gmail.com" className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center hover:scale-105 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.25)]">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div>
            <span className="font-mono text-xs text-cyan-400/75 tracking-widest uppercase mb-2 block">// BUG BOUNTY HUNTER • NETWORKING</span>
            <h1 className={`${fonts.header} text-5xl md:text-[6.8rem] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70`}>
              <DecryptedText text="CYBERSECURITY" hoverOnly={true} />
              <br />
              <DecryptedText text="RESEARCHER" hoverOnly={true} />
            </h1>
          </div>

          <div className="max-w-xs md:max-w-md flex flex-col gap-4">
            <p className={`${fonts.body} text-base md:text-lg text-white/75 leading-relaxed`}>
              BCA student from Jaipur &amp; independent Bug Bounty Hunter specializing in web application security, network pentesting, and automated vulnerability research.
            </p>
            {/* Scroll Indicator with bottom text */}
            <div className="flex items-center gap-4 mt-2">
              <div className="animate-bounce opacity-60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-white/40">Scroll to Decrypt Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
