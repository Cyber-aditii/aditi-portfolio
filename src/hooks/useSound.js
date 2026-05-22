import { useState, useEffect } from 'react';

class ProceduralSoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // default muted to comply with browser autoplay policies
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 800, duration = 0.05, type = 'sine', volume = 0.03) {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  hover() {
    // Ultra short subtle blip
    this.playBeep(1400, 0.04, 'sine', 0.015);
  }

  click() {
    // Sharp high quality pluck
    this.playBeep(780, 0.08, 'triangle', 0.025);
  }

  success() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      // Fast rising computer arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.015, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.1);
      });
    } catch (e) {}
  }

  reset() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.18);
    } catch (e) {}
  }

  error() {
    // Double low frequency error buzz
    this.playBeep(180, 0.1, 'sawtooth', 0.015);
    setTimeout(() => this.playBeep(150, 0.15, 'sawtooth', 0.015), 120);
  }
}

export const sounds = new ProceduralSoundSystem();

export const useSound = () => {
  const [muted, setMuted] = useState(sounds.isMuted);

  const toggleMute = () => {
    sounds.init();
    sounds.isMuted = !sounds.isMuted;
    setMuted(sounds.isMuted);
    
    // Play a test chirp to confirm unmuting
    if (!sounds.isMuted) {
      setTimeout(() => sounds.success(), 50);
    }
  };

  return {
    muted,
    toggleMute,
    playHover: () => sounds.hover(),
    playClick: () => sounds.click(),
    playSuccess: () => sounds.success(),
    playReset: () => sounds.reset(),
    playError: () => sounds.error()
  };
};
