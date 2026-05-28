"use client";

import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  Network,
  Users,
  Clock,
  BarChart3,
  Target,
  Server,
  Layers,
  ShieldCheck,
  Eye,
  AlertCircle,
  GitBranch,
  Sparkles,
  Brain,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [detectionCount, setDetectionCount] = useState(1247);
  const [falsePositives, setFalsePositives] = useState(26);
  const [modelVersion, setModelVersion] = useState('v2.1.0');
  const [expandedSections, setExpandedSections] = useState({
    performance: true,
    distribution: true,
    detections: true
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic data based on time range
  const getTimeRangeData = (range) => {
    switch (range) {
      case '24h':
        return {
          detectionCount: 347,
          falsePositives: 8,
          attackDistribution: [
            { type: 'DDoS', count: 142, percentage: 40.9, color: 'bg-red-500', severity: 'Critical' },
            { type: 'PortScan', count: 68, percentage: 19.6, color: 'bg-amber-500', severity: 'Medium' },
            { type: 'BruteForce', count: 52, percentage: 15.0, color: 'bg-pink-500', severity: 'High' },
            { type: 'WebAttack', count: 48, percentage: 13.8, color: 'bg-orange-500', severity: 'High' },
            { type: 'Botnet', count: 37, percentage: 10.7, color: 'bg-purple-500', severity: 'Critical' },
          ],
          recentDetections: [
            { time: '2 min ago', type: 'DDoS-RSTFINFlood', severity: 'Critical', confidence: 98.2, source: '203.0.113.45', action: 'Blocked', mitigated: true },
            { time: '15 min ago', type: 'PortScan', severity: 'Medium', confidence: 87.3, source: '198.51.100.22', action: 'Monitored', mitigated: false },
            { time: '1 hour ago', type: 'SQL Injection', severity: 'High', confidence: 96.5, source: '203.0.113.78', action: 'Blocked', mitigated: true },
            { time: '3 hours ago', type: 'BruteForce', severity: 'High', confidence: 95.8, source: '198.51.100.33', action: 'Blocked', mitigated: true },
            { time: '5 hours ago', type: 'Botnet C2', severity: 'Critical', confidence: 94.2, source: '45.227.253.12', action: 'Blocked', mitigated: true },
          ]
        };
      case '7d':
        return {
          detectionCount: 2156,
          falsePositives: 42,
          attackDistribution: [
            { type: 'DDoS', count: 924, percentage: 42.9, color: 'bg-red-500', severity: 'Critical' },
            { type: 'PortScan', count: 412, percentage: 19.1, color: 'bg-amber-500', severity: 'Medium' },
            { type: 'BruteForce', count: 328, percentage: 15.2, color: 'bg-pink-500', severity: 'High' },
            { type: 'WebAttack', count: 298, percentage: 13.8, color: 'bg-orange-500', severity: 'High' },
            { type: 'Botnet', count: 194, percentage: 9.0, color: 'bg-purple-500', severity: 'Critical' },
          ],
          recentDetections: [
            { time: '1 hour ago', type: 'DDoS-UDPFlood', severity: 'Critical', confidence: 97.8, source: '192.168.1.45', action: 'Blocked', mitigated: true },
            { time: '3 hours ago', type: 'PortScan', severity: 'Medium', confidence: 86.5, source: '10.0.0.22', action: 'Monitored', mitigated: false },
            { time: '5 hours ago', type: 'SQL Injection', severity: 'High', confidence: 95.2, source: '172.16.1.78', action: 'Blocked', mitigated: true },
            { time: '12 hours ago', type: 'BruteForce', severity: 'High', confidence: 94.8, source: '192.168.1.33', action: 'Blocked', mitigated: true },
            { time: '1 day ago', type: 'Botnet C2', severity: 'Critical', confidence: 93.7, source: '45.227.253.12', action: 'Blocked', mitigated: true },
          ]
        };
      case '30d':
        return {
          detectionCount: 8943,
          falsePositives: 187,
          attackDistribution: [
            { type: 'DDoS', count: 3850, percentage: 43.0, color: 'bg-red-500', severity: 'Critical' },
            { type: 'PortScan', count: 1720, percentage: 19.2, color: 'bg-amber-500', severity: 'Medium' },
            { type: 'BruteForce', count: 1350, percentage: 15.1, color: 'bg-pink-500', severity: 'High' },
            { type: 'WebAttack', count: 1220, percentage: 13.6, color: 'bg-orange-500', severity: 'High' },
            { type: 'Botnet', count: 803, percentage: 9.0, color: 'bg-purple-500', severity: 'Critical' },
          ],
          recentDetections: [
            { time: '2 hours ago', type: 'DDoS-RSTFINFlood', severity: 'Critical', confidence: 98.1, source: '203.0.113.89', action: 'Blocked', mitigated: true },
            { time: '6 hours ago', type: 'PortScan', severity: 'Medium', confidence: 88.2, source: '198.51.100.67', action: 'Monitored', mitigated: false },
            { time: '1 day ago', type: 'SQL Injection', severity: 'High', confidence: 96.9, source: '203.0.113.156', action: 'Blocked', mitigated: true },
            { time: '2 days ago', type: 'BruteForce', severity: 'High', confidence: 95.4, source: '198.51.100.89', action: 'Blocked', mitigated: true },
            { time: '3 days ago', type: 'Botnet C2', severity: 'Critical', confidence: 94.8, source: '45.227.253.45', action: 'Blocked', mitigated: true },
          ]
        };
      default:
        return {
          detectionCount: 347,
          falsePositives: 8,
          attackDistribution: [],
          recentDetections: []
        };
    }
  };

  // State for dynamic data
  const [attackDistribution, setAttackDistribution] = useState(getTimeRangeData('24h').attackDistribution);
  const [recentDetections, setRecentDetections] = useState(getTimeRangeData('24h').recentDetections);

  // Update data when time range changes
  useEffect(() => {
    const data = getTimeRangeData(timeRange);
    setDetectionCount(data.detectionCount);
    setFalsePositives(data.falsePositives);
    setAttackDistribution(data.attackDistribution);
    setRecentDetections(data.recentDetections);
  }, [timeRange]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const metrics = [
    {
      title: 'Detection Accuracy',
      value: '97.97%',
      icon: Target,
      description: 'CICIoT2023 test set',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500 to-cyan-500',
      trend: '+12.23%',
      trendLabel: 'vs CNN-GRU',
      details: '14 attack types covered',
      badge: 'State-of-the-art'
    },
    {
      title: 'Active Threats',
      value: detectionCount.toLocaleString(),
      icon: AlertTriangle,
      description: `Last ${timeRange}`,
      color: 'from-amber-500 to-orange-500',
      gradient: 'from-amber-500 to-orange-500',
      trend: timeRange === '24h' ? '+2.4%' : timeRange === '7d' ? '+8.3%' : '+15.7%',
      trendLabel: timeRange === '24h' ? 'vs yesterday' : timeRange === '7d' ? 'vs last week' : 'vs last month',
      details: 'Real-time monitoring',
      badge: 'Live'
    },
    {
      title: 'Inference Time',
      value: '45ms',
      icon: Zap,
      description: 'Per sample latency',
      color: 'from-violet-500 to-purple-500',
      gradient: 'from-violet-500 to-purple-500',
      trend: '-13.5%',
      trendLabel: 'optimized',
      details: 'Edge deployment ready',
      badge: 'Fast'
    },
    {
      title: 'False Positives',
      value: falsePositives.toLocaleString(),
      icon: AlertCircle,
      description: `Last ${timeRange}`,
      color: 'from-emerald-500 to-green-500',
      gradient: 'from-emerald-500 to-green-500',
      trend: timeRange === '24h' ? '-2.1%' : timeRange === '7d' ? '-5.3%' : '-8.7%',
      trendLabel: 'vs previous',
      details: `${detectionCount > 0 ? ((falsePositives / detectionCount) * 100).toFixed(1) : '0.0'}% FPR`, badge: 'Efficient'
    },
  ];

  const systemStats = [
    {
      label: 'Model Architecture',
      value: 'Hybrid CNN + ConvNeXt',
      description: 'Dual-path detection',
      icon: Brain,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Throughput',
      value: '~22k/sec',
      description: 'Samples per second',
      icon: Activity,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      label: 'Attack Coverage',
      value: '14 Types',
      description: 'DDoS, PortScan, Botnet +',
      icon: Shield,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      label: 'False Positive Rate',
      value: `${((falsePositives / detectionCount) * 100).toFixed(1)}%`,
      description: `${falsePositives} false alarms`,
      icon: AlertCircle,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    },
  ];

  const modelPerformance = [
    { metric: 'Precision', value: 97.85, target: 95, color: 'from-blue-500 to-cyan-500' },
    { metric: 'Recall', value: 97.97, target: 95, color: 'from-emerald-500 to-green-500' },
    { metric: 'F1 Score', value: 97.78, target: 95, color: 'from-violet-500 to-purple-500' },
  ];

  const quickActions = [
    { label: 'Single Prediction', icon: Zap, path: '/predict', color: 'from-blue-500 to-cyan-500' },
    { label: 'Batch Analysis', icon: Database, path: '/batch', color: 'from-emerald-500 to-green-500' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics', color: 'from-amber-500 to-orange-500' },
    { label: 'Feedback', icon: AlertCircle, path: '/feedback', color: 'from-violet-500 to-purple-500' },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/20';
      case 'High': return 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'Medium': return 'bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'Low': return 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      default: return 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-8">
      {/* Header - Mobile Optimized */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-3.5 sm:p-5 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-white/10 rounded-full -translate-y-12 sm:-translate-y-24 md:-translate-y-32 translate-x-12 sm:translate-x-24 md:translate-x-32" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-6">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-1.5 md:mb-4">
                <div className="p-1.5 sm:p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <ShieldCheck className="h-4.5 w-4.5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl md:text-4xl font-bold">Security Dashboard</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-[10px] sm:text-xs md:text-sm mt-0.5 sm:mt-1 flex items-center gap-1 md:gap-2">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span>Hybrid CNN & ConvNeXt-Tiny • {modelVersion}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex gap-1 md:gap-2">
                {['24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-1.5 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-[10px] sm:text-sm ${timeRange === range
                        ? 'bg-white text-blue-700 dark:bg-gray-100 dark:text-blue-800'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-2xl border border-gray-200 dark:border-gray-800 p-2.5 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 group h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-1.5 md:mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2 flex-wrap">
                      <p className="text-[9px] sm:text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        {metric.title}
                      </p>
                      <span className={`text-[7px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full font-medium truncate ${metric.badge === 'State-of-the-art' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                          metric.badge === 'Live' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 animate-pulse' :
                            metric.badge === 'Fast' ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' :
                              'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        }`}>
                        {metric.badge === 'State-of-the-art' ? 'SOTA' : metric.badge}
                      </span>
                    </div>
                    <div className="text-sm sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 truncate">
                      {metric.value}
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                      <span className="text-[7px] sm:text-xs font-medium px-1 sm:px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {metric.trend}
                      </span>
                      <span className="text-[7px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                        {metric.trendLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-1 sm:p-2 md:p-3 rounded-lg bg-gray-100 dark:bg-gray-800 flex-shrink-0 ml-1">
                    <metric.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-500" />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {metric.description}
                    </span>
                  </div>
                  <p className="text-[7px] sm:text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 truncate">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0"></span>
                    <span className="truncate">{metric.details}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
        {/* Main Content - Left & Center */}
        <div className="lg:col-span-2 space-y-3 md:space-y-6 lg:space-y-8">
          {/* System Performance Stats */}
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-2.5 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                <span className="hidden xs:inline">System Performance</span>
                <span className="xs:hidden">Performance</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 hidden xs:inline">
                  {timeRange}
                </span>
                <button
                  onClick={() => toggleSection('performance')}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {expandedSections.performance ? (
                    <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {(expandedSections.performance || window.innerWidth >= 1024) && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-4">
                  {systemStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-lg md:rounded-xl p-1.5 sm:p-3 md:p-4 text-center border border-gray-100 dark:border-gray-800"
                    >
                      <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-1 md:mb-3`}>
                        <stat.icon className={`h-3.5 w-3.5 sm:h-5 sm:w-5 md:h-6 md:w-6 ${stat.color}`} />
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 truncate">
                        {stat.value}
                      </div>
                      <div className="text-[8px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5 md:mb-1 truncate">
                        {stat.label}
                      </div>
                      <div className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 truncate hidden xs:block">
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Model Performance Metrics */}
                <div className="mt-3 md:mt-8 pt-3 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-4 flex items-center gap-1 md:gap-2">
                    <Target className="h-3 w-3 md:h-4 md:w-4 text-blue-600 dark:text-blue-400" />
                    Model Performance
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    {modelPerformance.map((metric, index) => (
                      <div key={index} className="space-y-1 md:space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">{metric.metric}</span>
                          <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 dark:text-white">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1 sm:h-1.5 md:h-2">
                          <div
                            className={`h-1 sm:h-1.5 md:h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] md:text-xs">
                          <span className="text-gray-500 dark:text-gray-500">Target: {metric.target}%</span>
                          <span className={`font-medium ${metric.value >= metric.target ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {metric.value >= metric.target ? '✓' : '!'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Attack Distribution */}
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-2.5 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                <span className="hidden xs:inline">Attack Distribution</span>
                <span className="xs:hidden">Attacks</span>
              </h2>
              <div className="flex items-center gap-1 md:gap-2">
                <Filter className="h-3 w-3 md:h-4 md:w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400">{timeRange}</span>
                <button
                  onClick={() => toggleSection('distribution')}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
                >
                  {expandedSections.distribution ? (
                    <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {(expandedSections.distribution || window.innerWidth >= 1024) && (
              <>
                <div className="space-y-2.5 md:space-y-5">
                  {attackDistribution.map((item, index) => (
                    <div key={index} className="space-y-1 md:space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 md:gap-3 min-w-0 flex-1">
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full ${item.color} flex-shrink-0`} />
                          <span className="font-medium text-[10px] sm:text-xs md:text-sm text-gray-900 dark:text-gray-100 truncate">
                            {item.type}
                          </span>
                          <span className={`text-[7px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full ${getSeverityColor(item.severity)} hidden xs:inline-flex`}>
                            {item.severity}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="font-bold text-[10px] sm:text-xs md:text-sm text-gray-900 dark:text-white">
                            {item.count.toLocaleString()}
                          </span>
                          <span className="text-[9px] sm:text-[10px] md:text-sm text-gray-500 dark:text-gray-400 ml-1">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1 sm:h-1.5 md:h-2.5">
                        <div
                          className={`h-1 sm:h-1.5 md:h-2.5 rounded-full transition-all duration-1000 ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 sm:gap-4">
                    <div className="text-center p-1.5 sm:p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="text-sm sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">14</div>
                      <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 truncate">Attack Types</div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                      <div className="text-sm sm:text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">97.97%</div>
                      <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 truncate">Accuracy</div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                      <div className="text-sm sm:text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {((falsePositives / detectionCount) * 100).toFixed(1)}%
                      </div>
                      <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 truncate">False Positive</div>
                    </div>
                    <div className="text-center p-1.5 sm:p-2.5 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <div className="text-sm sm:text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">45ms</div>
                      <div className="text-[8px] md:text-xs text-gray-600 dark:text-gray-400 truncate">Inference</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3 md:space-y-6 lg:space-y-8">
          {/* Recent Detections */}
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-2.5 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 md:gap-3">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                <span className="hidden xs:inline">Recent Detections</span>
                <span className="xs:hidden">Detections</span>
              </h2>
              <div className="flex items-center gap-1">
                <span className="text-[7px] sm:text-xs font-medium px-1 sm:px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="hidden xs:inline">Live</span>
                </span>
                <span className="text-[7px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1 hidden xs:inline">
                  {timeRange}
                </span>
                <button
                  onClick={() => toggleSection('detections')}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {expandedSections.detections ? (
                    <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {(expandedSections.detections || window.innerWidth >= 1024) && (
              <>
                <div className="space-y-2 sm:space-y-4 max-h-[350px] md:max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {recentDetections.map((detection, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-2 sm:p-3.5 md:p-4 rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 md:gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-[10px] sm:text-xs md:text-sm truncate max-w-[120px] md:max-w-none">
                              {detection.type}
                            </h3>
                            <span className={`text-[7px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full font-medium ${getSeverityColor(detection.severity)}`}>
                              {detection.severity === 'Critical' ? 'Crit' : detection.severity}
                            </span>
                          </div>
                          <p className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
                            {detection.source}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          {detection.mitigated ? (
                            <span className="text-[7px] sm:text-xs px-1 sm:px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md font-medium">
                              Blocked
                            </span>
                          ) : (
                            <span className="text-[7px] sm:text-xs px-1 sm:px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-md font-medium">
                              Monitor
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1.5 sm:mt-3">
                        <div className="flex items-center gap-1 md:gap-2 flex-1">
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                              style={{ width: `${detection.confidence}%` }}
                            />
                          </div>
                          <span className="text-[8px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 min-w-[28px] sm:min-w-[40px]">
                            {detection.confidence.toFixed(1)}%
                          </span>
                        </div>
                        <span className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 ml-1 sm:ml-2 flex-shrink-0">
                          {detection.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    href="/analytics"
                    className="w-full py-1 sm:py-2 text-[10px] sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center justify-center gap-1"
                  >
                    View Analytics
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Quick Actions - Mobile Optimized */}
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-2.5 sm:p-4 md:p-6">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-6 flex items-center gap-2 md:gap-3">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.path}
                  className="group flex flex-col items-center p-1.5 sm:p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                >
                  <div className={`p-1 sm:p-2 md:p-3 rounded-lg bg-gradient-to-r ${action.color} mb-1 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-white" />
                  </div>
                  <span className="text-[8px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400">System</span>
                </div>
                <span className="text-[9px] sm:text-xs font-medium text-emerald-600 dark:text-emerald-400">Operational</span>
              </div>
              <div className="flex items-center justify-between mt-1 md:mt-2">
                <span className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400">Model Version</span>
                <span className="text-[9px] sm:text-xs font-mono font-medium text-gray-900 dark:text-white">{modelVersion}</span>
              </div>
              <div className="flex items-center justify-between mt-1 md:mt-2">
                <span className="text-[9px] sm:text-xs text-gray-600 dark:text-gray-400">Time Range</span>
                <span className="text-[9px] sm:text-xs font-medium text-blue-600 dark:text-blue-400">{timeRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;