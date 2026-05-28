"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Terminal, Lock, ShieldCheck } from "lucide-react";



const SplashAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("LOCKED"); // LOCKED -> SCANNING -> SECURED

  useEffect(() => {
    let currentProgress = 0;
    
    // Progress Bar Loop
    const progTimer = setInterval(() => {
      currentProgress += Math.random() * 2.5;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(progTimer);
        setStatus("SECURED");
        setTimeout(onComplete, 1200);
      } else if (currentProgress > 30 && status === "LOCKED") {
        setStatus("SCANNING");
      }
      setProgress(currentProgress);
    }, 100);

    return () => {
      clearInterval(progTimer);
    };
  }, [onComplete]);

  // Determine colors and icons based on status
  const isSecured = status === "SECURED";
  const colorClass = isSecured ? "text-emerald-400" : "text-blue-400";
  const borderClass = isSecured ? "border-emerald-500" : "border-blue-500";
  const bgClass = isSecured ? "bg-emerald-500" : "bg-blue-500";
  const glowClass = isSecured ? "shadow-[0_0_20px_rgba(16,185,129,0.5)]" : "shadow-[0_0_20px_rgba(59,130,246,0.5)]";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] font-mono overflow-hidden"
    >
      {/* Dynamic Animated Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)", 
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 20%, transparent 80%)"
          }} 
        />
        
        {/* Animated Glowing Orbs */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-violet-600/20 blur-[120px] rounded-full" 
        />
        
        {/* Center Reactive Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[600px] aspect-square blur-[140px] rounded-full transition-colors duration-1000 ${isSecured ? 'bg-emerald-600/20' : 'bg-blue-600/20'}`} />
      </div>
      
      {/* Central Cyber Security Node */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Radar/Shield Ring */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center mb-8 md:mb-12">
          
          {/* Sweeping Radar */}
          {!isSecured && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.1) 90%, rgba(59, 130, 246, 0.8) 100%)",
                clipPath: "circle(50% at 50% 50%)"
              }}
            />
          )}

          {/* Outer Dashed Ring */}
          <motion.div
            animate={{ rotate: isSecured ? 0 : -360 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className={`absolute inset-4 rounded-full border-2 border-dashed ${borderClass} opacity-40`}
          />

          {/* Inner Hexagonal/Geometric Frame */}
          <div className="absolute inset-6 sm:inset-8 flex items-center justify-center">
            <div className={`w-full h-full border ${borderClass} opacity-60 rotate-45 ${glowClass} transition-colors duration-500`} />
            <div className={`absolute w-full h-full border ${borderClass} opacity-60 ${glowClass} transition-colors duration-500`} />
          </div>

          {/* Core Icon */}
          <div className={`relative z-10 bg-[#050B14] p-3 sm:p-4 md:p-5 rounded-xl border ${borderClass} ${glowClass} transition-all duration-500`}>
            {status === "LOCKED" && <Lock className="w-8 h-8 md:w-12 md:h-12 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />}
            {status === "SCANNING" && <ShieldAlert className="w-8 h-8 md:w-12 md:h-12 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />}
            {status === "SECURED" && <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />}
          </div>
          
        </div>



        {/* Sleek Continuous Progress Bar */}
        <div className="mt-8 md:mt-10 w-[90vw] max-w-sm sm:max-w-md md:max-w-[32rem]">
          <div className="flex justify-between text-[10px] sm:text-xs md:text-sm mb-3 font-bold tracking-[0.2em] uppercase">
            <span className={colorClass}>{status}</span>
            <span className={colorClass}>{Math.floor(progress)}%</span>
          </div>
          <div className="relative h-1.5 sm:h-2 md:h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800 shadow-inner">
            <motion.div 
              className={`absolute top-0 left-0 h-full ${bgClass} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              style={{ boxShadow: `0 0 15px ${isSecured ? 'rgba(16,185,129,0.8)' : 'rgba(59,130,246,0.8)'}` }}
            />
            {/* Moving light sweep over the progress bar */}
            {!isSecured && (
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
              />
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function SplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {children}
      <AnimatePresence>
        {showSplash && <SplashAnimation onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
    </>
  );
}
