"use client";

import React, { useState, useRef, useEffect } from "react";
import { predictionService } from "@/lib/api/api";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Upload,
  BarChart3,
  Shield,
  Activity,
  Cpu,
  Zap,
  CheckCircle,
  Database,
  Sparkles,
  Download,
  AlertTriangle,
  FileText,
  TrendingUp,
  PieChart as PieChartIcon,
  Clock,
  Server,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Alert from "@/components/Alert/Alert";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const BatchPrediction = () => {
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [detailedResults, setDetailedResults] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    charts: true,
    attacks: true,
    history: true
  });
  const fileInputRef = useRef(null);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  // Load prediction history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("predictionHistory");
    if (savedHistory) {
      setPredictionHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save prediction history to localStorage whenever it changes
  useEffect(() => {
    if (predictionHistory.length > 0) {
      localStorage.setItem("predictionHistory", JSON.stringify(predictionHistory));
    }
  }, [predictionHistory]);

  // Simulate progress during loading
  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Reset function to clear everything and allow re-upload
  const handleReset = () => {
    setFile(null);
    setStats(null);
    setError(null);
    setDetailedResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const isValidCSV =
      uploadedFile.type === "text/csv" ||
      uploadedFile.name.toLowerCase().endsWith(".csv");

    if (!isValidCSV) {
      setError("Please upload a valid CSV file (.csv)");
      event.target.value = '';
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setLoading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);

      const result = await predictionService.predictBatchFile(uploadedFile);

      clearInterval(progressInterval);
      setProgress(100);
      setStats(result);

      if (result.predictions) {
        const detailed = result.predictions.map((pred, index) => ({
          id: index + 1,
          sample: `Sample ${index + 1}`,
          prediction: pred.prediction,
          confidence: parseFloat((pred.confidence * 100).toFixed(2)),
          attackType: pred.prediction !== "Normal" ? pred.prediction : "Normal",
          timestamp: new Date().toISOString()
        }));
        setDetailedResults(detailed);
      }

      const newHistoryEntry = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        total: result.total_samples,
        attacks: result.attack_count,
        normal: result.normal_count,
        filename: uploadedFile.name,
        detectionRate: result.total_samples > 0
          ? parseFloat(((result.attack_count / result.total_samples) * 100).toFixed(1))
          : 0
      };

      const newHistory = [newHistoryEntry, ...predictionHistory].slice(0, 10);
      setPredictionHistory(newHistory);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Batch prediction failed");
      setFile(null);
      event.target.value = '';
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const uploadedFile = e.dataTransfer.files[0];
    if (!uploadedFile) return;

    const isValidCSV =
      uploadedFile.type === "text/csv" ||
      uploadedFile.name.toLowerCase().endsWith(".csv");

    if (!isValidCSV) {
      setError("Please upload a valid CSV file (.csv)");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setLoading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);

      const result = await predictionService.predictBatchFile(uploadedFile);

      clearInterval(progressInterval);
      setProgress(100);
      setStats(result);

      if (result.predictions) {
        const detailed = result.predictions.map((pred, index) => ({
          id: index + 1,
          sample: `Sample ${index + 1}`,
          prediction: pred.prediction,
          confidence: parseFloat((pred.confidence * 100).toFixed(2)),
          attackType: pred.prediction !== "Normal" ? pred.prediction : "Normal",
          timestamp: new Date().toISOString()
        }));
        setDetailedResults(detailed);
      }

      const newHistoryEntry = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        total: result.total_samples,
        attacks: result.attack_count,
        normal: result.normal_count,
        filename: uploadedFile.name,
        detectionRate: result.total_samples > 0
          ? parseFloat(((result.attack_count / result.total_samples) * 100).toFixed(1))
          : 0
      };

      const newHistory = [newHistoryEntry, ...predictionHistory].slice(0, 10);
      setPredictionHistory(newHistory);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Batch prediction failed");
      setFile(null);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }
  };

  const getAttackIcon = (attack) => {
    const attackIcons = {
      "DDoS": Shield,
      "PortScan": Activity,
      "Botnet": Cpu,
      "BruteForce": Zap,
      "Malware": AlertTriangle,
      "SQL Injection": Server,
      "Normal": CheckCircle
    };

    for (const [key, icon] of Object.entries(attackIcons)) {
      if (attack.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }
    return AlertTriangle;
  };

  const getAttackColor = (attack) => {
    const attackColors = {
      "DDoS": "#EF4444",
      "PortScan": "#3B82F6",
      "Botnet": "#8B5CF6",
      "BruteForce": "#F59E0B",
      "Malware": "#10B981",
      "Normal": "#6B7280",
      "Other": "#9CA3AF"
    };

    for (const [key, color] of Object.entries(attackColors)) {
      if (attack.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    return attackColors.Other;
  };

  const prepareAttackDistributionData = () => {
    if (!stats?.top_attacks) return [];
    return stats.top_attacks.map(item => ({
      name: item.attack,
      count: item.count,
      percentage: parseFloat(item.percentage),
      color: getAttackColor(item.attack)
    }));
  };

  const prepareTrafficOverviewData = () => {
    if (!stats) return [];
    return [
      { name: "Normal", value: stats.normal_count, color: "#10B981" },
      { name: "Attack", value: stats.attack_count, color: "#EF4444" }
    ];
  };

  const prepareConfidenceDistributionData = () => {
    if (!detailedResults.length) return [];

    const ranges = [
      { range: "90-100%", min: 90, max: 100, count: 0 },
      { range: "80-89%", min: 80, max: 89, count: 0 },
      { range: "70-79%", min: 70, max: 79, count: 0 },
      { range: "60-69%", min: 60, max: 69, count: 0 },
      { range: "<60%", min: 0, max: 59, count: 0 }
    ];

    detailedResults.forEach(result => {
      for (const range of ranges) {
        if (result.confidence >= range.min && result.confidence <= range.max) {
          range.count++;
          break;
        }
      }
    });

    return ranges.map(range => ({
      name: range.range,
      count: range.count,
      color: range.min >= 90 ? "#10B981" :
        range.min >= 80 ? "#22C55E" :
          range.min >= 70 ? "#F59E0B" :
            range.min >= 60 ? "#F97316" : "#EF4444"
    }));
  };

  const prepareTimeSeriesData = () => {
    if (!detailedResults.length) return [];

    const recentSamples = detailedResults.slice(0, 100);
    const timeSeries = [];
    const intervalSize = Math.ceil(recentSamples.length / 10);

    for (let i = 0; i < recentSamples.length; i += intervalSize) {
      const chunk = recentSamples.slice(i, i + intervalSize);
      const attackCount = chunk.filter(s => s.prediction !== "Normal").length;
      const normalCount = chunk.filter(s => s.prediction === "Normal").length;

      timeSeries.push({
        time: `Batch ${Math.floor(i / intervalSize) + 1}`,
        attacks: attackCount,
        normal: normalCount
      });
    }

    return timeSeries;
  };

  const handleDownloadResults = () => {
    if (!stats) return;

    const csvContent = `data:text/csv;charset=utf-8,Batch Prediction Results\n\nTotal Samples,${stats.total_samples}\nNormal Traffic,${stats.normal_count}\nAttacks Detected,${stats.attack_count}\nDetection Rate,${((stats.attack_count / stats.total_samples) * 100).toFixed(2)}%\n\nAttack Type,Count,Percentage\n${stats.top_attacks.map(a => `${a.attack},${a.count},${a.percentage}%`).join('\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `batch_prediction_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = () => {
    setPredictionHistory([]);
    localStorage.removeItem("predictionHistory");
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const CustomChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg md:rounded-xl shadow-lg p-2 md:p-3 text-xs md:text-sm">
          <p className="font-bold text-gray-900 dark:text-white mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-gray-600 dark:text-gray-400">
              <span className="font-medium">{entry.name}:</span> {entry.value}
              {entry.dataKey === 'percentage' ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 p-5 md:p-8 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <Database className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">Batch Analytics</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Upload CSV for threat analysis</span>
                  </p>
              </div>
            </div>
            {stats && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleDownloadResults}
                className="flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors text-xs md:text-sm w-full sm:w-auto"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Export Results</span>
                <span className="sm:hidden">Export</span>
              </motion.button>
            )}
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
          >
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Section - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-8 shadow-sm"
      >
        <div
          className="border-2 md:border-3 border-dashed border-gray-300 dark:border-gray-700 rounded-lg md:rounded-xl p-6 md:p-12 text-center hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors bg-gray-50/50 dark:bg-gray-800/50 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !loading && fileInputRef.current?.click()}
        >
          <div className="mb-4 md:mb-6">
            <Upload className="mx-auto h-12 w-12 md:h-16 md:w-16 text-indigo-500 dark:text-indigo-400 mb-3 md:mb-4" />
            <h3 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2 text-gray-900 dark:text-white">
              {loading ? "Processing..." : "Upload CSV"}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              Drag & drop or click to browse
            </p>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!loading) {
                  fileInputRef.current?.click();
                }
              }}
              className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow-md text-xs md:text-sm"
            >
              <FileText className="h-4 w-4 md:h-5 md:w-5" />
              Choose File
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {file && !loading && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg inline-block max-w-full">
              <div className="flex items-center gap-2 md:gap-3">
                <FileText className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span className="font-medium text-xs md:text-sm text-gray-900 dark:text-indigo-300 truncate max-w-[150px] md:max-w-xs">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-4 md:mt-8">
            <div className="flex justify-between text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2">
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 md:h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Reset Button */}
        {file && !loading && (
          <div className="mt-3 md:mt-4 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Upload different file
            </button>
          </div>
        )}
      </motion.div>

      {/* Results Section */}
      {stats && (
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {/* Summary Stats - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-lg md:rounded-xl p-3 md:p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 dark:text-blue-200 text-xs md:text-sm">Total</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
                    {formatNumber(stats.total_samples)}
                  </p>
                </div>
                <Database className="h-6 w-6 md:h-8 md:w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-lg md:rounded-xl p-3 md:p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 dark:text-emerald-200 text-xs md:text-sm">Normal</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
                    {formatNumber(stats.normal_count)}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-lg md:rounded-xl p-3 md:p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 dark:text-red-200 text-xs md:text-sm">Attacks</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
                    {formatNumber(stats.attack_count)}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-lg md:rounded-xl p-3 md:p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 dark:text-purple-200 text-xs md:text-sm">Rate</p>
                  <p className="text-lg md:text-2xl lg:text-3xl font-bold mt-1 md:mt-2">
                    {stats.total_samples > 0
                      ? ((stats.attack_count / stats.total_samples) * 100).toFixed(1)
                      : 0}%
                  </p>                </div>
                <Activity className="h-6 w-6 md:h-8 md:w-8 opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Charts Section with Collapse Toggle for Mobile */}
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Analysis Charts</h2>
              </div>
              <button
                onClick={() => toggleSection('charts')}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {expandedSections.charts ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>

            {(expandedSections.charts || isLargeScreen) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Attack Distribution */}
                <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 p-3 md:p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Attack Types</h3>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(stats.attack_count)}
                    </span>
                  </div>

                  <div className="h-48 md:h-64 lg:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prepareAttackDistributionData().slice(0, 5)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="opacity-30 dark:opacity-10" />
                        <XAxis
                          dataKey="name"
                          stroke="#6B7280"
                          fontSize={10}
                          tickLine={false}
                          angle={-30}
                          textAnchor="end"
                          height={50}
                          tick={{ fill: "#6B7280" }}
                        />
                        <YAxis
                          stroke="#6B7280"
                          fontSize={10}
                          tickLine={false}
                          tick={{ fill: "#6B7280" }}
                          width={25}
                        />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Bar
                          dataKey="count"
                          name="Count"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={40}
                        >
                          {prepareAttackDistributionData().slice(0, 5).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Traffic Overview */}
                <div className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 p-3 md:p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white">Traffic Split</h3>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(stats.total_samples)}
                    </span>
                  </div>

                  <div className="h-48 md:h-64 lg:h-72 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareTrafficOverviewData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                          labelStyle={{ fontSize: 10, fill: "#6B7280" }}
                        >
                          {prepareTrafficOverviewData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomChartTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Top Attacks List - Mobile Optimized */}
          {stats?.top_attacks && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Attack Details</h2>
                </div>
                <button
                  onClick={() => toggleSection('attacks')}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {expandedSections.attacks ? (
                    <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>

              {(expandedSections.attacks || isLargeScreen) && (
                <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                  <div className="min-w-[600px] md:min-w-full">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Attack Type</th>
                          <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Count</th>
                          <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">%</th>
                          <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Distribution</th>
                          <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.top_attacks.slice(0, 5).map((attack, index) => {
                          const Icon = getAttackIcon(attack.attack);
                          const color = getAttackColor(attack.attack);
                          const percentage = parseFloat(attack.percentage);
                          const severity = percentage > 30 ? "High" : percentage > 10 ? "Medium" : "Low";

                          return (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="py-2 md:py-3 px-2 md:px-4">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 md:p-1.5 rounded-md" style={{ backgroundColor: color + '20' }}>
                                    <Icon className="h-3 w-3 md:h-4 md:w-4" style={{ color }} />
                                  </div>
                                  <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[100px] md:max-w-none">
                                    {attack.attack}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                                {formatNumber(attack.count)}
                              </td>
                              <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                                {attack.percentage}%
                              </td>
                              <td className="py-2 md:py-3 px-2 md:px-4">
                                <div className="w-16 md:w-24 h-1.5 md:h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor: color
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="py-2 md:py-3 px-2 md:px-4">
                                <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium 
                                  ${severity === "High"
                                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
                                    : severity === "Medium"
                                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                                      : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400"
                                  }`}>
                                  {severity}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {stats.top_attacks.length > 5 && (
                      <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                        +{stats.top_attacks.length - 5} more attack types
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Prediction History - Mobile Optimized */}
      {predictionHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Recent History</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <button
                onClick={() => toggleSection('history')}
                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {expandedSections.history ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {(expandedSections.history || isLargeScreen) && (
            <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
              <div className="min-w-[650px] md:min-w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Date</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">File</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Total</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Normal</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Attacks</th>
                      <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionHistory.slice(0, 5).map((entry, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div>
                            <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">{entry.date}</div>
                            <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{entry.time}</div>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <FileText className="h-3 w-3 md:h-4 md:w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-gray-900 dark:text-gray-300 truncate max-w-[80px] md:max-w-[120px]" title={entry.filename}>
                              {entry.filename}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                          {formatNumber(entry.total)}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                          {formatNumber(entry.normal)}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-600 dark:text-red-400 font-semibold">
                          {formatNumber(entry.attacks)}
                        </td>
                        <td className="py-2 md:py-3 px-2 md:px-4">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <span className={`text-xs md:text-sm font-bold ${entry.detectionRate > 30
                              ? 'text-red-600 dark:text-red-400'
                              : entry.detectionRate > 10
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-emerald-600 dark:text-emerald-400'
                              }`}>
                              {entry.detectionRate}%
                            </span>
                            <div className="w-12 md:w-16 h-1.5 md:h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min(100, entry.detectionRate)}%`,
                                  backgroundColor: entry.detectionRate > 30 ? '#EF4444' :
                                    entry.detectionRate > 10 ? '#F59E0B' : '#10B981'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {predictionHistory.length > 5 && (
                  <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    +{predictionHistory.length - 5} more sessions
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BatchPrediction;