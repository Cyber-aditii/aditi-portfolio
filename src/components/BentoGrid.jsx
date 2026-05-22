import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecryptedText from './DecryptedText';
import { sounds } from '../hooks/useSound';

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Card with Cyber Accents & Sounds ---
const Card = ({ children, className = '', colSpan = '', rowSpan = '' }) => (
  <div 
    onMouseEnter={() => sounds.hover()}
    className={`
      relative overflow-hidden rounded-3xl
      border border-white/[0.08]
      shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500/35 transition-all duration-500
      flex flex-col
      ${colSpan} ${rowSpan} ${className}
      group
    `} 
    style={{ backgroundColor: 'rgba(8,8,22,0.78)', backdropFilter: 'blur(24px)' }}
  >
    {/* Dynamic Background Glow on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    {/* HUD Corner Accents */}
    <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
    <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
    
    {children}
  </div>
);

// --- Cybersecurity Wallpaper Gallery ---
// Displays sliding marquee of cybersecurity and networking visuals
const WallpaperGallery = () => {
  const walls = [
    '/wall1.webp',
    '/wall2.webp',
    '/wall3.webp',
    '/wall4.webp',
    '/wall5.webp',
    '/wall6.webp',
    '/wall7.webp'
  ];
  const all = [...walls, ...walls];
  return (
    <div className="flex items-center h-full relative overflow-hidden w-full">
      <div className="flex gap-4 animate-slide-horizontal w-max grayscale group-hover:grayscale-0 transition-all duration-1000">
        {all.map((src, i) => (
          <img 
            key={i} 
            src={src} 
            className="h-44 aspect-[4/3] object-cover rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5 hover:border-cyan-400/40 transition-all" 
            alt={`Cyber visual ${i+1}`} 
            loading="lazy" 
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none"/>
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none"/>
    </div>
  );
};

// --- Intro Card ---
const IntroCard = () => {
  const [inputVal, setInputVal] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    
    setIsReplying(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Simulate terminal response log output
    const lines = [
      `guest@sec_portal:~$ ./response.sh --query "${inputVal.slice(0, 18)}${inputVal.length > 18 ? '...' : ''}"`,
      `[+] Dispatching secure handshake to Aditi Tinker...`,
      `[+] Connection established with JPR.SEC_CENTRAL`,
      `------------------------------------------------`,
      `👋 Hi! Thanks for dropping a line: "${inputVal}"`,
      `🕵️ About Me: I'm a BCA student from Jaipur & an`,
      `   independent Bug Bounty Hunter. I audit systems`,
      `   to discover vulnerabilities and build defenses.`,
      `🚀 Focus: Web Application Security & Pentesting.`,
      `📬 Connect: Connect via LinkedIn or email me directly`,
      `   at adititinker88@gmail.com`,
      `------------------------------------------------`,
      `[SYS] Session kept alive. Safe hacking!`
    ];

    setReplyText([]);
    let currentLine = 0;
    
    timerRef.current = setInterval(() => {
      if (currentLine < lines.length) {
        const lineToAdd = lines[currentLine];
        setReplyText(prev => [...prev, lineToAdd]);
        currentLine++;
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 150);
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsReplying(false);
    setInputVal('');
    setReplyText([]);
  };

  return (
    <div className="p-8 flex flex-col justify-between h-full relative">
      <div>
        <h2 className="text-4xl font-syne font-bold mb-4 text-white">Hi, I'm Aditi</h2>
        {!isReplying ? (
          <p className="text-white/60 text-lg leading-relaxed max-w-md transition-all duration-300">
            BCA student from Jaipur &amp; independent Bug Bounty Hunter. I audit systems to discover vulnerabilities, specializing in web application security and automated testing.
          </p>
        ) : (
          <div className="bg-black/60 border border-cyan-500/25 rounded-2xl p-4 font-mono text-[11px] text-cyan-400/90 h-[190px] overflow-y-auto no-scrollbar shadow-[inset_0_0_15px_rgba(6,182,212,0.05)] transition-all duration-300">
            {replyText.map((line, idx) => {
              if (!line) return null;
              return (
                <div key={idx} className="mb-1 leading-normal whitespace-pre-wrap">
                  {line.startsWith('guest@') ? (
                    <span>
                      <span className="text-purple-400">guest</span>
                      <span className="text-white">@</span>
                      <span className="text-cyan-300">sec_portal</span>
                      <span className="text-white">:~$ </span>
                      <span className="text-white/90">{line.split(':~$ ')[1]}</span>
                    </span>
                  ) : line.startsWith('👋') || line.startsWith('🕵️') || line.startsWith('🚀') || line.startsWith('📬') ? (
                    <span className="text-white/90 font-sans text-xs">{line}</span>
                  ) : line.startsWith('   ') ? (
                    <span className="text-white/80 font-sans text-xs">{line}</span>
                  ) : (
                    <span className="text-cyan-400/60">{line}</span>
                  )}
                </div>
              );
            })}
            <div className="w-1.5 h-3 bg-cyan-400 inline-block animate-pulse ml-0.5" />
          </div>
        )}
      </div>

      {!isReplying ? (
        <form onSubmit={handleSubmit} className="mt-4 md:mt-8 relative z-10">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Drop a message..." 
              className="bg-white/[0.08] border border-white/10 rounded-full px-6 py-3 w-full text-white placeholder:text-white/30 focus:outline-none focus:bg-white/[0.15] transition-all"
            />
            <button type="submit" className="flex-shrink-0 bg-cyan-400 text-black rounded-full w-11 h-11 flex items-center justify-center font-bold hover:bg-cyan-300 hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4 flex justify-between items-center relative z-10">
          <span className="text-[10px] uppercase font-mono text-cyan-400/50 tracking-wider">Secure Channel Open</span>
          <button 
            onClick={handleReset}
            className="text-[11px] font-mono text-white/50 hover:text-white bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] rounded-full px-4 py-1.5 transition-all"
          >
            Clear Console
          </button>
        </div>
      )}

      {/* Decorative shield SVG */}
      <div className="absolute top-4 right-4 opacity-[0.06] pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      {/* Social links */}
      <div className="absolute bottom-4 right-4 flex gap-3 z-10">
        <a href="https://github.com/Cyber-aditii" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>
        <a href="https://linkedin.com/in/aditi-tinker-8a0854367" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-cyan-400 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
  );
};

// --- Cybersecurity Tools with inline SVG icons ---
const ToolsMarquee = () => {
  const tools = [
    { name: "Kali Linux", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#557C94" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
    { name: "Burp Suite", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><circle cx="12" cy="12" r="10" fill="none" stroke="#E8590C" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="#E8590C" strokeWidth="2"/></svg> },
    { name: "Python", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#3776AB" d="M12 2C6.48 2 6 4.24 6 5.5V8h6v1H4.5C3.12 9 2 10.12 2 11.5v3C2 15.88 3.12 17 4.5 17H6v-2.5C6 13.12 7.12 12 8.5 12h5c1.38 0 2.5-1.12 2.5-2.5V5.5C16 3.12 14.38 2 12 2zm-1 2a1 1 0 110 2 1 1 0 010-2z"/><path fill="#FFD43B" d="M12 22c5.52 0 6-2.24 6-3.5V16h-6v-1h7.5c1.38 0 2.5-1.12 2.5-2.5v-3C22 8.12 20.88 7 19.5 7H18v2.5c0 1.38-1.12 2.5-2.5 2.5h-5C9.12 12 8 13.12 8 14.5v4C8 20.88 9.62 22 12 22zm1-2a1 1 0 110-2 1 1 0 010 2z"/></svg> },
    { name: "Nmap", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><circle cx="12" cy="12" r="10" fill="none" stroke="#00C9FF" strokeWidth="1.5"/><circle cx="12" cy="12" r="6" fill="none" stroke="#00C9FF" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="#00C9FF"/><line x1="12" y1="2" x2="12" y2="22" stroke="#00C9FF" strokeWidth="0.5" opacity="0.5"/><line x1="2" y1="12" x2="22" y2="12" stroke="#00C9FF" strokeWidth="0.5" opacity="0.5"/></svg> },
    { name: "Wireshark", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M2 12 C6 6, 10 18, 14 12 S18 6, 22 12" fill="none" stroke="#1679A7" strokeWidth="2.5"/><circle cx="12" cy="12" r="10" fill="none" stroke="#1679A7" strokeWidth="1.5"/></svg> },
    { name: "Metasploit", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#2596CD" d="M12 2l-2 6h-6l5 3.5-2 6.5 5-3.5 5 3.5-2-6.5 5-3.5h-6z"/></svg> },
    { name: "Linux", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#FCC624" d="M12 2C9 2 7 5 7 8c0 2 .5 3 1 4l-2 4c-.5 1 0 2 1 2h10c1 0 1.5-1 1-2l-2-4c.5-1 1-2 1-4 0-3-2-6-5-6z"/><circle cx="10" cy="7" r="1" fill="#333"/><circle cx="14" cy="7" r="1" fill="#333"/><path d="M10 10c.5.5 3.5.5 4 0" fill="none" stroke="#333" strokeWidth="0.8"/></svg> },
    { name: "Git", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path fill="#F05032" d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.327 2.341l2.66 2.66a1.838 1.838 0 11-1.103 1.03l-2.48-2.48v6.53a1.838 1.838 0 11-1.513-.036V8.73a1.838 1.838 0 01-.997-2.41L7.636 3.593.453 10.776a1.55 1.55 0 000 2.188l10.48 10.48a1.55 1.55 0 002.186 0l10.427-10.427a1.55 1.55 0 000-2.188z"/></svg> },
    { name: "OWASP", icon: <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="none" stroke="#00A1E0" strokeWidth="2"/><path d="M10 12l2 2 4-4" fill="none" stroke="#00A1E0" strokeWidth="2" strokeLinecap="round"/></svg> },
  ];
  return (
    <div className="flex items-center h-full relative overflow-hidden w-full">
      <div className="flex gap-8 md:gap-12 items-center animate-marquee whitespace-nowrap px-4 md:px-12 w-max">
        {[...tools, ...tools].map((t, i) => (
          <div key={i} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0">
            {t.icon}
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-white/60">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Profile Card (uses stylized portrait) ---
const ProfileCard = () => (
  <div className="h-full w-full relative group">
    <img src="/profile_original.jpg" alt="Aditi Tinker - Cybersecurity Researcher" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
    <div className="absolute bottom-4 left-4 text-white">
      <p className="text-[10px] uppercase opacity-50 tracking-widest">Open to Work</p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="font-bold text-sm">Available</span>
      </div>
    </div>
  </div>
);

// --- WRAITH XSS project details (stats/numbers removed per request) ---
const StatsCard = () => (
  <div className="h-full w-full p-6 flex flex-col justify-between relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        {/* Bug icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M8 2l1.88 1.88M14.12 3.88L16 2M9 7.13v-1a3 3 0 016 0v1M12 20c-3.87 0-7-3.13-7-7v-2h14v2c0 3.87-3.13 7-7 7zM5 11l-2-1M19 11l2-1M5 15l-2 1M19 15l2 1M12 20v2"/></svg>
        <h3 className="text-lg font-syne font-bold text-white"><DecryptedText text="WRAITH XSS" /></h3>
      </div>
      <p className="text-white/45 text-[11px] mb-3">Automated recon & advanced XSS vulnerability engine</p>
    </div>

    <div className="space-y-2 relative z-10 text-[11px]">
      {[
        "Automated payload injection & browser rendering",
        "Advanced WAF & filter evasion algorithms",
        "Multithreaded sub-domain crawling & directory brute-force",
        "Custom DOM & blind XSS reporting templates"
      ].map((feat, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-cyan-400 font-mono">›</span>
          <span className="text-white/70 font-mono leading-tight">{feat}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- Skills / Expertise Card ---
const SkillsCard = () => {
  const skills = [
    { name: "Penetration Testing", level: 90, color: "bg-cyan-400" },
    { name: "Network Security", level: 85, color: "bg-blue-400" },
    { name: "Recon Automation", level: 92, color: "bg-green-400" },
    { name: "OWASP Top 10", level: 88, color: "bg-purple-400" },
    { name: "Web App Security", level: 87, color: "bg-pink-400" },
    { name: "Python Scripting", level: 80, color: "bg-yellow-400" },
    { name: "Bug Bounty Hunting", level: 95, color: "bg-emerald-400" },
    { name: "Vulnerability Assessment", level: 89, color: "bg-indigo-400" },
  ];
  return (
    <div className="h-full flex flex-col justify-center px-8 py-6 relative overflow-hidden">
      {/* Decorative terminal icon */}
      <div className="absolute top-4 right-4 opacity-[0.06]">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="18" rx="2" ry="2"/><path d="M6 9l4 3-4 3" fill="#050510"/><line x1="12" y1="15" x2="18" y2="15" stroke="#050510" strokeWidth="2"/></svg>
      </div>

      <h3 className="text-sm font-syne font-bold text-white/80 uppercase tracking-wider mb-3">
        <span className="text-cyan-400 mr-1">›</span> <DecryptedText text="Core Skills" />
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {skills.map((s, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 font-mono">{s.name}</span>
              <span className="text-white/30">{s.level}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`h-full ${s.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Experience Timeline Card (Updated Cybersecurity Trainee to Diploma in Ethical Hacking) ---
const ExperienceCard = () => (
  <div className="h-full w-full p-6 flex flex-col justify-center relative overflow-hidden">
    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-cyan-500/[0.06] rounded-full blur-2xl pointer-events-none" />
    <h3 className="text-sm font-syne font-bold text-white/80 uppercase tracking-wider mb-4">
      <span className="text-cyan-400 mr-1">›</span> <DecryptedText text="Professional Path" />
    </h3>
    <div className="space-y-3 relative z-10 text-xs">
      <div className="flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00D2FF" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Independent Bug Bounty Hunter</p>
          <p className="text-white/40 text-xs">Independent · 2024 – Present</p>
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a4 4 0 00-8 0v2"/></svg>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Diploma in Ethical Hacking</p>
          <p className="text-white/40 text-xs">Samyak Coaching · 6 Months</p>
        </div>
      </div>
    </div>
  </div>
);

// --- Education & Credentials Card ---
const EducationCard = () => (
  <div className="h-full w-full p-6 flex flex-col justify-center relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/[0.04] rounded-full blur-2xl pointer-events-none" />
    <h3 className="text-sm font-syne font-bold text-white/80 uppercase tracking-wider mb-3">
      <span className="text-cyan-400 mr-1">›</span> <DecryptedText text="Education & Certs" />
    </h3>
    <div className="space-y-3 relative z-10 text-xs">
      <div>
        <p className="text-white text-sm font-semibold">Bachelor of Computer Applications</p>
        <p className="text-white/60 text-[11px]">Maharani College, Jaipur | SGPA 7.4 (Semester 4)</p>
      </div>
      <div>
        <p className="text-white text-sm font-semibold">Senior Secondary (Class XII)</p>
        <p className="text-white/60 text-[11px]">Maheshwari Girls Sr. Sec. School | Commerce with IP (84%)</p>
      </div>
      <div className="pt-1 flex gap-2 flex-wrap">
        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-mono">NVIDIA DLI – Cybersecurity</span>
        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded text-[10px] font-mono">NVIDIA DLI – Networking</span>
      </div>
    </div>
  </div>
);

// --- Main BentoGrid ---
const BentoGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".bento-card", {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" }),
        start: "top 85%",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ backgroundColor: '#050510' }} className="py-24 px-4 md:px-8 lg:px-12 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[200px] gap-4 md:gap-5">

        {/* Row 1-2: Sliding Cybersecurity Visuals + Intro */}
        <Card colSpan="md:col-span-5" rowSpan="row-span-2 md:row-span-2" className="bento-card opacity-0 translate-y-16">
          <WallpaperGallery />
        </Card>
        <Card colSpan="md:col-span-7" rowSpan="row-span-2 md:row-span-2" className="bento-card opacity-0 translate-y-16">
          <IntroCard />
        </Card>

        {/* Row 3: Tools + Profile + Stats */}
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-16">
          <ToolsMarquee />
        </Card>
        <Card colSpan="md:col-span-2" rowSpan="md:row-span-2" className="bento-card opacity-0 translate-y-16">
          <ProfileCard />
        </Card>
        <Card colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bento-card opacity-0 translate-y-16">
          <StatsCard />
        </Card>

        {/* Row 4: Skills */}
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-16">
          <SkillsCard />
        </Card>

        {/* Row 5: Experience + Education */}
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-16">
          <ExperienceCard />
        </Card>
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-16">
          <EducationCard />
        </Card>

      </div>
    </section>
  );
};

export default BentoGrid;
