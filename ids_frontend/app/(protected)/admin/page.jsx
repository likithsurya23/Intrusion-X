"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Monitor, Smartphone, Globe, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { authService } from '@/lib/api/api';
import Alert from '@/components/Alert/Alert';

export default function LoginHistoryPage() {
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await authService.getAdminLoginHistory();
        setLoginHistory(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch login history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <LogIn className="h-8 w-8 text-indigo-500" />
            Login Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor recent authentications, devices, and IPs.</p>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Authentication Logs</h2>
        </div>
        
        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : loginHistory.length === 0 ? (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <LogIn className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No login records found.</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {loginHistory.map((log) => (
                  <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{log.username_attempted}</span>
                        <span className={`text-xs mt-0.5 font-bold ${
                          log.role === 'admin' ? 'text-indigo-600 dark:text-indigo-400' :
                          log.role === 'user' ? 'text-gray-500 dark:text-gray-400' : 'text-red-500 dark:text-red-400'
                        }`}>
                          {log.role.toUpperCase()}
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        log.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {log.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 mt-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-gray-400">
                        <Globe className="h-3.5 w-3.5 shrink-0" />
                        {log.ip_address || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        {(log.device_os || '').toLowerCase().includes('mobile') || (log.device_os || '').toLowerCase().includes('ios') || (log.device_os || '').toLowerCase().includes('android') ? (
                          <Smartphone className="h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <Monitor className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span className="truncate">{log.device_os || 'Unknown Device'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden md:table w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User / Role</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device / OS</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {loginHistory.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{log.username_attempted}</span>
                          <span className={`text-xs mt-0.5 font-medium ${
                            log.role === 'admin' ? 'text-indigo-600 dark:text-indigo-400' :
                            log.role === 'user' ? 'text-gray-500 dark:text-gray-400' : 'text-red-500 dark:text-red-400'
                          }`}>
                            {log.role.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 shrink-0" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 shrink-0" />
                          {log.ip_address || 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          {(log.device_os || '').toLowerCase().includes('mobile') || (log.device_os || '').toLowerCase().includes('ios') || (log.device_os || '').toLowerCase().includes('android') ? (
                            <Smartphone className="h-4 w-4 shrink-0" />
                          ) : (
                            <Monitor className="h-4 w-4 shrink-0" />
                          )}
                          <div className="truncate max-w-[200px]" title={log.device_os}>
                            {log.device_os || 'Unknown Device'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {log.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
