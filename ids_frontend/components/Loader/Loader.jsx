"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Terminal } from 'lucide-react';

const Loader = ({ text = "INITIALIZING IDS PROTOCOLS..." }) => {
  const [loadingText, setLoadingText] = useState(text);
  const [progressBlocks, setProgressBlocks] = useState(0);

  // Cycle through Cyber Security themed texts
  useEffect(() => {
    if (text !== "INITIALIZING IDS PROTOCOLS...") return;
    
    const texts = [
      "INITIALIZING IDS PROTOCOLS...",
      "SCANNING INBOUND TRAFFIC...",
      "VERIFYING NODE SIGNATURES...",
      "ANALYZING PACKET ANOMALIES...",
      "SECURING IOT PERIMETER...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 1500);

    return () => clearInterval(interval);
  }, [text]);

  // Terminal block progress bar loop
  useEffect(() => {
    const pInterval = setInterval(() => {
      setProgressBlocks(prev => (prev >= 10 ? 0 : prev + 1));
    }, 300);
    return () => clearInterval(pInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#030914]/95 backdrop-blur-md transition-colors duration-300 font-mono">
      <div className="relative flex flex-col items-center">
        
        {/* Cyber Security Radar Scanner */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
          
          {/* Radar background grid */}
          <div className="absolute inset-0 rounded-full border border-blue-500/30 overflow-hidden">
             <div className="w-full h-full opacity-20" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
          </div>

          {/* Radar Sweeper */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            style={{
              background: "conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.1) 90%, rgba(59, 130, 246, 0.6) 100%)",
              clipPath: "circle(50% at 50% 50%)"
            }}
          />
          
          {/* Outer Firewall Rings */}
          <motion.div 
            className="absolute -inset-4 rounded-full border-t-2 border-l-2 border-blue-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute -inset-8 rounded-full border border-dashed border-blue-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          />

          {/* Center Shield Icon */}
          <div className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#030914] rounded-full border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ShieldAlert className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </motion.div>
          </div>
          
          {/* Target Reticle Elements */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-blue-500/30 -translate-x-1/2" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-blue-500/30 -translate-y-1/2" />
        </div>

        {/* Terminal Output */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center space-y-3 sm:space-y-4 w-[90vw] max-w-xs sm:max-w-none sm:w-72">
          <div className="flex items-center gap-2 text-blue-400 bg-blue-950/40 border border-blue-500/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded shadow-[0_0_10px_rgba(59,130,246,0.1)] w-full justify-center backdrop-blur-sm">
            <Terminal className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase truncate">
              {loadingText}
            </span>
          </div>

          {/* Block Progress Bar */}
          <div className="flex gap-[2px] sm:gap-[3px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className={`h-2 sm:h-2.5 w-4 sm:w-5 md:w-6 rounded-[1px] transition-colors duration-100 ${i < progressBlocks ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-gray-800'}`}
              />
            ))}
          </div>
        </div>

        {/* Deep background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full -z-10" />
      </div>
    </div>
  );
};

export default Loader;