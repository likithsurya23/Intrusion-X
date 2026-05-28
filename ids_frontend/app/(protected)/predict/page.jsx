"use client";

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { predictionService } from "@/lib/api/api";
import Alert from "@/components/Alert/Alert";
import {
  Send,
  RefreshCw,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Cpu,
  Zap,
  Download,
  Info,
  FileText,
  Copy,
  Check,
  Hash,
  Sparkles,
  Brain,
  TrendingUp,
  Clock,
  Database,
  Network,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SinglePrediction = () => {
  const [features, setFeatures] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedResults, setExpandedResults] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const exampleFeatures = "0,0,47,64,45.13537479,45.13537479,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,6216,592,592,592,0,592,83698590.52,9.5,34.40930107,0,0,0,141.55";

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handlePredict = async () => {
    if (!features.trim()) {
      setError('Please enter feature values');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const featureArray = features.split(',').map(Number);

      if (featureArray.some(isNaN)) {
        throw new Error('Please enter valid numbers separated by commas');
      }

      if (featureArray.length !== 46) {
        throw new Error(`Expected exactly 46 features, got ${featureArray.length}`);
      }

      const result = await predictionService.predictSingle(featureArray);
      setPrediction(result);
      setExpandedResults(true);
    } catch (err) {
      setError(err.message || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures('');
    setPrediction(null);
    setError(null);
  };

  const handleExample = () => {
    setFeatures(exampleFeatures);
    setPrediction(null);
    setError(null);
  };

  const handleCopyExample = () => {
    navigator.clipboard.writeText(exampleFeatures);
    setCopied(true);
  };

  const getAttackSeverity = (attackType) => {
    const severityLevels = {
      'DDoS': {
        level: 'Critical',
        color: 'bg-red-500 dark:bg-red-600',
        bg: 'bg-red-50 dark:bg-red-500/20',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800',
        icon: AlertTriangle,
        gradient: 'from-red-500 to-red-600 dark:from-red-600 dark:to-red-700'
      },
      'DoS': {
        level: 'High',
        color: 'bg-orange-500 dark:bg-orange-600',
        bg: 'bg-orange-50 dark:bg-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        icon: AlertTriangle,
        gradient: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'
      },
      'BruteForce': {
        level: 'High',
        color: 'bg-orange-500 dark:bg-orange-600',
        bg: 'bg-orange-50 dark:bg-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        icon: Shield,
        gradient: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'
      },
      'PortScan': {
        level: 'Medium',
        color: 'bg-yellow-500 dark:bg-yellow-600',
        bg: 'bg-yellow-50 dark:bg-yellow-500/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: Activity,
        gradient: 'from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700'
      },
      'WebAttack': {
        level: 'Medium',
        color: 'bg-yellow-500 dark:bg-yellow-600',
        bg: 'bg-yellow-50 dark:bg-yellow-500/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: Shield,
        gradient: 'from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700'
      },
      'Botnet': {
        level: 'Medium',
        color: 'bg-yellow-500 dark:bg-yellow-600',
        bg: 'bg-yellow-50 dark:bg-yellow-500/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: Cpu,
        gradient: 'from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700'
      },
      'SQL Injection': {
        level: 'High',
        color: 'bg-orange-500 dark:bg-orange-600',
        bg: 'bg-orange-50 dark:bg-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800',
        icon: Database,
        gradient: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700'
      },
      'Normal': {
        level: 'Safe',
        color: 'bg-emerald-500 dark:bg-emerald-600',
        bg: 'bg-emerald-50 dark:bg-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800',
        icon: CheckCircle,
        gradient: 'from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600'
      }
    };

    for (const [key, value] of Object.entries(severityLevels)) {
      if (attackType.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return {
      level: 'Unknown',
      color: 'bg-gray-500 dark:bg-gray-600',
      bg: 'bg-gray-50 dark:bg-gray-500/20',
      text: 'text-gray-700 dark:text-gray-400',
      border: 'border-gray-200 dark:border-gray-700',
      icon: Info,
      gradient: 'from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700'
    };
  };

  const formatConfidence = (confidence) => {
    if (confidence >= 0.95) return { label: 'Very High', color: 'from-emerald-500 to-green-500', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' };
    if (confidence >= 0.85) return { label: 'High', color: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' };
    if (confidence >= 0.70) return { label: 'Medium', color: 'from-yellow-500 to-amber-500', badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' };
    if (confidence >= 0.50) return { label: 'Low', color: 'from-orange-500 to-orange-600', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' };
    return { label: 'Very Low', color: 'from-red-500 to-red-600', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' };
  };

  const featureCount = features ? features.split(',').filter(f => f.trim() !== '').length : 0;
  const isFeatureCountValid = featureCount === 46;

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-5 md:p-8 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full translate-y-32 md:translate-y-48 -translate-x-32 md:-translate-x-48" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Brain className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">Single Prediction</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">46-Feature Analysis</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 md:px-0"
          >
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Input Section - Mobile Optimized */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            <div className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                    <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                    Input Features
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-2">
                    Enter 46 normalized values, comma-separated
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm ${isFeatureCountValid
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : featureCount > 46
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}
                >
                  {featureCount}/46
                </motion.div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Feature Values
                  </label>
                  {featureCount > 0 && (
                    <span className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full ${isFeatureCountValid
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      }`}>
                      {isFeatureCountValid ? '✓ Valid' : `✗ ${46 - featureCount} more`}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="e.g., 0.5,1.2,-0.3,1.8,0.7,... (46 values)"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] md:min-h-[140px] font-mono text-xs md:text-sm transition-all duration-200 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${!isFeatureCountValid && featureCount > 0
                      ? 'border-red-300 bg-red-50/50 dark:border-red-700 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    rows={4}
                  />

                  <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 flex items-center gap-1 md:gap-2">
                    <div className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-lg ${isFeatureCountValid
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                      {featureCount}/46
                    </div>
                    {features && (
                      <button
                        onClick={() => setFeatures('')}
                        className="p-1 md:p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Clear all"
                      >
                        <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg md:rounded-xl border border-blue-100 dark:border-blue-800/50"
                >
                  <Info className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-medium mb-1 md:mb-2 text-blue-800 dark:text-blue-300">Requirements:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Exactly 46 comma-separated values
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Normalized between -1 and 1
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        No trailing commas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                        Use dot (.) as decimal separator
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons - Mobile Optimized */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePredict}
                  disabled={loading || !features.trim() || !isFeatureCountValid}
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 md:gap-3 text-xs md:text-sm group"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                      <span className="hidden xs:inline">Processing...</span>
                      <span className="xs:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                      <span className="hidden xs:inline">Run Prediction</span>
                      <span className="xs:hidden">Predict</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExample}
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-3 text-xs md:text-sm"
                >
                  <Download className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden xs:inline">Load Example</span>
                  <span className="xs:hidden">Example</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyExample}
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-3 text-xs md:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="hidden xs:inline">Copied!</span>
                      <span className="xs:hidden">✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="hidden xs:inline">Copy</span>
                      <span className="xs:hidden">Copy</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 sm:flex-none px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-1.5 md:gap-3 text-xs md:text-sm"
                >
                  <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden xs:inline">Reset</span>
                  <span className="xs:hidden">Reset</span>
                </motion.button>
              </div>

              {/* Quick Stats - Mobile Optimized */}
              <div className="pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                  {[
                    { value: "46", label: "Features", color: "from-blue-500 to-cyan-500", icon: Hash },
                    { value: "97.97%", label: "Accuracy", color: "from-emerald-500 to-green-500", icon: TrendingUp },
                    { value: "14", label: "Attacks", color: "from-purple-500 to-violet-500", icon: Shield },
                    { value: "45ms", label: "Response", color: "from-amber-500 to-orange-500", icon: Clock }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="relative group"
                    >
                      <div className="text-center p-2 md:p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                        <div className={`inline-flex p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-1 md:mb-2`}>
                          <stat.icon className="h-3 w-3 md:h-5 md:w-5 text-white" />
                        </div>
                        <div className="text-sm md:text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instructions & Info - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800/50 dark:to-gray-900 rounded-xl md:rounded-2xl border border-blue-100 dark:border-gray-700 p-4 md:p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3 text-base md:text-lg">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30">
                  <Info className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                How to Use
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    1
                  </div>
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Enter exactly 46 normalized feature values</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    2
                  </div>
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Ensure count shows "46/46 features" in green</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs md:text-sm font-bold">
                    3
                  </div>
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Click "Predict" to analyze the sample</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800/50 dark:to-gray-900 rounded-xl md:rounded-2xl border border-violet-100 dark:border-gray-700 p-4 md:p-6"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3 text-base md:text-lg">
                <div className="p-1.5 md:p-2 rounded-lg bg-violet-500/20 dark:bg-violet-500/30">
                  <Brain className="h-4 w-4 md:h-5 md:w-5 text-violet-600 dark:text-violet-400" />
                </div>
                Model
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between p-2 md:p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Features</span>
                  <span className="font-bold text-xs md:text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full">46</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Range</span>
                  <span className="font-bold text-xs md:text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full">-1 to 1</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Format</span>
                  <span className="font-bold text-xs md:text-sm text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 md:px-3 py-0.5 md:py-1 rounded-full">1D→2D</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Results Section - Mobile Optimized */}
        <div className="space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden sticky top-6"
          >
            <div className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 p-4 md:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-violet-500/20">
                    <Target className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Results
                </h2>
                {prediction && (
                  <button
                    onClick={() => setExpandedResults(!expandedResults)}
                    className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {expandedResults ? (
                      <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6">
              {prediction ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 md:space-y-6 lg:space-y-8"
                >
                  {/* Attack Type - Mobile Optimized */}
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex flex-col items-center">
                      <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${getAttackSeverity(prediction.prediction).bg} border ${getAttackSeverity(prediction.prediction).border} mb-3 md:mb-4`}>
                        {React.createElement(getAttackSeverity(prediction.prediction).icon, {
                          className: `h-8 w-8 md:h-12 md:w-12 ${getAttackSeverity(prediction.prediction).color.replace('bg-', 'text-')}`
                        })}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Classification</p>
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 px-2">
                          {prediction.prediction.length > 20 ? `${prediction.prediction.substring(0, 20)}...` : prediction.prediction}
                        </p>
                      </div>
                      <div className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full ${getAttackSeverity(prediction.prediction).bg} border ${getAttackSeverity(prediction.prediction).border}`}>
                        <span className={`text-xs md:text-sm font-medium ${getAttackSeverity(prediction.prediction).text}`}>
                          Severity: <span className="font-bold">{getAttackSeverity(prediction.prediction).level}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expandable Content on Mobile */}
                  {(expandedResults || isDesktop) && (
                    <>
                      {/* Confidence Score */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3 md:space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                            Confidence
                          </span>
                          <span className={`text-[10px] md:text-sm font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full ${formatConfidence(prediction.confidence).badge}`}>
                            {formatConfidence(prediction.confidence).label}
                          </span>
                        </div>

                        <div className="space-y-2 md:space-y-3">
                          <div className="flex items-end justify-between">
                            <span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                              {(prediction.confidence * 100).toFixed(1)}%
                            </span>
                            <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">
                              {prediction.confidence > 0.9 ? '🎯' :
                                prediction.confidence > 0.7 ? '⚡' : '⚠️'}
                            </span>
                          </div>

                          <div className="relative pt-1">
                            <div className="overflow-hidden h-2 md:h-3 text-xs flex rounded-full bg-gray-200 dark:bg-gray-800">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${prediction.confidence * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${formatConfidence(prediction.confidence).color}`}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Security Assessment */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3 md:space-y-4"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-1 md:gap-2 text-sm md:text-lg">
                          <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                          Assessment
                        </h4>
                        <div className={`p-3 md:p-4 rounded-lg md:rounded-xl ${prediction.prediction === 'Normal'
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}
                        >
                          <p className={`text-xs md:text-sm leading-relaxed ${prediction.prediction === 'Normal'
                            ? 'text-emerald-800 dark:text-emerald-300'
                            : 'text-red-800 dark:text-red-300'}`}
                          >
                            {prediction.prediction === 'Normal'
                              ? '✅ No threat detected'
                              : '⚠️ Threat detected - Action required'}
                          </p>
                        </div>

                        {/* Recommendations */}
                        {prediction.prediction !== 'Normal' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ delay: 0.4 }}
                            className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg md:rounded-xl p-3 md:p-5 border border-orange-200 dark:border-orange-800/50"
                          >
                            <h5 className="font-semibold text-orange-800 dark:text-orange-400 mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
                              Actions
                            </h5>
                            <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm text-orange-700 dark:text-orange-300">
                              <li className="flex items-start gap-1 md:gap-2">
                                <span className="mt-1 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                <span>Isolate affected segment</span>
                              </li>
                              <li className="flex items-start gap-1 md:gap-2">
                                <span className="mt-1 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                <span>Review security logs</span>
                              </li>
                              <li className="flex items-start gap-1 md:gap-2">
                                <span className="mt-1 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                                <span>Escalate to SOC team</span>
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Feature Summary */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 md:mb-3 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                          <Network className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                          Summary
                        </h4>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          <div className="bg-gray-50 dark:bg-gray-800 p-2 md:p-3 rounded-lg">
                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Features</div>
                            <div className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">46 values</div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-2 md:p-3 rounded-lg">
                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Confidence</div>
                            <div className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">
                              {(prediction.confidence * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-2 md:p-3 rounded-lg col-span-2">
                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Time</div>
                            <div className="font-mono text-[10px] md:text-xs text-gray-900 dark:text-white">
                              {new Date().toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 md:py-12"
                >
                  <div className="mx-auto w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/50 dark:to-violet-900/50 flex items-center justify-center mb-4 md:mb-6">
                    <Brain className="h-8 w-8 md:h-12 md:w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    Ready for Analysis
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-4 md:mb-6 px-4">
                    Enter 46 feature values to see security analysis
                  </p>
                  <button
                    onClick={handleExample}
                    className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center justify-center gap-1 md:gap-2 mx-auto group"
                  >
                    <Download className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-y-0.5 transition-transform" />
                    Try example
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;