"use client";

import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(text, speed = 50, delay = 1000) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (!isComplete) {
      timeoutRef.current = setTimeout(() => {
        setIsComplete(true);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, text, speed, delay, isComplete]);

  const reset = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return { displayedText, isComplete, reset };
}