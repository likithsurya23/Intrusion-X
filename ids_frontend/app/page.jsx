"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth/auth';
import {
  ArrowRight, Shield, Zap, Brain, BarChart3, Target,
  Activity, Database, Network, Cpu, Layers, Sparkles,
  ChevronRight, Play, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const features = [
    {
      icon: Brain,
      title: "Hybrid AI Architecture",
      description: "Combines CNN for spatial patterns and ConvNeXt-Tiny for hierarchical feature extraction",
      color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
      bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: Target,
      title: "97.97% Accuracy",
      description: "State-of-the-art performance with 12.23% improvement over CNN-GRU baseline",
      color: "from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400",
      bgColor: "bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20",
      gradient: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
    },
    {
      icon: Zap,
      title: "45ms Real-time Detection",
      description: "Ultra-fast inference enables immediate threat response and network monitoring",
      color: "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
      bgColor: "bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
      gradient: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
    },
    {
      icon: Cpu,
      title: "0.0373M Parameters",
      description: "Lightweight design with 3.7× fewer parameters than BiLSTM for edge deployment",
      color: "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400",
      bgColor: "bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
      gradient: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"
    },
  ];

  const stats = [
    { value: "97.97%", label: "Detection Accuracy", icon: ShieldCheck, color: "text-emerald-600 dark:text-emerald-400", bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20" },
    { value: "14+", label: "Attack Types", icon: Network, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-500/10 dark:bg-blue-500/20" },
    { value: "45ms", label: "Response Time", icon: Activity, color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-500/10 dark:bg-amber-500/20" },
    { value: "0.0373M", label: "Parameters", icon: Database, color: "text-violet-600 dark:text-violet-400", bgColor: "bg-violet-500/10 dark:bg-violet-500/20" },
  ];

  const quickLinks = [
    { title: "Single Prediction", description: "Analyze individual network traffic", path: "/predict", icon: Target, color: "from-blue-500 to-cyan-500" },
    { title: "Batch Analysis", description: "Process multiple samples at once", path: "/batch", icon: Database, color: "from-emerald-500 to-green-500" },
    { title: "Performance Analytics", description: "View detailed metrics", path: "/analytics", icon: BarChart3, color: "from-amber-500 to-orange-500" },
    { title: "Model Architecture", description: "Explore our hybrid design", path: "/model-info", icon: Layers, color: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="space-y-6 md:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-4 sm:p-8 md:p-16 text-white">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full translate-y-32 md:translate-y-48 -translate-x-32 md:-translate-x-48" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-3 sm:mb-6"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[10px] sm:text-xs md:text-sm font-medium">Research Project v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-3xl md:text-7xl font-bold mb-3 md:mb-6 leading-tight"
          >
            Hybrid
            <span className="block text-cyan-200 dark:text-cyan-300 text-lg sm:text-2xl md:text-7xl mt-0.5 md:mt-2">
              CNN & ConvNeXt-Tiny IDS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-base md:text-xl text-blue-100 dark:text-blue-200 max-w-3xl mb-4 sm:mb-8 md:mb-10 leading-relaxed"
          >
            Advanced intrusion detection system combining spatial CNN patterns with hierarchical ConvNeXt features
            for state-of-the-art accuracy and real-time performance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-4"
          >
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="px-4 py-2 sm:px-6 sm:py-3.5 bg-white dark:bg-gray-100 text-blue-700 dark:text-blue-800 font-bold rounded-lg sm:rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 group text-xs sm:text-sm md:text-base"
            >
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              <span>Launch Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={isAuthenticated ? "/predict" : "/login"}
              className="px-4 py-2 sm:px-6 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-600 dark:to-blue-600 text-white font-bold rounded-lg sm:rounded-2xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 group text-xs sm:text-sm md:text-base"
            >
              <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              <span>Try Single Prediction</span>
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-800 p-3 sm:p-6 md:p-8">
        <div className="text-center mb-4 sm:mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-3 md:mb-4 px-4"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Our Hybrid Approach?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
          >
            Combining the best of both worlds for unparalleled intrusion detection performance
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${feature.gradient} dark:bg-gray-900/80 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-2 sm:p-5 md:p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300`}
              >
                <div className="flex flex-col sm:flex-row items-start gap-1.5 sm:gap-4">
                  <div className={`flex-shrink-0 p-1 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} shadow-md sm:shadow-lg dark:shadow-gray-900/30`}>
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-[11px] sm:text-base md:text-lg mb-0.5 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-[9px] sm:text-xs md:text-sm leading-normal">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-800 p-3 sm:p-6 md:p-8">
        <div className="text-center mb-4 sm:mb-8 md:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-3 md:mb-4 px-4"
          >
            Get Started <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">Instantly</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
          >
            Explore our comprehensive suite of tools for network security analysis
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Link
                  href={isAuthenticated ? link.path : "/login"}
                  className="group block bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-2 sm:p-5 md:p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="relative h-full flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl md:rounded-2xl"
                      style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }} />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mb-1.5 sm:mb-4">
                      <div className={`p-1 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${link.color} opacity-80 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                        <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-[11px] sm:text-base md:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 dark:group-hover:from-blue-400 dark:group-hover:to-violet-400 transition-all duration-300">
                        {link.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-[9px] sm:text-xs md:text-sm mb-2 sm:mb-6 leading-normal flex-grow">
                      {link.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
                      <span className="text-[9px] sm:text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        Get Started
                      </span>
                      <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
