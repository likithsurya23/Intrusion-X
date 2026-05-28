"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  AlertTriangle,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Calendar,
  Target,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Trophy,
  Award,
  Bell,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Attack distribution based on CICIoT2023
  const attackDistribution = [
    { name: 'DDoS Attacks', value: 32, color: '#ef4444', icon: Shield },
    { name: 'DoS Attacks', value: 28, color: '#f97316', icon: AlertTriangle },
    { name: 'BruteForce', value: 18, color: '#eab308', icon: Filter },
    { name: 'Injection', value: 12, color: '#8b5cf6', icon: Database },
    { name: 'Malware', value: 8, color: '#ec4899', icon: Cpu },
    { name: 'Reconnaissance', value: 2, color: '#06b6d4', icon: Activity },
  ];

  // Weekly traffic trends with your metrics
  const trafficTrends = React.useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const baseNormal = 800 + Math.random() * 400;
    const attackRate = 0.11;
    return {
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      normal: Math.round(baseNormal * (1 - attackRate)),
      attacks: Math.round(baseNormal * attackRate),
      falsePositives: Math.round(baseNormal * 0.008),
    };
  }), []);

  // Detection performance by attack type
  const detectionPerformance = [
    { attack: 'DDoS', accuracy: 98.2, time: 42, color: '#ef4444' },
    { attack: 'DoS', accuracy: 97.5, time: 58, color: '#f97316' },
    { attack: 'BruteForce', accuracy: 96.8, time: 35, color: '#eab308' },
    { attack: 'SQL Inj.', accuracy: 98.5, time: 67, color: '#8b5cf6' },
    { attack: 'PortScan', accuracy: 99.1, time: 28, color: '#06b6d4' },
    { attack: 'Botnet', accuracy: 97.2, time: 49, color: '#ec4899' },
  ];

  // Model comparison data with proper values
  const modelComparisonData = [
    {
      model: 'CNN-only',
      accuracy: 80.08,
      f1: 76.96,
      precision: 80.17,
      recall: 80.08,
      params: 0.0085,
      inference: 38,
      color: '#3b82f6'
    },
    {
      model: 'CNN-GRU',
      accuracy: 85.74,
      f1: 84.93,
      precision: 86.68,
      recall: 85.74,
      params: 0.0212,
      inference: 52,
      color: '#10b981'
    },
    {
      model: 'BiLSTM',
      accuracy: 84.53,
      f1: 83.87,
      precision: 85.84,
      recall: 84.53,
      params: 0.1380,
      inference: 62,
      color: '#8b5cf6'
    },
    {
      model: 'Hybrid (Ours)',
      accuracy: 97.97,
      f1: 97.78,
      precision: 97.85,
      recall: 97.97,
      params: 0.0373,
      inference: 45,
      color: '#f59e0b'
    }
  ];

  // Attack severity distribution
  const severityDistribution = [
    { level: 'Critical', count: 124, color: '#ef4444', percentage: 45 },
    { level: 'High', count: 86, color: '#f97316', percentage: 32 },
    { level: 'Medium', count: 42, color: '#eab308', percentage: 16 },
    { level: 'Low', count: 18, color: '#10b981', percentage: 7 },
  ];

  // Scatter plot data for params vs accuracy
  const scatterData = modelComparisonData.map(model => ({
    x: model.params,
    y: model.accuracy,
    z: model.inference,
    name: model.model,
    short: model.model === 'Hybrid (Ours)' ? 'Ours' :
      model.model === 'CNN-GRU' ? 'GRU' :
        model.model === 'BiLSTM' ? 'BiLSTM' : 'CNN',
    color: model.color
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg md:rounded-xl shadow-lg p-2 md:p-4 text-xs md:text-sm">
          <p className="font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs md:text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value}
              {entry.dataKey === 'accuracy' || entry.dataKey === 'f1' || entry.dataKey === 'precision' || entry.dataKey === 'recall' ? '%' : ''}
              {entry.dataKey === 'time' || entry.dataKey === 'inference' ? 'ms' : ''}
              {entry.dataKey === 'params' ? 'M' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'comparison', label: 'Comparison', icon: TrendingUp },
    { id: 'details', label: 'Details', icon: Database },
  ];

  // Mobile swipe handler (simplified)
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (diff > 50 && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    } else if (diff < -50 && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Attack Distribution */}
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <PieChart className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Attack Distribution</h2>
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">CICIoT2023</span>
              </div>

              <div className="h-60 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={attackDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelStyle={{ fontSize: '11px', fill: '#6b7280' }}
                    >
                      {attackDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Percentage']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                {attackDistribution.map((attack, index) => {
                  const Icon = attack.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 p-2 md:p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                      <div
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: attack.color }}
                      />
                      <Icon className="h-3 w-3 md:h-4 md:w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs md:text-sm text-gray-900 dark:text-gray-100 truncate">
                          {attack.name.replace(' Attacks', '')}
                        </p>
                      </div>
                      <span className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">{attack.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Traffic Trends */}
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Weekly Traffic</h2>
                </div>

              </div>

              <div className="h-60 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" className="opacity-30 dark:opacity-10" />
                    <XAxis
                      dataKey="day"
                      stroke="#6b7280"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area
                      type="monotone"
                      dataKey="normal"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                      name="Normal"
                    />
                    <Area
                      type="monotone"
                      dataKey="attacks"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.2}
                      name="Attacks"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-4">
                <div className="text-center p-2 md:p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-base md:text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {(trafficTrends.reduce((sum, day) => sum + day.normal, 0) / trafficTrends.length).toFixed(0)}
                  </div>
                  <div className="text-[10px] md:text-sm text-emerald-600 dark:text-emerald-500 mt-0.5 md:mt-1">Avg Normal</div>
                </div>
                <div className="text-center p-2 md:p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <div className="text-base md:text-2xl font-bold text-red-700 dark:text-red-400">
                    {(trafficTrends.reduce((sum, day) => sum + day.attacks, 0) / trafficTrends.length).toFixed(0)}
                  </div>
                  <div className="text-[10px] md:text-sm text-red-600 dark:text-red-500 mt-0.5 md:mt-1">Avg Attacks</div>
                </div>
                <div className="text-center p-2 md:p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="text-base md:text-2xl font-bold text-amber-700 dark:text-amber-400">
                    {((trafficTrends.reduce((sum, day) => sum + day.falsePositives, 0) /
                      trafficTrends.reduce((sum, day) => sum + day.normal, 0)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-[10px] md:text-sm text-amber-600 dark:text-amber-500 mt-0.5 md:mt-1">FPR</div>
                </div>
              </div>
            </div>
          </>
        );

      case 'performance':
        return (
          <>
            {/* Detection Performance */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <Target className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Detection Performance</h2>
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Accuracy vs Time</span>
              </div>

              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={detectionPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" className="opacity-30 dark:opacity-10" />
                    <XAxis
                      dataKey="attack"
                      stroke="#6b7280"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      angle={-30}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#6b7280"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      width={30}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#6b7280"
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar
                      yAxisId="left"
                      dataKey="accuracy"
                      name="Accuracy %"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="time"
                      name="Time (ms)"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attack Severity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Severity Distribution</h2>
              </div>

              <div className="space-y-4 md:space-y-6">
                {severityDistribution.map((severity, index) => (
                  <div key={index} className="space-y-1 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div
                          className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                          style={{ backgroundColor: severity.color }}
                        />
                        <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">{severity.level}</span>
                      </div>
                      <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-white">{severity.count}</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 md:h-3 flex-1">
                        <div
                          className="h-2 md:h-3 rounded-full"
                          style={{
                            width: `${severity.percentage}%`,
                            backgroundColor: severity.color
                          }}
                        />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{severity.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total incidents</span>
                  <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                    {severityDistribution.reduce((sum, s) => sum + s.count, 0)}
                  </span>
                </div>
              </div>
            </div>
          </>
        );

      case 'comparison':
        return (
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Layers className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Model Comparison</h2>
              </div>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Params vs Accuracy
              </span>
            </div>

            {/* Mobile View - Cards */}
            <div className="block lg:hidden space-y-3">
              {modelComparisonData.map((model, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${model.model === 'Hybrid (Ours)'
                      ? 'border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                      <span className={`font-bold text-sm ${model.model === 'Hybrid (Ours)' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {model.model}
                      </span>
                    </div>
                    {model.model === 'Hybrid (Ours)' && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 rounded-full">
                        Best
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Acc:</span>
                      <span className="ml-1 font-bold">{model.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Params:</span>
                      <span className="ml-1 font-bold">{model.params}M</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <span className="ml-1 font-bold">{model.inference}ms</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Scatter Chart */}
            <div className="hidden lg:block h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="opacity-30 dark:opacity-10" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Parameters (M)"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[75, 100]}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    label={{ value: "Accuracy (%)", angle: -90, position: "insideLeft", fill: "#6b7280" }}
                  />
                  <ZAxis type="number" dataKey="z" range={[200, 900]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Scatter
                    name="Models"
                    data={scatterData}
                    shape={({ cx, cy, payload }) => (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={payload.z / 15}
                        fill={payload.color}
                        fillOpacity={payload.name === 'Hybrid (Ours)' ? 0.9 : 0.6}
                        stroke={payload.name === 'Hybrid (Ours)' ? "#f59e0b" : "#fff"}
                        strokeWidth={payload.name === 'Hybrid (Ours)' ? 3 : 2}
                      />
                    )}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Desktop Cards */}
            <div className="hidden lg:grid grid-cols-4 gap-4 mt-6">
              {modelComparisonData.map((model, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${model.model === 'Hybrid (Ours)'
                      ? 'border-2 border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800'
                    }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                    <span className={`font-bold text-sm ${model.model === 'Hybrid (Ours)' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'}`}>
                      {model.model}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                      <span className="font-bold">{model.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">F1 Score:</span>
                      <span className="font-medium">{model.f1}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Params:</span>
                      <span className="font-medium">{model.params}M</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'details':
        return (
          <>
            {/* Detailed Metrics - Mobile Scrollable Table */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Database className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Model Performance</h2>
              </div>

              <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                <table className="w-full min-w-[600px] md:min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Model</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Acc</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">F1</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Prec</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Rec</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Params</th>
                      <th className="text-left py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-900 dark:text-white">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelComparisonData.map((model, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-2 md:py-4 px-2 md:px-4">
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: model.color }} />
                            <span className={`text-xs md:text-sm font-medium ${model.model === 'Hybrid (Ours)' ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'}`}>
                              {model.model === 'Hybrid (Ours)' ? 'Ours' : model.model}
                            </span>
                          </div>
                        </td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.accuracy}%</td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.f1}%</td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.precision}%</td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.recall}%</td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.params}M</td>
                        <td className="py-2 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">{model.inference}ms</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dataset Information */}
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Database className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">Dataset</h2>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between p-2 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Dataset</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">CICIoT2023</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Samples</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">46.6M</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Attacks</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">14</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Features</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">46</span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Devices</span>
                  <span className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">105</span>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="space-y-4 md:space-y-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header - Mobile Optimized */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-5 md:p-8 text-white">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <BarChart3 className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold">Analytics</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Hybrid CNN & ConvNeXt-Tiny Insights</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Time Range - Mobile Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="md:hidden bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="24h" className="text-gray-900">Last 24h</option>
                <option value="7d" className="text-gray-900">Last 7d</option>
                <option value="30d" className="text-gray-900">Last 30d</option>
              </select>
              <div className="hidden md:flex gap-2">
                {['24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${timeRange === range
                        ? 'bg-white text-blue-700'
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

      {/* Tabs - Mobile Scrollable */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex space-x-1 md:space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl min-w-max md:min-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts Grid - Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {renderContent()}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="block lg:hidden text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
        ← Swipe to switch tabs →
      </div>
    </div>
  );
};

export default Analytics;