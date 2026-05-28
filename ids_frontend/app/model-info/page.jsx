"use client";

import React from 'react';
import {
  Cpu,
  Database,
  Zap,
  Layers,
  BarChart,
  Shield,
  Network,
  GitBranch,
  Cpu as CpuIcon,
  HardDrive,
  Server,
  Clock,
  Code,
  Brain,
  FileCode,
  Activity,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Split,
  Combine,
  Workflow,
  GanttChartSquare
} from 'lucide-react';

const ModelInfo = () => {
  // Updated metrics with your values
  const performanceMetrics = [
    { name: 'Accuracy', value: 97.97, color: 'emerald', icon: Target, description: 'Overall classification accuracy' },
    { name: 'Precision', value: 97.85, color: 'blue', icon: TrendingUp, description: 'Attack detection precision' },
    { name: 'Recall', value: 97.97, color: 'violet', icon: Activity, description: 'Attack detection recall' },
    { name: 'F1 Score', value: 97.78, color: 'amber', icon: CheckCircle, description: 'Harmonic mean of precision and recall' },
    { name: 'Inference', value: 45, suffix: 'ms', color: 'indigo', icon: Clock, description: 'Average prediction time per sample' },
    { name: 'Parameters', value: 0.0373, suffix: 'M', color: 'rose', icon: Cpu, description: 'Total trainable parameters' },
  ];

  const architectureLayers = [
    {
      name: 'Input Processing',
      components: ['Feature Normalization', 'Feature Scaling', 'Missing Value Imputation'],
      icon: FileCode,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'CNN Feature Extraction',
      components: ['3x Conv1D Layers', 'Batch Normalization', 'ReLU Activation', 'Max Pooling'],
      icon: Network,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      name: 'ConvNeXt-Tiny Blocks',
      components: ['4x ConvNeXt Stages', 'Depthwise Convolution', 'Layer Scaling', 'Stochastic Depth'],
      icon: Brain,
      color: 'violet',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Attention Mechanism',
      components: ['Multi-Head Self-Attention', 'Positional Encoding', 'Attention Weights'],
      icon: GitBranch,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Feature Fusion',
      components: ['Global Average Pooling', 'Feature Concatenation', 'Dropout (0.3)'],
      icon: Combine,
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'Classification Head',
      components: ['Dense Layers (512→256)', 'Batch Normalization', 'Softmax Activation'],
      icon: CpuIcon,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500'
    },
  ];

  const technicalSpecs = [
    { label: 'Framework', value: 'PyTorch 2.0 + ONNX', icon: Code },
    { label: 'Training Time', value: '9.5 hours (RTX 4090)', icon: Clock },
    { label: 'Total Parameters', value: '0.0373M', icon: Server },
    { label: 'Input Features', value: '46 network features', icon: Database },
    { label: 'Output Classes', value: '15 (14 attacks + normal)', icon: Shield },
    { label: 'Optimizer', value: 'AdamW (LR: 1e-4)', icon: Zap },
  ];

  const attackCategories = [
    { name: 'DDoS-RSTFINFlood', type: 'Volume-based', severity: 'Critical', color: 'red' },
    { name: 'DoS-SlowHTTPTest', type: 'Application', severity: 'High', color: 'orange' },
    { name: 'DDoS-UDPFlood', type: 'Volume-based', severity: 'Critical', color: 'red' },
    { name: 'BruteForce-Web', type: 'Credential', severity: 'High', color: 'orange' },
    { name: 'BruteForce-XSS', type: 'Injection', severity: 'High', color: 'orange' },
    { name: 'SQL Injection', type: 'Injection', severity: 'Critical', color: 'red' },
    { name: 'Infiltration', type: 'Malware', severity: 'High', color: 'orange' },
    { name: 'Botnet', type: 'Malware', severity: 'Critical', color: 'red' },
    { name: 'PortScan', type: 'Reconnaissance', severity: 'Medium', color: 'yellow' },
    { name: 'DoS-SynFlood', type: 'Protocol', severity: 'High', color: 'orange' },
    { name: 'DoS-HTTPFlood', type: 'Application', severity: 'High', color: 'orange' },
    { name: 'Fingerprinting', type: 'Reconnaissance', severity: 'Medium', color: 'yellow' },
    { name: 'MITM', type: 'Man-in-the-Middle', severity: 'High', color: 'orange' },
    { name: 'Backdoor', type: 'Malware', severity: 'Critical', color: 'red' },
  ];

  const colorClasses = {
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-400 border-violet-200 dark:border-violet-800',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-400 border-rose-200 dark:border-rose-800',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  };

  const gradientColors = {
    emerald: 'from-emerald-500 to-green-500',
    blue: 'from-blue-500 to-cyan-500',
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
    indigo: 'from-indigo-500 to-blue-500',
    rose: 'from-rose-500 to-pink-500',
    red: 'from-red-500 to-rose-500',
    orange: 'from-orange-500 to-amber-500',
    yellow: 'from-yellow-500 to-amber-500',
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header - Mobile Optimized */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-3.5 sm:p-5 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full translate-y-32 md:translate-y-48 -translate-x-32 md:-translate-x-48" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="p-2.5 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Brain className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="text-lg sm:text-3xl md:text-5xl font-bold text-center sm:text-left">
              Hybrid CNN & ConvNeXt-Tiny IDS
            </h1>
          </div>
          <p className="text-blue-100 dark:text-blue-200 text-xs sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-center px-2">
            Advanced intrusion detection system combining spatial CNN patterns with hierarchical ConvNeXt features
            for state-of-the-art accuracy and efficiency
          </p>
        </div>
      </div>

      {/* Performance Metrics Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className={`p-1 sm:p-1.5 md:p-2 rounded-lg bg-gradient-to-r ${gradientColors[metric.color]} opacity-80`}>
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className={`text-[10px] md:text-xs font-medium px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${colorClasses[metric.color]} truncate max-w-[80px] md:max-w-none`}>
                  {metric.name}
                </span>
              </div>
              <div className="text-center">
                <div className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                  {metric.value}{metric.suffix || '%'}
                </div>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌳 HYBRID ARCHITECTURE - RESPONSIVE TREE STRUCTURE 🌳 */}
      <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-8 shadow-sm overflow-x-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-3 mb-6 md:mb-10">
          <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/20">
            <Workflow className="h-6 w-6 md:h-7 md:w-7 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Hybrid Architecture Design</h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
              CNN for spatial patterns + ConvNeXt for hierarchical features
            </p>
          </div>
        </div>

        {/* Mobile Vertical Layout - Shown on small screens */}
        <div className="block lg:hidden space-y-6">
          {architectureLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div key={idx} className="relative">
                <div className={`p-2.5 sm:p-4 rounded-xl bg-gradient-to-r ${gradientColors[layer.color]} text-white shadow-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <h4 className="font-bold text-sm sm:text-base">{layer.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {layer.components.slice(0, 2).map((comp, cidx) => (
                      <div key={cidx} className="text-xs bg-white/20 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1">
                        {comp}
                      </div>
                    ))}
                    {layer.components.length > 2 && (
                      <div className="text-xs bg-white/20 rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 col-span-2 text-center">
                        +{layer.components.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
                {idx < architectureLayers.length - 1 && (
                  <div className="flex justify-center my-2">
                    <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Tree Layout - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block relative min-h-[700px] w-full">
          {/* Level 1: Root */}
          <div className="relative z-20 mb-16">
            <div className={`p-6 rounded-2xl bg-gradient-to-r ${gradientColors.blue} text-white shadow-xl w-72 mx-auto`}>
              <div className="flex items-center gap-3 mb-3">
                <FileCode className="h-6 w-6" />
                <h3 className="text-xl font-bold">Input Processing</h3>
              </div>
              <div className="space-y-2">
                {architectureLayers[0].components.map((comp, idx) => (
                  <div key={idx} className="text-sm bg-white/20 rounded-lg px-3 py-1.5">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
              <div className="mt-1 p-1 rounded-full bg-blue-500/20">
                <ChevronDown className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Level 2: Branching */}
          <div className="relative w-full flex justify-center items-start mb-16">
            <div className="relative flex-1 flex justify-end pr-12">
              <div className="relative">
                <div className="absolute -left-16 top-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-500/50 to-emerald-500/50"></div>
                <div className={`p-5 rounded-xl bg-gradient-to-r ${gradientColors.emerald} text-white shadow-lg w-64`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Network className="h-5 w-5" />
                    <h4 className="font-bold">CNN Extractor</h4>
                  </div>
                  <div className="space-y-1.5">
                    {architectureLayers[1].components.slice(0, 3).map((comp, idx) => (
                      <div key={idx} className="text-xs bg-white/20 rounded-lg px-2 py-1">
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 mx-8">
              <div className="p-3 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-dashed border-violet-500">
                <Split className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
            </div>

            <div className="relative flex-1 flex justify-start pl-12">
              <div className="relative">
                <div className="absolute -right-16 top-1/2 w-16 h-0.5 bg-gradient-to-l from-blue-500/50 to-violet-500/50"></div>
                <div className={`p-5 rounded-xl bg-gradient-to-r ${gradientColors.violet} text-white shadow-lg w-64`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5" />
                    <h4 className="font-bold">ConvNeXt Blocks</h4>
                  </div>
                  <div className="space-y-1.5">
                    {architectureLayers[2].components.slice(0, 3).map((comp, idx) => (
                      <div key={idx} className="text-xs bg-white/20 rounded-lg px-2 py-1">
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Level 3: Attention */}
          <div className="relative mb-16">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-emerald-500/50 via-violet-500/50 to-amber-500"></div>
            <div className={`p-5 rounded-xl bg-gradient-to-r ${gradientColors.amber} text-white shadow-lg w-72 mx-auto`}>
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="h-5 w-5" />
                <h4 className="font-bold">Attention Mechanism</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {architectureLayers[3].components.map((comp, idx) => (
                  <div key={idx} className="text-xs bg-white/20 rounded-lg px-2 py-1">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Level 4: Feature Fusion */}
          <div className="relative mb-16">
            <div className={`p-6 rounded-xl bg-gradient-to-r ${gradientColors.indigo} text-white shadow-xl w-80 mx-auto`}>
              <div className="flex items-center gap-3 mb-4">
                <Combine className="h-6 w-6" />
                <h4 className="text-lg font-bold">Feature Fusion</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {architectureLayers[4].components.map((comp, idx) => (
                  <div key={idx} className="text-xs bg-white/20 rounded-lg px-2 py-1.5 text-center">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Level 5: Classification */}
          <div className="relative">
            <div className={`p-6 rounded-2xl bg-gradient-to-r ${gradientColors.rose} text-white shadow-xl w-72 mx-auto`}>
              <div className="flex items-center gap-3 mb-4">
                <CpuIcon className="h-6 w-6" />
                <h4 className="text-lg font-bold">Classification Head</h4>
              </div>
              <div className="space-y-2">
                {architectureLayers[5].components.map((comp, idx) => (
                  <div key={idx} className="text-sm bg-white/20 rounded-lg px-3 py-1.5">
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend - Responsive */}
        <div className="mt-8 md:mt-24 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h4 className="font-bold mb-4 text-center text-gray-900 dark:text-white text-sm sm:text-base md:text-lg">
            Architecture Flow Legend
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-3 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">Input</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">CNN</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-violet-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">ConvNeXt</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">Attention</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-indigo-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">Fusion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500"></div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300">Classification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications & Attack Categories - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Technical Specifications */}
        <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20">
              <Server className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">Technical Specifications</h2>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">System requirements and configuration</p>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3">
            {technicalSpecs.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-700 dark:text-gray-400" />
                    </div>
                    <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{spec.label}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 dark:text-white">{spec.value}</span>
                </div>
              );
            })}
          </div>

          {/* Model Size Card */}
          <div className="mt-5 md:mt-6 p-3 sm:p-4 md:p-5 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white dark:bg-gray-900 shadow-sm">
                <HardDrive className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400">Compressed Model Size</p>
                <div className="flex items-baseline gap-1 md:gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">28</span>
                  <span className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300">MB</span>
                </div>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-500">Optimized for edge deployment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attack Categories - Responsive Scrollable */}
        <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">Attack Categories</h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400">14 attack types + normal traffic</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2.5 md:px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg self-start sm:self-auto">
              <Database className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{attackCategories.length} types</span>
            </div>
          </div>

          {/* Scrollable Attack List */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="max-h-[350px] md:max-h-[400px] overflow-y-auto pr-2 space-y-2 md:space-y-3 custom-scrollbar">
              {attackCategories.map((attack, index) => (
                <div 
                  key={index} 
                  className="p-2.5 sm:p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1 md:mb-2">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${colorClasses[attack.color]}`}></div>
                      <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white truncate max-w-[150px] md:max-w-none">
                        {attack.name}
                      </span>
                    </div>
                    <span className={`text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 md:px-2.5 py-0.5 md:py-1 rounded-full font-medium ${colorClasses[attack.color]} self-start sm:self-auto`}>
                      {attack.severity}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-xs md:text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Type: <span className="font-medium text-gray-700 dark:text-gray-300">{attack.type}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500">Severity</span>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                              i < (attack.severity === 'Critical' ? 3 :
                                  attack.severity === 'High' ? 2 :
                                  attack.severity === 'Medium' ? 1 : 0)
                                ? attack.severity === 'Critical' ? 'bg-red-500' :
                                  attack.severity === 'High' ? 'bg-orange-500' :
                                  'bg-yellow-500'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attack Stats Summary */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <div className="text-center p-1.5 sm:p-2.5 md:p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <div className="text-sm sm:text-lg md:text-2xl font-bold text-red-600 dark:text-red-400">
                  {attackCategories.filter(a => a.severity === 'Critical').length}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Critical</div>
              </div>
              <div className="text-center p-1.5 sm:p-2.5 md:p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                <div className="text-sm sm:text-lg md:text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {attackCategories.filter(a => a.severity === 'High').length}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400">High</div>
              </div>
              <div className="text-center p-1.5 sm:p-2.5 md:p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="text-sm sm:text-lg md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {attackCategories.filter(a => a.severity === 'Medium').length}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Medium</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Information - Responsive */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 rounded-xl md:rounded-2xl border border-blue-100 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white dark:bg-gray-800 shadow-sm self-start">
            <Database className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">Dataset: CICIoT2023</h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">Comprehensive IoT network traffic dataset</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400">46</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mt-0.5 md:mt-1">Network Features</div>
          </div>
          <div className="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">3.5M</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mt-0.5 md:mt-1">Total Samples</div>
          </div>
          <div className="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-red-600 dark:text-red-400">14</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mt-0.5 md:mt-1">Attack Types</div>
          </div>
          <div className="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-sm sm:text-lg md:text-2xl font-bold text-purple-600 dark:text-purple-400">105</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 mt-0.5 md:mt-1">IoT Devices</div>
          </div>
        </div>
      </div>

      {/* Architecture Advantages - Responsive Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-5 md:mb-6 text-center text-gray-900 dark:text-white px-2">
          Architecture Advantages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="p-2.5 sm:p-4 md:p-5 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20">
                <Network className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white">Multi-Scale Features</h3>
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
              CNN extracts local spatial patterns while ConvNeXt captures hierarchical dependencies
            </p>
          </div>

          <div className="p-2.5 sm:p-4 md:p-5 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white">Real-time Performance</h3>
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
              45ms inference time enables real-time network monitoring
            </p>
          </div>

          <div className="p-2.5 sm:p-4 md:p-5 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20">
                <Brain className="h-4 w-4 md:h-5 md:w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white">Robust Detection</h3>
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
              97.97% accuracy across 14 attack types with minimal false positives
            </p>
          </div>

          <div className="p-2.5 sm:p-4 md:p-5 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20">
                <HardDrive className="h-4 w-4 md:h-5 md:w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 dark:text-white">Lightweight</h3>
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">
              28MB model with 0.0373M parameters for edge deployment
            </p>
          </div>
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ModelInfo;