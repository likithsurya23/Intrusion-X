"use client";

import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Shield,
  Cpu,
  Server,
  Database,
  Network,
  BarChart as BarChart3,
  Target,
  Users,
  Code,
  Award,
  ChevronRight,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Eye,
  GitBranch,
  Layers,
  Cpu as CpuIcon,
  ShieldCheck,
  Activity,
  Target as TargetIcon,
  FileCode,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const [animatedMetrics, setAnimatedMetrics] = useState(Array(4).fill(false));
  const [expandedSections, setExpandedSections] = useState({
    pillars: true,
    tech: true,
    impact: true,
    future: true
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMetrics([true, true, true, true]);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const researchMetrics = [
    { icon: Target, value: "97.97%", label: "Accuracy", color: "from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/20" },
    { icon: Zap, value: "45ms", label: "Inference Time", color: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500", bg: "bg-blue-500/10 dark:bg-blue-500/20" },
    { icon: Database, value: "0.0373M", label: "Parameters", color: "from-violet-400 to-violet-600 dark:from-violet-300 dark:to-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/20" },
    { icon: Network, value: "14", label: "Attack Types", color: "from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/20" },
  ];

  const architecturalPillars = [
    {
      title: "Spatial Intelligence",
      description: "CNN layers capture local network traffic patterns and spatial correlations",
      icon: Layers,
      color: "from-blue-500 to-cyan-400 dark:from-blue-400 dark:to-cyan-300",
      iconColor: "text-blue-600 dark:text-blue-400",
      bg: "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-500/20 dark:to-cyan-500/20"
    },
    {
      title: "Hierarchical Learning",
      description: "ConvNeXt-Tiny extracts multi-scale features for complex attack signatures",
      icon: Brain,
      color: "from-violet-500 to-purple-400 dark:from-violet-400 dark:to-purple-300",
      iconColor: "text-violet-600 dark:text-violet-400",
      bg: "bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-500/20 dark:to-purple-500/20"
    },
    {
      title: "Real-time Analysis",
      description: "Optimized architecture enables 45ms per sample detection",
      icon: Activity,
      color: "from-emerald-500 to-green-400 dark:from-emerald-400 dark:to-green-300",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-500/20 dark:to-green-500/20"
    },
    {
      title: "Lightweight Design",
      description: "Minimal parameters (0.0373M) for edge and IoT deployment",
      icon: CpuIcon,
      color: "from-amber-500 to-orange-400 dark:from-amber-400 dark:to-orange-300",
      iconColor: "text-amber-600 dark:text-amber-400",
      bg: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/20 dark:to-orange-500/20"
    },
  ];

  const techStack = [
    {
      name: "PyTorch 2.0",
      role: "Deep Learning",
      icon: Brain,
      color: "bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/20 dark:border-orange-500/30",
      gradient: "from-orange-400 to-orange-600 dark:from-orange-300 dark:to-orange-500"
    },
    {
      name: "Django REST",
      role: "Backend API",
      icon: Server,
      color: "bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20 dark:border-green-500/30",
      gradient: "from-emerald-400 to-emerald-600 dark:from-emerald-300 dark:to-emerald-500"
    },
    {
      name: "React.js 18",
      role: "Frontend",
      icon: Code,
      color: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/30",
      gradient: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500"
    },
    {
      name: "Tailwind CSS",
      role: "UI Styling",
      icon: FileCode,
      color: "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 dark:border-cyan-500/30",
      gradient: "from-cyan-400 to-cyan-600 dark:from-cyan-300 dark:to-cyan-500"
    },
    {
      name: "Recharts",
      role: "Visualization",
      icon: BarChart3,
      color: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/30",
      gradient: "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500"
    },
    {
      name: "CICIoT2023",
      role: "Dataset",
      icon: Database,
      color: "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/30",
      gradient: "from-rose-400 to-rose-600 dark:from-rose-300 dark:to-rose-500"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-white dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-900" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-transparent z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 md:px-4 py-1 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs md:text-sm font-medium mb-3 sm:mb-6 md:mb-8"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
              Cutting-edge Research
            </motion.div>

            <h1 className="text-xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-2 sm:mb-4 md:mb-8 px-2">
              Hybrid
              <span className="block font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent text-lg sm:text-3xl md:text-6xl lg:text-7xl mt-1.5 sm:mt-2">
                CNN & ConvNeXt-Tiny IDS
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-8 md:mb-12 px-4"
            >
              Advanced network security architecture combining spatial CNN patterns with hierarchical ConvNeXt features for unparalleled intrusion detection accuracy.
            </motion.p>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="flex flex-wrap justify-center gap-2 md:gap-6 px-4"
            >
              {[
                { icon: ShieldCheck, text: "Enterprise Security" },
                { icon: TrendingUp, text: "97.97% Accuracy" },
                { icon: Activity, text: "Real-time" },
                { icon: GitBranch, text: "Open Source" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 sm:gap-2 md:gap-3 px-2.5 py-1 sm:px-4 sm:py-1.5 md:py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm"
                >
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Metrics Grid - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 md:-mt-8 mb-6 md:mb-24"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {researchMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-800/90 rounded-lg md:rounded-2xl border border-gray-200 dark:border-gray-700 p-2.5 sm:p-4 md:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-1.5 sm:p-2 md:p-3 rounded-md md:rounded-xl ${metric.bg} mb-1.5 md:mb-4`}>
                      <Icon className={`h-4 w-4 md:h-6 md:w-6 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className={`text-sm sm:text-xl md:text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-0.5 md:mb-2`}>
                      {animatedMetrics[index] ? metric.value : "0"}
                    </div>
                    <div className="text-[9px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Architectural Pillars - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-16"
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-6 px-4">
            Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">Pillars</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Four core principles driving our hybrid approach to next-generation intrusion detection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-8">
          {architecturalPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg md:rounded-2xl border border-gray-200 dark:border-gray-700 p-3 sm:p-5 md:p-8 shadow-sm hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300" />

                  <div className="flex items-start gap-2.5 sm:gap-4 md:gap-6">
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-gradient-to-r ${pillar.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 md:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 dark:group-hover:from-blue-400 dark:group-hover:to-violet-400 transition-all duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-[10px] sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 md:mt-6 pt-2.5 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center text-[9px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-500">
                      <ChevronRight className="h-2.5 w-2.5 sm:h-4 sm:w-4 mr-1 md:mr-2" />
                      <span>Learn more</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Technical Stack - Mobile Optimized */}
      <div className="bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 py-8 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-4 md:mb-16"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-6 px-4">
              Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">Stack</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Modern tools and frameworks engineered for scalability and peak performance
            </p>
          </motion.div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-6">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative h-full bg-white dark:bg-gray-800/90 rounded-lg md:rounded-2xl border border-gray-200 dark:border-gray-700 p-2 sm:p-4 md:p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-5 dark:opacity-0 dark:group-hover:opacity-10 transition-opacity duration-300`} />

                    <div className="relative flex flex-col items-center text-center">
                      <div className={`p-1.5 sm:p-2 md:p-4 rounded-md md:rounded-xl ${tech.color} border mb-1.5 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7" />
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white text-[10px] sm:text-xs md:text-lg mb-0.5 md:mb-2">
                        {tech.name}
                      </h3>

                      <p className={`text-[8px] sm:text-[10px] md:text-sm font-medium ${tech.color.split(' ')[2]} ${tech.color.split(' ')[3]} mb-1.5 md:mb-4`}>
                        {tech.role}
                      </p>
                      <div className="mt-auto pt-1 sm:pt-2 md:pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                        <div className="flex items-center justify-center text-[8px] sm:text-[10px] md:text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                          <span className="hidden md:inline">Learn more</span>
                          <span className="md:hidden">More</span>
                          <ChevronRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 ml-0.5 md:ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Research Impact - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-8 px-4 lg:px-0">
              Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400">Impact</span>
            </h2>
            <div className="space-y-3.5 md:space-y-8 px-4 lg:px-0">
              {[
                {
                  icon: BarChart3,
                  title: "State-of-the-art Performance",
                  description: "12.23% accuracy improvement over CNN-GRU with 3.7× fewer parameters than BiLSTM",
                  color: "bg-blue-500/10 dark:bg-blue-500/20",
                  iconColor: "text-blue-600 dark:text-blue-400"
                },
                {
                  icon: Shield,
                  title: "Comprehensive Security",
                  description: "Detection coverage for 14 attack types including DDoS, DoS, SQL Injection",
                  color: "bg-emerald-500/10 dark:bg-emerald-500/20",
                  iconColor: "text-emerald-600 dark:text-emerald-400"
                },
                {
                  icon: Users,
                  title: "Open Innovation",
                  description: "Full open-source implementation for research collaboration",
                  color: "bg-violet-500/10 dark:bg-violet-500/20",
                  iconColor: "text-violet-600 dark:text-violet-400"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-2.5 md:gap-6 group"
                >
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-0.5 md:mb-2 text-xs sm:text-base md:text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 dark:group-hover:from-blue-400 dark:group-hover:to-violet-400 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative px-4 lg:px-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 rounded-2xl md:rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 text-white shadow-2xl">
              <Award className="h-6 w-6 sm:h-10 sm:w-10 md:h-14 md:w-14 text-yellow-400 mb-2 md:mb-8 animate-pulse" />
              <h3 className="text-sm sm:text-xl md:text-3xl font-bold mb-2 md:mb-6 dark:text-white">
                Key Achievement
              </h3>
              <p className="text-xs sm:text-sm md:text-lg text-gray-300 dark:text-gray-400 leading-relaxed mb-4 md:mb-10">
                Our hybrid architecture achieves the optimal balance between
                detection accuracy and computational efficiency, making it
                suitable for both cloud and edge deployment scenarios.
              </p>

              <div className="border-t border-gray-700 dark:border-gray-800 pt-4 md:pt-10">
                <div className="grid grid-cols-2 gap-2 md:gap-8">
                  {[
                    { value: "97.97%", label: "Accuracy", color: "from-emerald-400 to-emerald-300 dark:from-emerald-300 dark:to-emerald-200" },
                    { value: "3.7×", label: "Fewer Params", color: "from-blue-400 to-cyan-300 dark:from-blue-300 dark:to-cyan-200" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-0.5 md:mb-3`}>
                        {stat.value}
                      </div>
                      <div className="text-[9px] sm:text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Future Vision - Mobile Optimized */}
      <div className="bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-8 px-4">
              Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">Vision</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-6 md:mb-16 leading-relaxed px-4">
              Pioneering the future of network security through continuous innovation
              and advanced hybrid deep learning architectures
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10 px-4">
              {[
                {
                  icon: Network,
                  title: "Federated Learning",
                  description: "Privacy-preserving collaborative training across distributed networks",
                  color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
                },
                {
                  icon: Zap,
                  title: "Edge Optimization",
                  description: "Ultra-lightweight models for resource-constrained IoT devices",
                  color: "from-emerald-500 to-green-500 dark:from-emerald-400 dark:to-green-400"
                },
                {
                  icon: Brain,
                  title: "Adaptive Defense",
                  description: "Self-evolving models that adapt to emerging attack patterns",
                  color: "from-violet-500 to-purple-500 dark:from-violet-400 dark:to-purple-400"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative bg-white dark:bg-gray-800/90 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 p-3.5 sm:p-6 md:p-10 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-xl md:rounded-2xl transition-opacity duration-300`} />

                    <div className="relative">
                      <div className={`w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg md:rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-2.5 md:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                      </div>

                      <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-violet-600 dark:group-hover:from-blue-400 dark:group-hover:to-violet-400 transition-all duration-300">
                        {item.title}
                      </h3>

                      <p className="text-[10px] sm:text-xs md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="mt-3 md:mt-8 pt-2.5 md:pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="inline-flex items-center text-[9px] sm:text-xs md:text-sm font-medium text-gray-500 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          <span>Explore</span>
                          <ChevronRight className="h-2.5 w-2.5 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}