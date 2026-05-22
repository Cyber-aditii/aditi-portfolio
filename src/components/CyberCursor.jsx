import React, { useEffect, useState, useRef } from 'react';

const CyberCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Mouse positions
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if the user is on a touch device
    const checkDevice = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    // Track mouse position
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 3}px, ${mouse.current.y - 3}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    // Track if hovering over buttons, links, inputs, or items with hover handlers
    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.bento-card') || 
        target.closest('form') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOver);

    // Smooth ring follow using requestAnimationFrame (linear interpolation)
    let animId;
    const updateRing = () => {
      const delay = 6; // Lag factor (higher means slower follow)
      
      ringPos.current.x += (mouse.current.x - ringPos.current.x) / delay;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) / delay;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      animId = requestAnimationFrame(updateRing);
    };

    animId = requestAnimationFrame(updateRing);

    // Apply cursor: none to the document body when pointer is active
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile || !visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Center glowing dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none transition-transform duration-75 shadow-[0_0_8px_rgba(34,211,238,0.8)]`}
      />

      {/* Lagging ring / Target reticle */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border border-cyan-400/50 pointer-events-none flex items-center justify-center transition-all duration-300 ${
          hovered 
            ? 'scale-[1.6] border-purple-500 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.25)]' 
            : 'scale-100'
        }`}
      >
        {/* Reticle Target Crosshairs inside ring */}
        <div className={`w-1 h-[2px] absolute top-1/2 left-1 -translate-y-1/2 bg-cyan-400/40 transition-colors ${hovered ? 'bg-purple-400' : ''}`} />
        <div className={`w-1 h-[2px] absolute top-1/2 right-1 -translate-y-1/2 bg-cyan-400/40 transition-colors ${hovered ? 'bg-purple-400' : ''}`} />
        <div className={`w-[2px] h-1 absolute top-1 left-1/2 -translate-x-1/2 bg-cyan-400/40 transition-colors ${hovered ? 'bg-purple-400' : ''}`} />
        <div className={`w-[2px] h-1 absolute bottom-1 left-1/2 -translate-x-1/2 bg-cyan-400/40 transition-colors ${hovered ? 'bg-purple-400' : ''}`} />
      </div>
    </div>
  );
};

export default CyberCursor;
