"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, 
  Monitor, 
  Smartphone, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Search, 
  X, 
  Download,
  UserCheck,
  History, 
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { authService } from '@/lib/api/api';
import Alert from '@/components/Alert/Alert';

export default function LoginHistoryPage() {
  // State Management
  const [loginHistory, setLoginHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  // Fetch login history
  const fetchHistory = async (showRefresh = false) => {
    try {
      if (showRefresh) setIsRefreshing(true);
      setLoading(true);
      const data = await authService.getAdminLoginHistory();
      setLoginHistory(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch login history.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter logic
  useEffect(() => {
    let results = [...loginHistory];

    if (statusFilter !== 'all') {
      results = results.filter(log => log.status?.toLowerCase() === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(log => 
        log.username_attempted.toLowerCase().includes(query) ||
        (log.ip_address && log.ip_address.toLowerCase().includes(query))
      );
    }

    setFilteredHistory(results);
  }, [loginHistory, statusFilter, searchQuery]);

  // Export to CSV
  const handleExport = () => {
    const headers = ['Username', 'Role', 'IP Address', 'Device', 'Status', 'Timestamp'];
    const rows = filteredHistory.map(log => [
      log.username_attempted,
      log.role.toUpperCase(),
      log.ip_address || 'Unknown',
      log.device_os || 'Unknown',
      log.status?.toLowerCase() === 'success' ? 'Success' : 'Failed',
      new Date(log.timestamp).toLocaleString()
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `login-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: loginHistory.length,
    success: loginHistory.filter(l => l.status?.toLowerCase() === 'success').length,
    failed: loginHistory.filter(l => l.status?.toLowerCase() === 'failed').length
  };

  const getDeviceIcon = (deviceOs) => {
    const os = (deviceOs || '').toLowerCase();
    if (os.includes('mobile') || os.includes('ios') || os.includes('android')) 
      return <Smartphone className="h-3.5 w-3.5" />;
    return <Monitor className="h-3.5 w-3.5" />;
  };

  const formatRelativeTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
            <LogIn className="h-6 w-6 text-indigo-500" />
            Login History
          </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1">
              Monitor authentication activity
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={filteredHistory.length === 0}
              className="p-2 md:px-4 md:py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              title="Export"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={() => fetchHistory(true)}
              disabled={isRefreshing}
              className="p-2 md:px-4 md:py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total</p>
              <div className="p-1.5 md:p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                <LogIn className="h-3.5 w-3.5 md:h-5 md:w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <p className="text-sm sm:text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stats.total}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Success</p>
              <div className="p-1.5 md:p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm sm:text-lg md:text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">{stats.success}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-3 md:p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Failed</p>
              <div className="p-1.5 md:p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                <LogIn className="h-3.5 w-3.5 md:h-5 md:w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-sm sm:text-lg md:text-2xl font-semibold text-red-600 dark:text-red-400 mt-1">{stats.failed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('success')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === 'success'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Success ({stats.success})
            </button>
            <button
              onClick={() => setStatusFilter('failed')}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === 'failed'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Failed ({stats.failed})
            </button>
          </div>

          {/* Search - Full width on mobile */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by username or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-48 md:h-64">
            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <LogIn className="h-10 w-10 md:h-12 md:w-12 mx-auto text-gray-400 mb-2 md:mb-3" />
            <p className="text-sm text-gray-500">No login records found</p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHistory.map((log, idx) => (
                <div key={log.id}>
                  <div 
                    className="p-3 sm:p-4 active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                            {log.username_attempted}
                          </span>
                          <span className={`text-[9px] px-1 py-0.5 font-medium rounded ${
                            log.role === 'admin' 
                              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {log.role?.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-[10px] sm:text-xs text-gray-500">{formatRelativeTime(log.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                          log.status?.toLowerCase() === 'success'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {log.status?.toLowerCase() === 'success' ? 'Success' : 'Failed'}
                        </span>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          expandedCard === idx ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedCard === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-0 space-y-1.5 sm:px-4 sm:pb-4 sm:space-y-2 bg-gray-50 dark:bg-gray-800/30">
                          <div className="flex items-start gap-2 text-sm pt-2">
                            <Globe className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">IP Address</p>
                              <p className="text-[10px] sm:text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                                {log.ip_address || 'Unknown'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            {getDeviceIcon(log.device_os)}
                            <div className="flex-1">
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Device / OS</p>
                              <p className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 break-words">
                                {log.device_os || 'Unknown Device'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <Clock className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Full Timestamp</p>
                              <p className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300">
                                {new Date(log.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredHistory.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{log.username_attempted}</p>
                          <p className={`text-xs mt-0.5 font-medium ${
                            log.role === 'admin' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'
                          }`}>
                            {log.role?.toUpperCase()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                        {log.ip_address || 'Unknown'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          {getDeviceIcon(log.device_os)}
                          <span className="truncate max-w-[200px]">{log.device_os || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          log.status?.toLowerCase() === 'success'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {log.status?.toLowerCase() === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}