import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../hooks/useSound';

const DecryptedText = ({ text, speed = 25, className = '', hoverOnly = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const chars = '01$#@&%+?[]{}<>ΔΘΛΞΠΣΦΨΩ';
  
  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iteration = 0;
    const length = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      // Play soft high-pitched audio tick as characters scramble
      if (Math.random() < 0.45) {
        sounds.hover();
      }

      if (iteration >= length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
      
      iteration += 1 / 2.5; // Controls the decryption pace
    }, speed);
  };

  useEffect(() => {
    if (!hoverOnly) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    scramble();
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      className={`inline-block select-none cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
